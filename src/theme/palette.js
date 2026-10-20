import {
  hexToRgb,
  lerp,
  lerpAngle,
  oklchToRgb,
  rgbToHex,
  rgbToOklch,
} from './color';

const SAMPLE_WIDTH = 80;
const CLUSTER_COUNT = 6;
const CLUSTER_ITERATIONS = 18;

export const DEFAULT_DIRECTION = {
  hue: null,
  // Degrees added to the photo-derived base hue. The photo still owns the
  // colour, but each skin nudges it so the two portraits read as two
  // different products rather than two tints of the same one.
  hueShift: 0,
  accentChroma: 1,
  accentLightness: 0.8,
  accentMinChroma: 0.05,
  secondaryHueDelta: 69,
  secondaryHue: null,
  secondaryChroma: 0.72,
  secondaryLightness: 0.56,
  secondaryMinChroma: 0.045,
  tertiaryHueDelta: 113,
  tertiaryHue: null,
  tertiaryChroma: 0.66,
  tertiaryLightness: 0.62,
  tertiaryMinChroma: 0.045,
  goldHueDelta: -151,
  goldHue: null,
  goldChroma: 0.6,
  goldLightness: 0.74,
  goldMinChroma: 0.05,
  surfaceHue: null,
  // Degrees added to the photo-derived surface hue.
  surfaceHueShift: 0,
  surfaceChroma: 0.4,
  // Floor for surface chroma. A near-black photo has no usable shadow chroma
  // of its own, and the skin's own tint has to survive that.
  surfaceMinChroma: 0.004,
  voidLightness: 0.12,
  textLightness: 0.9,
  textChroma: 0.3,
  gridChroma: 0.7,
  gridLightness: 0.62,
};

const loadImageElement = (src) =>
  new Promise((resolve, reject) => {
    if (typeof Image === 'undefined') {
      reject(new Error('Image decoding is unavailable in this environment'));
      return;
    }
    const image = new Image();
    image.decoding = 'async';
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Unable to decode image: ${src}`));
    image.src = src;
  });

const readPixels = (image) => {
  const ratio = image.naturalHeight / Math.max(1, image.naturalWidth);
  const width = SAMPLE_WIDTH;
  const height = Math.max(1, Math.round(SAMPLE_WIDTH * ratio));

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext('2d', { willReadFrequently: true });
  context.drawImage(image, 0, 0, width, height);

  const { data } = context.getImageData(0, 0, width, height);
  const pixels = [];
  for (let index = 0; index < data.length; index += 4) {
    pixels.push({ r: data[index], g: data[index + 1], b: data[index + 2] });
  }
  return pixels;
};

const distanceSquared = (a, b) =>
  (a.L - b.L) ** 2 + (a.a - b.a) ** 2 + (a.b - b.b) ** 2;

const clusterPixels = (samples) => {
  const ordered = [...samples].sort((a, b) => a.L - b.L);
  const centers = Array.from({ length: CLUSTER_COUNT }, (_, index) => {
    const position = Math.floor((index * (ordered.length - 1)) / (CLUSTER_COUNT - 1));
    return { ...ordered[position] };
  });

  const assignment = new Array(samples.length).fill(0);

  for (let iteration = 0; iteration < CLUSTER_ITERATIONS; iteration += 1) {
    let shifted = false;

    for (let index = 0; index < samples.length; index += 1) {
      let best = 0;
      let bestDistance = Number.POSITIVE_INFINITY;
      for (let cluster = 0; cluster < centers.length; cluster += 1) {
        const distance = distanceSquared(samples[index], centers[cluster]);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = cluster;
        }
      }
      if (assignment[index] !== best) {
        assignment[index] = best;
        shifted = true;
      }
    }

    const sums = centers.map(() => ({ L: 0, a: 0, b: 0, count: 0 }));
    for (let index = 0; index < samples.length; index += 1) {
      const bucket = sums[assignment[index]];
      bucket.L += samples[index].L;
      bucket.a += samples[index].a;
      bucket.b += samples[index].b;
      bucket.count += 1;
    }

    centers.forEach((center, index) => {
      const bucket = sums[index];
      if (bucket.count === 0) return;
      centers[index] = {
        L: bucket.L / bucket.count,
        a: bucket.a / bucket.count,
        b: bucket.b / bucket.count,
      };
    });

    if (!shifted) break;
  }

  const counts = centers.map(() => 0);
  assignment.forEach((cluster) => {
    counts[cluster] += 1;
  });

  return centers.map((center, index) => ({
    ...center,
    count: counts[index],
    share: counts[index] / samples.length,
  }));
};

const toLch = (lab) => {
  const chroma = Math.hypot(lab.a, lab.b);
  let hue = (Math.atan2(lab.b, lab.a) * 180) / Math.PI;
  if (hue < 0) hue += 360;
  return { L: lab.L, C: chroma, h: hue };
};

export const detectSignature = (clusters) => {
  const byWeight = [...clusters].sort(
    (a, b) =>
      b.share * (0.35 + Math.hypot(b.a, b.b)) - a.share * (0.35 + Math.hypot(a.a, a.b)),
  );

  const dominant = byWeight[0] ?? { L: 0.2, a: 0, b: 0, share: 1 };
  const shadow = [...clusters].sort((a, b) => a.L - b.L)[0] ?? dominant;
  const highlight = [...clusters].sort((a, b) => b.L - a.L)[0] ?? dominant;
  const accentLab = byWeight.find((cluster) => Math.hypot(cluster.a, cluster.b) > 0.012) ?? dominant;

  return {
    dominant,
    shadow,
    highlight,
    accent: toLch(accentLab),
    shadowLch: toLch(shadow),
    highlightLch: toLch(highlight),
    averageLch: toLch(dominant),
  };
};

export const extractPalette = async (src) => {
  const image = await loadImageElement(src);
  const pixels = readPixels(image);
  const samples = pixels.map((pixel) => {
    const lch = rgbToOklch(pixel);
    const rad = (lch.h * Math.PI) / 180;
    return { L: lch.L, a: lch.C * Math.cos(rad), b: lch.C * Math.sin(rad) };
  });

  return detectSignature(clusterPixels(samples));
};

const makeLch = (hue, chroma, lightness) => ({
  L: Math.min(0.995, Math.max(0.015, lightness)),
  C: Math.max(0, chroma),
  h: ((hue % 360) + 360) % 360,
});

export const buildPaletteFromSignature = (signature, direction = {}) => {
  const d = { ...DEFAULT_DIRECTION, ...direction };

  const photoHue = signature.accent.h;
  const baseHue =
    d.hue === null || d.hue === undefined
      ? (photoHue + d.hueShift + 360) % 360
      : d.hue;

  const surfaceHue =
    d.surfaceHue === null || d.surfaceHue === undefined
      ? signature.shadowLch.h + d.surfaceHueShift
      : d.surfaceHue;

  const accentChroma = Math.max(d.accentMinChroma, signature.accent.C * d.accentChroma);
  const accent = makeLch(baseHue, accentChroma, d.accentLightness);

  // Each skin can pin one of the three secondary hues outright. That is what
  // keeps the two sites legible as different sites: the photo decides the
  // base, the skin decides what the rest of the triad looks like.
  const pickHue = (explicit, delta) =>
    explicit === null || explicit === undefined ? baseHue + delta : explicit;

  const secondary = makeLch(
    pickHue(d.secondaryHue, d.secondaryHueDelta),
    Math.max(d.secondaryMinChroma, accentChroma * d.secondaryChroma),
    d.secondaryLightness,
  );
  const tertiary = makeLch(
    pickHue(d.tertiaryHue, d.tertiaryHueDelta),
    Math.max(d.tertiaryMinChroma, accentChroma * d.tertiaryChroma),
    d.tertiaryLightness,
  );
  const gold = makeLch(
    pickHue(d.goldHue, d.goldHueDelta),
    Math.max(d.goldMinChroma, accentChroma * d.goldChroma),
    d.goldLightness,
  );

  const surfaceChroma = Math.max(
    d.surfaceMinChroma,
    signature.shadowLch.C * d.surfaceChroma,
  );

  const surfaces = [
    ['void', d.voidLightness, surfaceChroma * 0.85],
    ['dark', d.voidLightness + 0.03, surfaceChroma * 0.95],
    ['navy', d.voidLightness + 0.07, surfaceChroma * 1.1],
    ['panel', d.voidLightness + 0.12, surfaceChroma * 1.2],
    ['panelLight', d.voidLightness + 0.19, surfaceChroma * 1.3],
    ['grayDark', 0.28, surfaceChroma * 0.8],
  ].map(([key, lightness, chroma]) => [key, makeLch(surfaceHue, chroma, lightness)]);

  const textHue = signature.highlightLch.h;
  const texts = [
    ['text', d.textLightness, Math.max(0.003, signature.highlightLch.C * d.textChroma)],
    [
      'textLight',
      Math.min(0.99, d.textLightness + 0.08),
      Math.max(0.002, signature.highlightLch.C * d.textChroma * 0.7),
    ],
    ['textDark', 0.5, surfaceChroma * 1.1],
  ].map(([key, lightness, chroma]) => [
    key,
    makeLch(key === 'textDark' ? surfaceHue : textHue, chroma, lightness),
  ]);

  const grid = makeLch(baseHue, Math.max(0.02, accentChroma * d.gridChroma), d.gridLightness);

  const entries = {
    accent,
    accentLight: makeLch(baseHue, accentChroma * 0.85, Math.min(0.95, d.accentLightness + 0.14)),
    accentDark: makeLch(baseHue, accentChroma * 1.1, Math.max(0.22, d.accentLightness - 0.26)),
    violet: secondary,
    violetLight: makeLch(secondary.h, secondary.C * 0.8, 0.8),
    violetDark: makeLch(secondary.h, secondary.C * 0.95, 0.32),
    magenta: tertiary,
    magentaLight: makeLch(tertiary.h, tertiary.C * 0.75, 0.82),
    magentaDark: makeLch(tertiary.h, tertiary.C * 0.9, 0.36),
    gold,
    goldLight: makeLch(gold.h, gold.C * 0.8, 0.88),
    goldDark: makeLch(gold.h, gold.C * 0.95, 0.4),
    grid,
    ...Object.fromEntries(surfaces),
    ...Object.fromEntries(texts),
  };

  const palette = {};
  Object.entries(entries).forEach(([key, lch]) => {
    const { r, g, b } = oklchToRgb(lch);
    palette[key] = rgbToHex({ r, g, b });
  });

  return palette;
};

export const paletteToRgbMap = (palette) =>
  Object.fromEntries(
    Object.entries(palette)
      .filter(([, value]) => typeof value === 'string')
      .map(([key, hex]) => {
        const { r, g, b } = hexToRgb(hex);
        return [key, `${r} ${g} ${b}`];
      }),
  );

export { lerp, lerpAngle };
