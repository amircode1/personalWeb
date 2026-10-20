import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Portfolio from '../components/Portfolio';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import MatrixRain from '../components/effects/MatrixRain';
import { useTheme } from '../theme/ThemeContext';

const HomePage = () => {
  const { t, i18n } = useTranslation();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { isTransitioning, transitionProgress } = useTheme();

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 560);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="site-shell min-h-screen">
      <motion.div className="scroll-progress fixed inset-x-0 top-0 z-[60] h-1" style={{ scaleX }} />

      <div className="pointer-events-none fixed inset-0 z-0">
        <MatrixRain />
        <div className="cyber-grid absolute inset-0 opacity-25" />
        <div className="scanline absolute inset-x-0 -top-full h-1/2" />
        <div className="absolute bottom-8 left-6 hidden font-display text-[10px] tracking-[0.32em] text-text-dark/40 lg:block [writing-mode:vertical-rl]">
          SIGNAL / 2025
        </div>
        <div className="absolute right-6 top-1/3 hidden font-display text-[10px] tracking-[0.32em] text-text-dark/40 lg:block [writing-mode:vertical-rl]">
          SYSTEM ONLINE
        </div>
      </div>

      {/* CRT furniture — only visible under the cold skin */}
      <div className="crt-lines" aria-hidden="true" />
      <div className="crt-grain" aria-hidden="true" />
      <div className="crt-overlay" aria-hidden="true" />

      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            key="theme-veil"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="pointer-events-none fixed inset-0 z-[70]"
          >
            <div className="morph-burst" />
            <motion.div
              initial={{ opacity: 0, scaleX: 0.4 }}
              animate={{ opacity: [0.2, 0.55, 0.2], scaleX: 1 }}
              exit={{ opacity: 0, scaleX: 1.4 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 bg-void"
              style={{ opacity: 1 - transitionProgress * 0.9 }}
            />
            <div className="theme-veil absolute inset-0" />
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              exit={{ scaleX: 0, opacity: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-0 top-1/2 h-px origin-left bg-accent shadow-[0_0_24px_currentColor]"
            />
            {[18, 42, 68].map((top) => (
              <motion.span
                key={top}
                className="morph-tear"
                style={{ top: `${top}%` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.7, 0] }}
                transition={{ duration: 0.6, delay: top / 400 }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Portfolio />
        <Contact />
        <Footer />
      </main>

      <motion.button
        type="button"
        onClick={scrollToTop}
        initial={false}
        animate={{ opacity: showScrollTop ? 1 : 0, y: showScrollTop ? 0 : 12 }}
        aria-hidden={!showScrollTop}
        tabIndex={showScrollTop ? 0 : -1}
        aria-label={t('common.scrollTop')}
        title={t('common.scrollTop')}
        className={`fixed bottom-6 z-40 flex h-12 w-12 items-center justify-center rounded-lg border border-accent/45 bg-void/85 text-accent shadow-neon backdrop-blur-md transition hover:border-accent hover:bg-accent/10 md:bottom-8 ${i18n.language === 'fa' ? 'left-6 md:left-8' : 'right-6 md:right-8'}`}
      >
        <FaArrowUp aria-hidden="true" />
      </motion.button>

      <span className="sr-only">
        {i18n.language === 'fa'
          ? 'صفحه شخصی امیرمحمد رضایی'
          : 'Amirmohammad Rezaei personal portfolio'}
      </span>
    </div>
  );
};

export default HomePage;
