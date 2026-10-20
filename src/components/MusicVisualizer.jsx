import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const MusicVisualizer = ({
  src,
  onAmplitudeChange,
  fillParent = false,
  accentColor = '#22d3ee',
  secondaryColor = '#8b5cf6',
  playLabel = 'Play audio',
  pauseLabel = 'Pause audio',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const frameRef = useRef(null);
  const lastReportRef = useRef(0);
  const colorsRef = useRef({ accent: accentColor, secondary: secondaryColor });

  const initializeAudio = () => {
    if (audioContextRef.current || !audioRef.current || typeof window === 'undefined') return;

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const context = new AudioContext();
    const analyser = context.createAnalyser();
    analyser.fftSize = 128;
    analyser.smoothingTimeConstant = 0.78;

    sourceRef.current = context.createMediaElementSource(audioRef.current);
    sourceRef.current.connect(analyser);
    analyser.connect(context.destination);
    audioContextRef.current = context;
    analyserRef.current = analyser;
  };

  const togglePlayback = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    try {
      initializeAudio();
      if (audioContextRef.current?.state === 'suspended') {
        await audioContextRef.current.resume();
      }
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.warn('Playback failed to start:', error);
    }
  };

  useEffect(() => {
    colorsRef.current = { accent: accentColor, secondary: secondaryColor };
  }, [accentColor, secondaryColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext('2d');
    if (!context) return undefined;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      width = rect.width;
      height = rect.height;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(width * pixelRatio));
      canvas.height = Math.max(1, Math.floor(height * pixelRatio));
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    resize();
    const observer = new ResizeObserver(resize);
    if (canvas.parentElement) observer.observe(canvas.parentElement);

    const draw = (time) => {
      frameRef.current = requestAnimationFrame(draw);
      if (!width || !height) return;

      context.clearRect(0, 0, width, height);
      const analyser = analyserRef.current;
      const data = analyser ? new Uint8Array(analyser.frequencyBinCount) : null;
      if (analyser && isPlaying) analyser.getByteFrequencyData(data);

      const bars = 42;
      const gap = 3;
      const barWidth = Math.max(2, (width - gap * (bars - 1)) / bars);
      let total = 0;

      for (let index = 0; index < bars; index += 1) {
        const sourceValue = data ? data[Math.floor((index / bars) * data.length)] / 255 : 0;
        const idleWave = (Math.sin(time * 0.0018 + index * 0.55) + 1) * 0.5;
        const energy = isPlaying ? sourceValue : idleWave * 0.12;
        total += energy;
        const barHeight = Math.max(3, energy * height * 0.78);
        const x = index * (barWidth + gap);
        const y = height / 2 - barHeight / 2;
        const gradient = context.createLinearGradient(0, y, 0, y + barHeight);
        const { accent: liveAccent, secondary: liveSecondary } = colorsRef.current;
        gradient.addColorStop(0, liveAccent);
        gradient.addColorStop(1, liveSecondary);
        context.fillStyle = gradient;
        context.globalAlpha = isPlaying ? 0.88 : 0.35;
        context.shadowColor = liveAccent;
        context.shadowBlur = isPlaying ? 12 : 5;
        context.beginPath();
        context.roundRect(x, y, barWidth, barHeight, 3);
        context.fill();
      }

      context.globalAlpha = 1;
      context.shadowBlur = 0;
      const amplitude = isPlaying ? Math.round((total / bars) * 100) : 0;
      if (onAmplitudeChange && time - lastReportRef.current > 120) {
        lastReportRef.current = time;
        onAmplitudeChange(amplitude);
      }
    };

    frameRef.current = requestAnimationFrame(draw);

    return () => {
      observer.disconnect();
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [isPlaying, onAmplitudeChange]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;
    const handlePause = () => setIsPlaying(false);
    audio.addEventListener('pause', handlePause);
    return () => audio.removeEventListener('pause', handlePause);
  }, []);

  useEffect(() => () => {
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
    }
  }, []);

  return (
    <div className={`relative flex items-center gap-3 ${fillParent ? 'h-full w-full' : 'h-16 w-full'}`}>
      <canvas ref={canvasRef} aria-hidden="true" className="h-full min-w-0 flex-1" />
      <button
        type="button"
        onClick={togglePlayback}
        aria-label={isPlaying ? pauseLabel : playLabel}
        title={isPlaying ? pauseLabel : playLabel}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/45 bg-accent/[0.08] text-accent transition hover:border-accent hover:bg-accent/15"
      >
        <span aria-hidden="true" className="text-sm">{isPlaying ? 'Ⅱ' : '▶'}</span>
      </button>
      <audio ref={audioRef} src={src} loop preload="metadata" />
    </div>
  );
};

MusicVisualizer.propTypes = {
  src: PropTypes.string.isRequired,
  onAmplitudeChange: PropTypes.func,
  fillParent: PropTypes.bool,
  accentColor: PropTypes.string,
  secondaryColor: PropTypes.string,
  playLabel: PropTypes.string,
  pauseLabel: PropTypes.string,
};

export default MusicVisualizer;
