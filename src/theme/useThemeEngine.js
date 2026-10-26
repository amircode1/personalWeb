import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  easeInOutCubic,
  hexToRgb,
  lerp,
  lerpAngle,
  oklchToRgb,
  rgbToOklch,
} from './color';
import {
  buildPaletteFromSignature,
  extractPalette,
  paletteToRgbMap,
} from './palette';
import { applyDesignToDocument, DEFAULT_DESIGN_ID, resolveDesign } from './design';

import coldPortrait from '../assets/portrait-cold.png';
import studioPortrait from '../assets/profile.jpg';

export const THEMES = [
  {
    id: 'studio',
    label: 'Maximal Bloom',
    labelFa: 'ماکسیمال',
    image: studioPortrait,
    design: 'maximal',
    direction: {
      // The portrait owns the base hue, but each skin nudges it and pins its
      // own secondary triad. The maximal skin wants a saturated clash, not a
      // tint of the photograph: bolder chroma across every pinned hue.
      hue: null,
      hueShift: 0,
      accentChroma: 1.5,
      accentLightness: 0.78,
      accentMinChroma: 0.12,
      // Maximal = hot rose-violet + coral secondary over a cool photographic base.
      secondaryHue: 330,
      secondaryHueDelta: 68,
      secondaryChroma: 1.1,
      secondaryLightness: 0.55,
      secondaryMinChroma: 0.09,
      tertiaryHue: 52,
      tertiaryHueDelta: 38,
      tertiaryChroma: 1.05,
      tertiaryLightness: 0.62,
      tertiaryMinChroma: 0.09,
      goldHue: 84,
      goldHueDelta: -132,
      goldChroma: 0.9,
      goldLightness: 0.76,
      goldMinChroma: 0.1,
      surfaceHue: null,
      surfaceHueShift: 0,
      surfaceChroma: 0.6,
      surfaceMinChroma: 0.02,
      voidLightness: 0.14,
      textLightness: 0.91,
      textChroma: 0.38,
      gridChroma: 0.85,
      gridLightness: 0.6,
    },
  },
  {
    id: 'cold',
    label: 'Cold Cyberpunk',
    labelFa: 'سایبرپانک سرد',
    image: coldPortrait,
    design: 'cold',
    direction: {
      // Cold = a colder, greener base with a hard acid-green secondary and a
      // signal-red tertiary. The photographic base still comes from the
      // portrait, but the palette reads as compromised hardware.
      hue: null,
      hueShift: -22,
      accentChroma: 1.9,
      accentLightness: 0.8,
      accentMinChroma: 0.075,
      secondaryHue: 158,
      secondaryHueDelta: 38,
      secondaryChroma: 0.8,
      secondaryLightness: 0.5,
      secondaryMinChroma: 0.06,
      tertiaryHue: 8,
      tertiaryHueDelta: -128,
      tertiaryChroma: 0.7,
      tertiaryLightness: 0.6,
      tertiaryMinChroma: 0.06,
      goldHue: 92,
      goldHueDelta: -78,
      goldChroma: 0.75,
      goldLightness: 0.78,
      goldMinChroma: 0.07,
      surfaceHue: null,
      surfaceHueShift: -18,
      surfaceChroma: 0.62,
      surfaceMinChroma: 0.016,
      voidLightness: 0.11,
      textLightness: 0.89,
      textChroma: 0.26,
      gridChroma: 0.85,
      gridLightness: 0.58,
    },
  },
];

export const DEFAULT_THEME_ID = 'studio';

const THEME_BY_ID = Object.fromEntries(THEMES.map((theme) => [theme.id, theme]));
const STORAGE_KEY = 'personalweb.theme';

const readStoredTheme = () => {
  if (typeof window === 'undefined') return DEFAULT_THEME_ID;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored && THEME_BY_ID[stored] ? stored : DEFAULT_THEME_ID;
  } catch {
    return DEFAULT_THEME_ID;
  }
};

const camelToKebab = (value) => value.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

const paletteToOklchMap = (palette) =>
  Object.fromEntries(
    Object.entries(palette).map(([key, hex]) => [key, rgbToOklch(hexToRgb(hex))]),
  );

const oklchMapToHex = (map) =>
  Object.fromEntries(
    Object.entries(map).map(([key, lch]) => {
      const { r, g, b } = oklchToRgb(lch);
      const channel = (value) =>
        Number.isFinite(value) ? Math.round(value).toString(16).padStart(2, '0') : '00';
      return [key, `#${channel(r)}${channel(g)}${channel(b)}`];
    }),
  );

export const interpolatePalette = (from, to, t) => {
  const fromLch = paletteToOklchMap(from);
  const toLch = paletteToOklchMap(to);
  const result = {};

  Object.keys(fromLch).forEach((key) => {
    const start = fromLch[key];
    const end = toLch[key];
    result[key] = {
      L: lerp(start.L, end.L, t),
      C: lerp(start.C, end.C, t),
      h: lerpAngle(start.h, end.h, t),
    };
  });

  return oklchMapToHex(result);
};

export const applyPaletteToDocument = (palette) => {
  const root = document.documentElement;
  const rgbMap = paletteToRgbMap(palette);

  Object.entries(rgbMap).forEach(([key, triplet]) => {
    root.style.setProperty(`--${camelToKebab(key)}`, triplet);
  });

  Object.entries(palette).forEach(([key, hex]) => {
    root.style.setProperty(`--${camelToKebab(key)}-hex`, hex);
  });
};

const FALLBACK_PALETTE = {
  accent: '#22d3ee',
  accentLight: '#67e8f9',
  accentDark: '#0891b2',
  violet: '#8b5cf6',
  violetLight: '#c4b5fd',
  violetDark: '#6d28d9',
  magenta: '#d946ef',
  magentaLight: '#f0abfc',
  magentaDark: '#a21caf',
  gold: '#f59e0b',
  goldLight: '#fde68a',
  goldDark: '#b45309',
  void: '#05060b',
  dark: '#080a12',
  navy: '#0b1020',
  panel: '#101426',
  panelLight: '#151b32',
  grayDark: '#252b42',
  text: '#c7d2e8',
  textLight: '#f4f7ff',
  textDark: '#7c8aa5',
  grid: '#5a71a6',
};

const NEUTRAL_SIGNATURE = {
  dominant: { L: 0.2, a: 0, b: 0, share: 1 },
  shadow: { L: 0.14, a: 0, b: 0, share: 1 },
  highlight: { L: 0.92, a: 0, b: 0, share: 1 },
  accent: { L: 0.8, C: 0.14, h: 196 },
  shadowLch: { L: 0.14, C: 0.02, h: 258 },
  highlightLch: { L: 0.92, C: 0.01, h: 258 },
};

export const useThemeEngine = () => {
  const [activeThemeId, setActiveThemeId] = useState(readStoredTheme);
  const [palette, setPalette] = useState(FALLBACK_PALETTE);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionProgress, setTransitionProgress] = useState(1);
  const [isReady, setIsReady] = useState(false);
  const [designId, setDesignId] = useState(DEFAULT_DESIGN_ID);

  const animationRef = useRef(null);
  const paletteRef = useRef(FALLBACK_PALETTE);
  const activeThemeIdRef = useRef(readStoredTheme());
  const transitionTokenRef = useRef(0);

  const themeById = useMemo(() => THEME_BY_ID, []);

  useEffect(() => {
    paletteRef.current = palette;
  }, [palette]);

  const resolveTheme = useCallback(
    (themeId) => themeById[themeId] ?? themeById[DEFAULT_THEME_ID],
    [themeById],
  );

  const ensureSignature = useCallback(async (theme) => {
    if (!theme.image) return NEUTRAL_SIGNATURE;
    if (!theme.signature) {
      theme.signature = await extractPalette(theme.image);
    }
    return theme.signature;
  }, []);

  const buildThemePalette = useCallback(
    async (theme) => {
      const signature = await ensureSignature(theme);
      return buildPaletteFromSignature(signature, theme.direction);
    },
    [ensureSignature],
  );

  const transitionTo = useCallback(
    async (themeId) => {
      const theme = resolveTheme(themeId);
      if (!theme || theme.id === activeThemeIdRef.current) return;

      // A newer request supersedes any in-flight transition.
      const token = transitionTokenRef.current + 1;
      transitionTokenRef.current = token;

      setIsTransitioning(true);

      // The skin swaps instantly while the palette cross-fades. Geometry,
      // type and chrome snap over; colour drifts. That contrast is what makes
      // the switch read as two different machines rather than one recoloured page.
      const skin = resolveDesign(theme.design ?? DEFAULT_DESIGN_ID);
      applyDesignToDocument(skin);
      setDesignId(skin.id);
      document.documentElement.classList.add('is-morphing');

      const targetPalette = await buildThemePalette(theme);
      if (transitionTokenRef.current !== token) return;

      const fromPalette = paletteRef.current;
      const start = performance.now();
      const duration = 1500;

      if (animationRef.current) cancelAnimationFrame(animationRef.current);

      const step = (now) => {
        if (transitionTokenRef.current !== token) return;

        const elapsed = Math.min(1, (now - start) / duration);
        const eased = easeInOutCubic(elapsed);
        const next = interpolatePalette(fromPalette, targetPalette, eased);
        setPalette(next);
        applyPaletteToDocument(next);
        setTransitionProgress(eased);

        if (elapsed < 1) {
          animationRef.current = requestAnimationFrame(step);
        } else {
          animationRef.current = null;
          setTransitionProgress(1);
          setIsTransitioning(false);
          document.documentElement.classList.remove('is-morphing');
        }
      };

      animationRef.current = requestAnimationFrame(step);
      setActiveThemeId(theme.id);
      activeThemeIdRef.current = theme.id;

      try {
        window.localStorage.setItem(STORAGE_KEY, theme.id);
      } catch {
        /* storage unavailable */
      }
    },
    [buildThemePalette, resolveTheme],
  );

  const initialise = useCallback(async () => {
    const theme = resolveTheme(readStoredTheme());
    const skin = resolveDesign(theme.design ?? DEFAULT_DESIGN_ID);
    applyDesignToDocument(skin);

    const resolved = await buildThemePalette(theme);
    setPalette(resolved);
    paletteRef.current = resolved;
    applyPaletteToDocument(resolved);
    setActiveThemeId(theme.id);
    activeThemeIdRef.current = theme.id;
    setDesignId(skin.id);
    setIsReady(true);
  }, [buildThemePalette, resolveTheme]);

  useEffect(() => {
    initialise();
  }, [initialise]);

  useEffect(
    () => () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    },
    [],
  );

  return {
    themes: THEMES,
    activeThemeId,
    designId,
    palette,
    isTransitioning,
    transitionProgress,
    isReady,
    transitionTo,
  };
};
