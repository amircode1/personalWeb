import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * MusicVisualizer
 * - supports filling its parent section as a background (fillParent)
 * - does beat detection using frequency bins and creates expanding pulses
 * - reports a smoothed amplitude via onAmplitudeChange
 */
const MusicVisualizer = ({ src, onAmplitudeChange, fillParent = false, accentColor = '#06B6D4' }) => {
  const [isInteracted, setIsInteracted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const canvasRef = useRef(null);

  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const timeDataRef = useRef(null);
  const animationFrameIdRef = useRef(null);

  // Start music with user gesture (mouse move)
  const startMusic = async () => {
    if (isPlaying) return;

    try {
      if (!audioRef.current) return;

      // Step 1: Play audio first (user gesture context)
      audioRef.current.muted = false;
      await audioRef.current.play();

      // Step 2: Now create and initialize AudioContext (after audio starts)
      if (!audioContextRef.current) {
        initializeAudio();
      }

      // Step 3: Resume audio context if suspended
      if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }

      setIsPlaying(true);
      setIsInteracted(true);
    } catch (e) {
      console.error('Failed to play music:', e.message);
    }
  };

  // Listen for strong user gestures to start music (pointerdown, touchstart, click, keydown)
  useEffect(() => {
    if (isPlaying) return;

    const startHandler = (e) => {
      startMusic();
      // remove all listeners after first accepted gesture
      events.forEach((ev) => document.removeEventListener(ev, startHandler));
    };

    const events = ['pointerdown', 'touchstart', 'click', 'keydown'];
    events.forEach((ev) => document.addEventListener(ev, startHandler, { passive: true }));

    return () => events.forEach((ev) => document.removeEventListener(ev, startHandler));
  }, [isPlaying]);

  const initializeAudio = () => {
    if (audioContextRef.current) return;

    const context = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = context.createAnalyser();
    const audioEl = audioRef.current;

    sourceRef.current = context.createMediaElementSource(audioEl);
    sourceRef.current.connect(analyser);
    analyser.connect(context.destination);

    analyser.fftSize = 2048;
    const bufLen = analyser.frequencyBinCount;
    timeDataRef.current = new Uint8Array(bufLen);

    audioContextRef.current = context;
    analyserRef.current = analyser;
  };

  const handleInteraction = async (e) => {
    if (isInteracted) return;

    if (!audioContextRef.current) {
      initializeAudio();
    }

    if (audioContextRef.current.state === 'suspended') {
      await audioContextRef.current.resume();
    }

    try {
      await audioRef.current.play();
      setIsInteracted(true);
    } catch (err) {
      console.warn('Playback failed to start:', err);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Responsiveness with ResizeObserver
    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);

    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!isInteracted || !canvasRef.current) return;

    const analyser = analyserRef.current;
    const timeData = timeDataRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const width = () => canvas.width;
    const height = () => canvas.height;

    const draw = () => {
      animationFrameIdRef.current = requestAnimationFrame(draw);

      analyser.getByteTimeDomainData(timeData);

      // Compute overall amplitude
      const avg = timeData.reduce((s, v) => s + Math.abs(v - 128), 0) / timeData.length;
      const amplitude = avg;
      if (onAmplitudeChange) onAmplitudeChange(amplitude);

      // Clear canvas (transparent background)
      ctx.clearRect(0, 0, width(), height());

      // Sample fewer points for a cleaner, hand-drawn style
      const step = Math.max(2, Math.floor(width() / 200));
      const points = [];
      for (let x = 0; x <= width(); x += step) {
        const idx = Math.floor((x / width()) * timeData.length);
        const v = (timeData[idx] - 128) / 128;
        const y = height() / 2 + v * (height() * 0.32);
        points.push({ x, y });
      }

      // Build a smooth path using quadratic curves (creates a hand-drawn smooth line)
      const drawSmoothPath = (ctx, pts) => {
        if (!pts.length) return;
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) {
          const prev = pts[i - 1];
          const cur = pts[i];
          const cx = (prev.x + cur.x) / 2;
          const cy = (prev.y + cur.y) / 2;
          ctx.quadraticCurveTo(prev.x, prev.y, cx, cy);
        }
        // final line to last point
        const last = pts[pts.length - 1];
        ctx.lineTo(last.x, last.y);
      };

      // Amplitude-driven stroke width (bigger on strong beats)
      const baseWidth = 2.5;
      const ampWidth = Math.min(6, Math.max(0, amplitude / 20));
      const strokeWidth = baseWidth + ampWidth;

      // Draw subtle golden glow first (larger, low-opacity)
      ctx.save();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.shadowColor = 'rgba(218,165,32,0.9)';
      ctx.shadowBlur = 18;
      ctx.strokeStyle = 'rgba(218,165,32,0.12)';
      ctx.lineWidth = strokeWidth + 8;
      drawSmoothPath(ctx, points);
      ctx.stroke();
      ctx.restore();

      // Draw main crisp white line on top
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = 'rgba(255,255,255,0.98)';
      ctx.lineWidth = strokeWidth;
      drawSmoothPath(ctx, points);
      ctx.stroke();

      // Draw a thin subtle center baseline for the hand-drawn effect
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(0,0,0,0.03)';
      ctx.lineWidth = 1;
      ctx.moveTo(0, height() / 2);
      ctx.lineTo(width(), height() / 2);
      ctx.stroke();
      
      // Add subtle glow around the main line
      ctx.strokeStyle = 'rgba(218, 165, 32, 0.15)';
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      ctx.beginPath();
      for (let x = 0; x < width(); x += step) {
        const idx = Math.floor((x / width()) * timeData.length);
        const v = (timeData[idx] - 128) / 128;
        const y = height() / 2 + v * (height() * 0.35);
        
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    };

    draw();

    return () => cancelAnimationFrame(animationFrameIdRef.current);
  }, [isInteracted, onAmplitudeChange, accentColor]);

  return (
    <div
      style={{
        position: fillParent ? 'absolute' : 'relative',
        inset: fillParent ? 0 : 'auto',
        top: fillParent ? 0 : 'auto',
        left: fillParent ? 0 : 'auto',
        width: '100%',
        height: fillParent ? '100%' : '150px',
        cursor: 'default',
        zIndex: fillParent ? 0 : 'auto',
        overflow: 'hidden',
      }}
    >
      {!isPlaying && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'rgba(255, 255, 255, 0.85)',
          fontFamily: 'monospace',
          fontSize: '16px',
          pointerEvents: 'none',
          zIndex: 10,
        }}>
          Tap/click or press any key to play ♪
        </div>
      )}
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', pointerEvents: 'none', display: 'block' }} />
      <audio ref={audioRef} src={src} loop crossOrigin="anonymous" />
    </div>
  );
};

MusicVisualizer.propTypes = {
  src: PropTypes.string.isRequired,
  onAmplitudeChange: PropTypes.func,
  fillParent: PropTypes.bool,
  accentColor: PropTypes.string,
};

export default MusicVisualizer;
