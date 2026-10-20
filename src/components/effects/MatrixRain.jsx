import { useEffect, useRef } from 'react';

/**
 * Character rain.
 *
 * A column-based canvas where each column owns a falling glyph trail, the
 * classic "signal data bleeding down the screen" effect. It only runs while the
 * cold skin is active — the studio skin has no rain at all.
 */
const GLYPHS = 'ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ';

const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return undefined;

    const root = document.documentElement;
    let isCold = root.dataset.design === 'cold';
    let frameId = null;
    let columns = 0;
    let drops = [];
    let fontSize = 14;
    let lastTime = 0;

    const readAccent = () => {
      const value = getComputedStyle(root).getPropertyValue('--accent').trim();
      const parts = value.split(/\s+/).map(Number);
      if (parts.length === 3 && parts.every((part) => Number.isFinite(part))) {
        return `rgb(${parts[0]}, ${parts[1]}, ${parts[2]})`;
      }
      return 'rgb(133, 202, 222)';
    };

    let accent = readAccent();

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      fontSize = window.innerWidth < 640 ? 12 : 15;
      columns = Math.ceil(window.innerWidth / fontSize);
      drops = Array.from({ length: columns }, () => Math.random() * -50);
    };

    const draw = (time) => {
      frameId = requestAnimationFrame(draw);

      // Fade the previous frame instead of clearing, leaving a soft trail.
      context.fillStyle = 'rgba(4, 4, 5, 0.09)';
      context.fillRect(0, 0, window.innerWidth, window.innerHeight);

      if (!isCold) return;
      if (time - lastTime < 42) return;
      lastTime = time;

      context.font = `${fontSize}px 'JetBrains Mono', monospace`;
      context.textAlign = 'center';

      for (let i = 0; i < drops.length; i += 1) {
        const glyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        const x = i * fontSize + fontSize / 2;
        const y = drops[i] * fontSize;

        if (y > 0 && y < window.innerHeight + fontSize) {
          context.fillStyle = accent;
          context.globalAlpha = 0.9;
          context.fillText(glyph, x, y);

          context.fillStyle = 'rgba(255, 255, 255, 0.75)';
          context.globalAlpha = 0.35;
          context.fillText(glyph, x, y - fontSize);
        }

        context.globalAlpha = 1;
        if (y > window.innerHeight && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 0.55;
      }
    };

    const sync = () => {
      isCold = root.dataset.design === 'cold';
      accent = readAccent();
    };

    resize();
    sync();

    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ['data-design', 'style'] });

    window.addEventListener('resize', resize);
    frameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="matrix-rain" aria-hidden="true" />;
};

export default MatrixRain;
