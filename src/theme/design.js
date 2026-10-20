/**
 * Design skins.
 *
 * A palette only decides *what colour* the site is. A skin decides *what the
 * site is made of* — geometry, typography, texture, chrome. Switching portrait
 * switches the skin too, so the two themes read as two different products
 * living inside one build.
 */

export const DESIGNS = {
  /**
   * Studio Signal — clean product surface.
   * Soft 8px geometry, Orbitron display type, faint grid, zero chrome.
   */
  studio: {
    id: 'studio',
    radius: '0.75rem',
    radiusSmall: '0.5rem',
    radiusLarge: '1rem',
    displayFont: "'Orbitron', 'Vazirmatn', sans-serif",
    bodyFont: "'Space Grotesk', 'Inter', 'Vazirmatn', sans-serif",
    bodyFontRtl: "'Vazirmatn', 'Space Grotesk', 'Inter', sans-serif",
    monoFont: "'Space Grotesk', monospace",
    labelFont: "'Space Grotesk', monospace",
    labelFontRtl: "'Vazirmatn', sans-serif",
    letterSpacing: '0.16em',
    labelTransform: 'uppercase',
    labelWeight: '700',
    gridOpacity: '0.7',
    gridSize: '52px',
    scanOpacity: '0.045',
    grainOpacity: '0',
    vignetteOpacity: '0',
    glitchAmount: '0',
    borderStyle: 'solid',
    panelShadow: '0 24px 80px rgba(0, 0, 0, 0.28), inset 0 1px rgba(255, 255, 255, 0.035)',
    backdropBlur: '18px',
    accentGlow: '0 0 30px rgb(var(--accent) / 0.12)',
    caret: 'block',
    cursor: 'default',
    chrome: false,
  },

  /**
   * Cold Cyberpunk — a compromised terminal.
   * Hard 0px geometry, monospace everything, CRT curvature, RGB-split glitch,
   * character rain, a DOS title bar and an unreadable boot log.
   */
  cold: {
    id: 'cold',
    radius: '0px',
    radiusSmall: '0px',
    radiusLarge: '0px',
    displayFont: "'JetBrains Mono', 'Vazirmatn', monospace",
    // Persian glyphs only exist in Vazirmatn, so the RTL body keeps it while
    // the Latin shell still reads as monospace.
    bodyFont: "'JetBrains Mono', 'Vazirmatn', monospace",
    bodyFontRtl: "'Vazirmatn', 'JetBrains Mono', monospace",
    monoFont: "'JetBrains Mono', 'Vazirmatn', monospace",
    labelFont: "'JetBrains Mono', 'Vazirmatn', monospace",
    labelFontRtl: "'Vazirmatn', 'JetBrains Mono', monospace",
    letterSpacing: '0.08em',
    labelTransform: 'uppercase',
    labelWeight: '700',
    gridOpacity: '0.28',
    gridSize: '26px',
    scanOpacity: '0.22',
    grainOpacity: '0.05',
    vignetteOpacity: '0.55',
    glitchAmount: '1',
    borderStyle: 'solid',
    panelShadow: '0 0 0 1px rgb(var(--accent) / 0.18), 0 0 40px rgb(var(--accent) / 0.06)',
    backdropBlur: '6px',
    accentGlow: '0 0 22px rgb(var(--accent) / 0.28)',
    caret: 'blink',
    cursor: 'crosshair',
    chrome: true,
  },
};

export const DEFAULT_DESIGN_ID = 'studio';

const DESIGN_BY_ID = Object.fromEntries(
  Object.entries(DESIGNS).map(([key, value]) => [key, value]),
);

export const resolveDesign = (designId) =>
  DESIGN_BY_ID[designId] ?? DESIGN_BY_ID[DEFAULT_DESIGN_ID];

/**
 * Writes the skin onto the document as CSS custom properties plus a
 * `data-design` attribute that components use to branch their markup.
 */
export const applyDesignToDocument = (design) => {
  const root = document.documentElement;
  const skin = resolveDesign(design?.id ?? design);

  root.dataset.design = skin.id;
  root.style.setProperty('--radius', skin.radius);
  root.style.setProperty('--radius-sm', skin.radiusSmall);
  root.style.setProperty('--radius-lg', skin.radiusLarge);
  root.style.setProperty('--font-display', skin.displayFont);
  root.style.setProperty('--font-body', skin.bodyFont);
  root.style.setProperty('--font-body-rtl', skin.bodyFontRtl ?? skin.bodyFont);
  root.style.setProperty('--font-mono', skin.monoFont);
  root.style.setProperty('--font-label', skin.labelFont);
  root.style.setProperty('--font-label-rtl', skin.labelFontRtl ?? skin.labelFont);
  root.style.setProperty('--label-spacing', skin.letterSpacing);
  root.style.setProperty('--label-transform', skin.labelTransform);
  root.style.setProperty('--label-weight', skin.labelWeight);
  root.style.setProperty('--grid-opacity', skin.gridOpacity);
  root.style.setProperty('--grid-size', skin.gridSize);
  root.style.setProperty('--scan-opacity', skin.scanOpacity);
  root.style.setProperty('--grain-opacity', skin.grainOpacity);
  root.style.setProperty('--vignette-opacity', skin.vignetteOpacity);
  root.style.setProperty('--glitch-amount', skin.glitchAmount);
  root.style.setProperty('--panel-shadow', skin.panelShadow);
  root.style.setProperty('--backdrop-blur', skin.backdropBlur);
  root.style.setProperty('--accent-glow', skin.accentGlow);
  root.style.setProperty('--caret-style', skin.caret);
  root.style.setProperty('--pointer-cursor', skin.cursor);
};
