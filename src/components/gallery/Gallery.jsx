import { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaExpand } from 'react-icons/fa';

import { useTheme } from '../../theme/ThemeContext';

const AUTOPLAY_MS = 7000;

const Gallery = ({ items, labels }) => {
  const { activeThemeId, isTransitioning, transitionTo, transitionProgress } = useTheme();
  const [index, setIndex] = useState(() => {
    const linked = items.findIndex((item) => item.themeId === activeThemeId);
    return linked >= 0 ? linked : 0;
  });
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const reduceMotion = useReducedMotion();
  const autoplayRef = useRef(null);
  const frameRef = useRef(null);
  const [isInView, setIsInView] = useState(true);
  const [failedImages, setFailedImages] = useState({});

  const count = items.length;
  const activeItem = items[index];

  const goTo = useCallback(
    (nextIndex, nextDirection) => {
      const resolved = ((nextIndex % count) + count) % count;
      setDirection(nextDirection);
      setIndex(resolved);

      // The gallery index is the single source of truth: whatever portrait is
      // on screen decides the theme, so the two can never drift apart.
      const linked = items[resolved];
      if (linked?.themeId) {
        transitionTo(linked.themeId);
      }
    },
    [count, items, transitionTo],
  );

  const goNext = useCallback(() => {
    goTo(index + 1, 1);
  }, [goTo, index]);

  const goPrevious = useCallback(() => {
    goTo(index - 1, -1);
  }, [goTo, index]);

  useEffect(() => {
    const node = frameRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        setIsInView(entries.some((entry) => entry.isIntersecting));
      },
      { threshold: 0.25 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Warm every portrait up front. Without this the frame shows a broken
  // alt-text placeholder for a beat while the new file is still decoding.
  //
  // The cleanup deliberately does NOT reset `image.src`. An <img> that shares
  // the same URL is deduped onto the same network request, so blanking the
  // preload aborts the request the visible <img> is still waiting on — the
  // frame then hangs on its alt text forever with no error event. Letting the
  // browser evict the decoded image from its cache is the correct cleanup.
  useEffect(() => {
    const preloads = items
      .filter((item) => item.image)
      .map((item) => {
        const image = new Image();
        image.decoding = 'async';
        image.src = item.image;
        return image;
      });

    return () => {
      preloads.forEach((image) => {
        image.onload = null;
        image.onerror = null;
      });
    };
  }, [items]);

  useEffect(() => {
    if (isPaused || isExpanded || reduceMotion || !isInView) return undefined;

    autoplayRef.current = window.setTimeout(() => {
      goTo(index + 1, 1);
    }, AUTOPLAY_MS);

    return () => window.clearTimeout(autoplayRef.current);
  }, [index, count, isPaused, isExpanded, reduceMotion, isInView, goTo]);

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'ArrowLeft') goPrevious();
      if (event.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goNext, goPrevious]);

  const slideVariants = {
    enter: (slideDirection) => ({
      x: slideDirection > 0 ? '18%' : '-18%',
      opacity: 0,
      scale: 1.08,
      filter: 'blur(14px)',
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
    },
    exit: (slideDirection) => ({
      x: slideDirection > 0 ? '-14%' : '14%',
      opacity: 0,
      scale: 0.94,
      filter: 'blur(12px)',
    }),
  };

  return (
    <div className="relative">
      <div
        ref={frameRef}
        className="gallery-frame hud-frame relative overflow-hidden rounded-xl"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative aspect-[4/5] w-full sm:aspect-[3/4]">
          <AnimatePresence initial={false} custom={direction} mode="sync">
            <motion.div
              key={activeItem.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={
                reduceMotion
                  ? { duration: 0.2 }
                  : { duration: 1.05, ease: [0.16, 1, 0.3, 1] }
              }
              className="absolute inset-0"
            >
              <img
                src={activeItem.image}
                alt={activeItem.alt}
                className="h-full w-full object-cover"
                style={{ objectPosition: activeItem.objectPosition ?? 'center 22%' }}
                onError={() =>
                  setFailedImages((current) => ({ ...current, [activeItem.id]: true }))
                }
              />
              {failedImages[activeItem.id] && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-panel text-center">
                  <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-accent">
                    {activeItem.title}
                  </span>
                  <span className="text-[11px] text-text/45">signal unavailable</span>
                </div>
              )}
              <div className="pointer-events-none absolute inset-0 gallery-grade" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/85 via-transparent to-void/35" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-accent/40" />
            </motion.div>
          </AnimatePresence>

          <AnimatePresence>
            {isTransitioning && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="pointer-events-none absolute inset-0 z-20 bg-void"
                style={{ opacity: 1 - transitionProgress * 0.85 }}
              >
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  exit={{ scaleX: 0 }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-y-0 left-0 w-full origin-left bg-accent/10"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 p-5 sm:p-6">
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-void via-void/72 to-transparent" />
            <div className="relative min-w-0">
              <motion.p
                key={`${activeItem.id}-label`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="data-label text-accent"
              >
                {activeItem.kicker}
              </motion.p>
              <motion.h3
                key={`${activeItem.id}-title`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="mt-2 font-display text-xl font-bold text-text-light sm:text-2xl"
              >
                {activeItem.title}
              </motion.h3>
              <motion.p
                key={`${activeItem.id}-meta`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="mt-1 text-xs text-text/60"
              >
                {activeItem.meta}
              </motion.p>
            </div>

            <span className="relative shrink-0 font-display text-xs font-bold tracking-[0.2em] text-text-light/70">
              {String(index + 1).padStart(2, '0')}
              <span className="text-text/30"> / {String(count).padStart(2, '0')}</span>
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsExpanded(true)}
            aria-label={labels.expand}
            title={labels.expand}
            className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-void/70 text-text-light backdrop-blur-md transition hover:border-accent hover:text-accent"
          >
            <FaExpand aria-hidden="true" />
          </button>
        </div>

        <div className="absolute inset-y-0 left-0 z-10 flex items-center pl-2 sm:pl-3">
          <GalleryArrow direction="prev" onClick={goPrevious} label={labels.previous} />
        </div>
        <div className="absolute inset-y-0 right-0 z-10 flex items-center pr-2 sm:pr-3">
          <GalleryArrow direction="next" onClick={goNext} label={labels.next} />
        </div>
        <div className="absolute inset-x-0 bottom-0 z-10 h-1 bg-white/[0.06]">
          <motion.div
            key={`${activeItem.id}-progress`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: reduceMotion ? 0.2 : AUTOPLAY_MS / 1000, ease: 'linear' }}
            className="h-full origin-left bg-accent shadow-[0_0_12px_currentColor]"
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {items.map((item, itemIndex) => (
            <button
              key={item.id}
              type="button"
              onClick={() => goTo(itemIndex, itemIndex > index ? 1 : -1)}
              aria-label={item.title}
              aria-current={itemIndex === index}
              className={`relative h-1.5 rounded-full transition-all duration-500 ${
                itemIndex === index ? 'w-10 bg-accent' : 'w-4 bg-white/15 hover:bg-white/30'
              }`}
            >
              {itemIndex === index && (
                <span className="absolute inset-0 rounded-full bg-accent shadow-[0_0_12px_currentColor]" />
              )}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => {
            const nextIndex = (index + 1) % count;
            goTo(nextIndex, 1);
          }}
          disabled={isTransitioning}
          className="gallery-theme-button group relative inline-flex items-center gap-2 rounded-lg border border-accent/35 bg-void/70 px-3.5 py-2 text-xs font-bold text-accent backdrop-blur-md transition hover:border-accent hover:bg-accent/10 disabled:opacity-50"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span>{labels.shiftTheme}</span>
        </button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-void/92 p-4 backdrop-blur-xl"
            onClick={() => setIsExpanded(false)}
          >
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              src={activeItem.image}
              alt={activeItem.alt}
              className="max-h-[88vh] max-w-full rounded-xl border border-white/12 object-contain shadow-[0_40px_120px_rgba(0,0,0,0.7)]"
            />
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              aria-label={labels.close}
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 bg-void/80 text-text-light transition hover:border-accent hover:text-accent"
            >
              <span aria-hidden="true" className="text-lg">✕</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const GalleryArrow = ({ direction, onClick, label }) => (
  <motion.button
    type="button"
    onClick={onClick}
    aria-label={label}
    title={label}
    whileHover={{ scale: 1.12, x: direction === 'next' ? 3 : -3 }}
    whileTap={{ scale: 0.92 }}
    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-void/65 text-text-light/80 backdrop-blur-md transition hover:border-accent hover:bg-accent/10 hover:text-accent"
  >
    {direction === 'next' ? <FaChevronRight aria-hidden="true" /> : <FaChevronLeft aria-hidden="true" />}
  </motion.button>
);

Gallery.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
      kicker: PropTypes.string,
      title: PropTypes.string.isRequired,
      meta: PropTypes.string,
      objectPosition: PropTypes.string,
      themeId: PropTypes.string,
    }),
  ).isRequired,
  labels: PropTypes.shape({
    expand: PropTypes.string.isRequired,
    close: PropTypes.string.isRequired,
    next: PropTypes.string.isRequired,
    previous: PropTypes.string.isRequired,
    shiftTheme: PropTypes.string.isRequired,
  }).isRequired,
};

GalleryArrow.propTypes = {
  direction: PropTypes.oneOf(['next', 'prev']).isRequired,
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default Gallery;




