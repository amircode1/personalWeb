import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaDownload, FaFingerprint, FaLayerGroup } from 'react-icons/fa';
import coldPortrait from '../assets/portrait-cold.png';
import studioPortrait from '../assets/profile.jpg';
import music from '../assets/Doors_Light_Funk_slowed_-_Dj_Vttt77_Dj_Vyz.mp3';
import MusicVisualizer from './MusicVisualizer';
import { useTheme } from '../theme/ThemeContext';

const About = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'fa';
  const [amplitude, setAmplitude] = useState(0);
  const { palette, activeThemeId } = useTheme();

  // The About portrait follows the gallery so the whole site reads as one image.
  const portrait = activeThemeId === 'cold' ? coldPortrait : studioPortrait;
  const portraitAlt = activeThemeId === 'cold' ? t('gallery.items.cold.title') : t('hero.imageAlt');

  const getResumeFile = () => (i18n.language === 'fa' ? '/امیرمحمدرضایی.pdf' : '/amirmohammadrezaei.pdf');

  const stats = [
    { label: 'experience', value: '02+' },
    { label: 'projects', value: '05+' },
  ];

  return (
    <section id="about" className="section-shell relative overflow-hidden border-b border-white/[0.08] bg-dark py-20 sm:py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 cyber-grid opacity-30" />
      <div className="pointer-events-none absolute left-0 top-24 h-px w-1/4 bg-violet/40" />

      <div className="container relative z-10 mx-auto max-w-7xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <div className="section-kicker mb-5">{t('about.subtitle')}</div>
            <h2 className="section-title max-w-2xl">{t('about.title')}</h2>
            <div className="hud-tag mt-4">
              <span className="hud-tag__index">01</span>
              <span>{t('about.hudTag')}</span>
            </div>
          </div>
          <p className={`section-copy max-w-md ${isRTL ? 'text-right' : 'text-left'}`}>{t('about.description')}</p>
        </motion.div>

        <div className="grid min-w-0 items-start gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 35 : -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto w-full max-w-[28rem] lg:max-w-none"
          >
            <div className="pointer-events-none absolute -inset-4 rounded-lg border border-violet/25" />
            <div className="pointer-events-none absolute -right-7 top-12 h-24 w-px bg-accent/70" />
            <div className="pointer-events-none absolute -left-7 bottom-20 h-16 w-px bg-magenta/70" />
            <figure className="profile-frame hud-frame overflow-hidden rounded-lg p-2">
              <div className="relative overflow-hidden rounded-md bg-panel">
                <img
                  src={portrait}
                  alt={portraitAlt}
                  className="aspect-[4/5] w-full object-cover object-[center_28%]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                  <div>
                    <p className="data-label text-accent">{t('about.profileLabel')}</p>
                    <p className="mt-1 font-display text-lg font-bold text-text-light">AMIR.REZAEI</p>
                  </div>
                  <FaFingerprint className="text-2xl text-accent/80" aria-hidden="true" />
                </div>
              </div>
            </figure>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 px-1">
              <span className="data-label whitespace-nowrap">ID: AMR_01</span>
              <span className="inline-flex whitespace-nowrap rounded-full border border-violet/35 bg-violet/[0.08] px-3 py-1.5 text-xs font-bold leading-none text-violet-light">
                {t('about.available')}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: isRTL ? -35 : 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className={`min-w-0 max-w-full overflow-hidden ${isRTL ? 'text-right' : 'text-left'}`}
          >
            <div className="flex items-center gap-3 text-accent">
              <FaLayerGroup aria-hidden="true" />
              <span className="data-label text-accent">{t('about.focus')}</span>
            </div>
            <p className="mt-5 min-w-0 max-w-full break-words text-base leading-[2] text-text/85 sm:text-lg md:text-xl">{t('about.longDescription')}</p>

            <div className="mt-9 grid grid-cols-2 gap-3 sm:gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 + index * 0.1 }}
                  className="glass-panel rounded-lg p-4 sm:p-5"
                >
                  <p className="font-display text-3xl font-bold text-accent sm:text-4xl">{stat.value}</p>
                  <p className="mt-2 text-xs font-semibold text-text/65 sm:text-sm">{t(`about.stats.${stat.label}`)}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href={getResumeFile()} download className="neon-button w-full sm:w-auto">
                <FaDownload aria-hidden="true" />
                <span>{t('about.downloadCV')}</span>
              </a>
              <span className="data-label px-1 text-text-dark">{t('about.resumeNote')}</span>
            </div>

            <div className="glass-panel relative mt-10 overflow-hidden rounded-lg p-4 sm:p-5">
              <div className="relative z-10 mb-3 flex items-center justify-between gap-3">
                <div>
                  <p className="data-label text-accent">{t('about.audioLabel')}</p>
                  <p className="mt-1 text-sm font-semibold text-text-light">{t('about.audioTitle')}</p>
                </div>
                <div className={isRTL ? 'text-left' : 'text-right'}>
                  <p className="data-label">{t('about.signal')}</p>
                  <p className="mt-1 font-display text-xs font-bold text-violet-light">{String(Math.round(amplitude)).padStart(2, '0')}%</p>
                </div>
              </div>
              <MusicVisualizer
                src={music}
                onAmplitudeChange={setAmplitude}
                accentColor={palette.accent}
                playLabel={t('about.playAudio')}
                pauseLabel={t('about.pauseAudio')}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;


