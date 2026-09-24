import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  SiGithub,
  SiJavascript,
  SiReact,
  SiReactquery,
  SiRedux,
  SiTailwindcss,
} from 'react-icons/si';

const skills = [
  { name: 'React', icon: <SiReact aria-hidden="true" />, level: 92, tone: 'text-accent' },
  { name: 'Redux', icon: <SiRedux aria-hidden="true" />, level: 84, tone: 'text-violet-light' },
  { name: 'React Query', icon: <SiReactquery aria-hidden="true" />, level: 82, tone: 'text-accent' },
  { name: 'GitHub', icon: <SiGithub aria-hidden="true" />, level: 88, tone: 'text-text-light' },
  { name: 'JavaScript', icon: <SiJavascript aria-hidden="true" />, level: 90, tone: 'text-gold-light' },
  { name: 'Tailwind CSS', icon: <SiTailwindcss aria-hidden="true" />, level: 94, tone: 'text-accent-light' },
];

const Skills = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'fa';

  return (
    <section id="skills" className="section-shell relative overflow-hidden border-b border-white/[0.08] bg-void py-20 sm:py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 cyber-grid opacity-20" />
      <div className="container relative z-10 mx-auto max-w-7xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <div className="section-kicker mb-5">{t('skills.subtitle')}</div>
            <h2 className="section-title max-w-2xl">{t('skills.title')}</h2>
          </div>
          <p className={`section-copy max-w-md ${isRTL ? 'text-right' : 'text-left'}`}>{t('skills.description')}</p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill, index) => (
            <motion.article
              key={skill.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.07, duration: 0.45 }}
              whileHover={{ y: -5 }}
              className="skill-card group rounded-lg p-5 sm:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-2xl transition group-hover:border-accent/40 ${skill.tone}`}>
                  {skill.icon}
                </div>
                <span className="data-label text-text-dark">0{index + 1} / CORE</span>
              </div>
              <div className={`mt-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                <h3 className="font-display text-lg font-bold text-text-light">{skill.name}</h3>
                <div className="mt-5 flex items-center justify-between gap-3">
                  <span className="data-label">{t('skills.proficiency')}</span>
                  <span className={`font-display text-sm font-bold ${skill.tone}`}>{skill.level}%</span>
                </div>
                <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/[0.08]">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.25 + index * 0.07, duration: 0.8, ease: 'easeOut' }}
                    className={`h-full rounded-full bg-current ${skill.tone} shadow-[0_0_12px_currentColor]`}
                  />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45 }}
          className={`mt-12 border-t border-white/[0.08] pt-5 ${isRTL ? 'text-right' : 'text-left'}`}
        >
          <p className="section-copy text-sm">{t('skills.additionalInfo')}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
