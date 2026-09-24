import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { IoLanguage } from 'react-icons/io5';

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'fa', label: 'فا' },
];

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const currentLang = (i18n.resolvedLanguage || i18n.language || 'en').split('-')[0];

  return (
    <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.03] p-1" aria-label={t('nav.language')}>
      {languages.map((language) => {
        const isActive = currentLang === language.code;
        return (
          <button
            key={language.code}
            type="button"
            onClick={() => i18n.changeLanguage(language.code)}
            aria-pressed={isActive}
            aria-label={`${t('nav.language')}: ${language.label}`}
            className="relative min-w-10 rounded-md px-2.5 py-1.5 text-xs font-bold text-text/65 transition hover:text-text-light"
          >
            {isActive && (
              <motion.span
                layoutId="active-language"
                className="absolute inset-0 rounded-md bg-accent/15 shadow-[inset_0_0_0_1px_rgba(34,211,238,0.35)]"
                transition={{ type: 'spring', duration: 0.45 }}
              />
            )}
            <span className={`relative z-10 ${isActive ? 'text-accent' : ''}`}>{language.label}</span>
          </button>
        );
      })}
      <IoLanguage className="mx-1 text-base text-violet-light" aria-hidden="true" />
    </div>
  );
};

export default LanguageSwitcher;
