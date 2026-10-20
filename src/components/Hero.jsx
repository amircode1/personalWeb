import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  FaArrowDown,
  FaDownload,
  FaGithub,
  FaLinkedin,
  FaPaperPlane,
  FaTelegram,
} from 'react-icons/fa';

import Gallery from './gallery/Gallery';
import BootLog from './effects/BootLog';
import GlitchText from './effects/GlitchText';
import studioPortrait from '../assets/profile.jpg';
import coldPortrait from '../assets/portrait-cold.png';

const socialLinks = [
  { name: 'GitHub', icon: <FaGithub aria-hidden="true" />, href: 'https://github.com/amircode1' },
  { name: 'LinkedIn', icon: <FaLinkedin aria-hidden="true" />, href: 'https://linkedin.com/in/youruser' },
  { name: 'Telegram', icon: <FaTelegram aria-hidden="true" />, href: 'https://t.me/Amirmohammadrezaei1' },
];

const Hero = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'fa';

  const galleryItems = useMemo(
    () => [
      {
        id: 'studio',
        themeId: 'studio',
        image: studioPortrait,
        alt: t('hero.imageAlt'),
        kicker: t('gallery.kicker', { index: 1 }),
        title: t('gallery.items.studio.title'),
        meta: t('gallery.items.studio.meta'),
        objectPosition: 'center 24%',
      },
      {
        id: 'cold',
        themeId: 'cold',
        image: coldPortrait,
        alt: t('gallery.items.cold.title'),
        kicker: t('gallery.kicker', { index: 2 }),
        title: t('gallery.items.cold.title'),
        meta: t('gallery.items.cold.meta'),
        objectPosition: 'center 18%',
      },
    ],
    [t],
  );

  const galleryLabels = useMemo(
    () => ({
      expand: t('gallery.expand'),
      close: t('gallery.close'),
      next: t('gallery.next'),
      previous: t('gallery.previous'),
      shiftTheme: t('gallery.shiftTheme'),
    }),
    [t],
  );

  const getResumeFile = () =>
    i18n.language === 'fa' ? '/امیرمحمدرضایی.pdf' : '/amirmohammadrezaei.pdf';

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden border-b border-white/[0.08] bg-void pt-32 pb-16 transition-colors duration-700"
    >
      <div className="pointer-events-none absolute inset-0 cyber-grid opacity-70" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-accent/35" />
      <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px bg-white/[0.04] lg:block" />
      <div className="pointer-events-none absolute bottom-10 left-0 h-px w-1/3 bg-violet/40" />
      <div className="pointer-events-none absolute right-0 top-32 h-px w-1/4 bg-magenta/40" />

      <div className="container relative z-10 mx-auto w-full max-w-7xl px-6 md:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 35 : -35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className={`max-w-3xl ${isRTL ? 'text-right' : 'text-left'}`}
          >
            <div className="section-kicker mb-7">{t('hero.eyebrow')}</div>

            <p className="data-label mb-4 text-accent/70">{t('hero.systemLabel')}</p>
            <h1 className="max-w-3xl font-display text-5xl font-bold leading-[1.08] text-text-light sm:text-6xl lg:text-7xl">
              <GlitchText as="span" text={t('hero.name')} glitchChars={1} />
            </h1>
            <h2 className="mt-5 font-display text-2xl font-semibold leading-tight text-gradient sm:text-3xl lg:text-4xl">
              {t('hero.title')}
            </h2>
            <p className="section-copy mt-7 max-w-2xl text-base md:text-lg">{t('hero.description')}</p>

            <BootLog />

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <motion.a
                href="#contact"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="neon-button w-full sm:w-auto"
              >
                <FaPaperPlane aria-hidden="true" />
                <span>{t('hero.contactButton')}</span>
              </motion.a>
              <motion.a
                href={getResumeFile()}
                download
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="ghost-button w-full sm:w-auto"
              >
                <FaDownload aria-hidden="true" />
                <span>{t('hero.downloadCV')}</span>
              </motion.a>
            </div>

            <div className="mt-10 flex flex-col gap-5 border-t border-white/[0.08] pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-text/70">
                <span className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_currentColor]" aria-hidden="true" />
                  {t('hero.status')}
                </span>
                <span className="text-text/45">{t('hero.location')}</span>
              </div>
              <div className="flex items-center gap-3" aria-label={t('hero.socialLabel')}>
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={link.name}
                    aria-label={link.name}
                    className="social-icon"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: isRTL ? -35 : 35, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
            className="relative mx-auto w-full max-w-[25rem]"
          >
            <Gallery items={galleryItems} labels={galleryLabels} />
          </motion.div>
        </div>

        <motion.a
          href="#about"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-12 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-text/50 transition hover:text-accent sm:mt-16"
        >
          <span>{t('hero.scroll')}</span>
          <FaArrowDown aria-hidden="true" className="text-accent" />
        </motion.a>
      </div>
    </section>
  );
};

export default Hero;

