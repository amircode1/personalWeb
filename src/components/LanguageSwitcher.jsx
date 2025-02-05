import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { IoLanguage } from 'react-icons/io5';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'fa', label: 'فا' }
  ];

  return (
    <div className="flex items-center bg-dark/50 rounded-full p-1">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => i18n.changeLanguage(lang.code)}
          className="relative px-4 py-2 text-sm font-medium"
        >
          {currentLang === lang.code && (
            <motion.div
              layoutId="activeLanguage"
              className="absolute inset-0 bg-accent rounded-full"
              transition={{ type: "spring", duration: 0.5 }}
            />
          )}
          <span className={`relative z-10 ${
            currentLang === lang.code ? 'text-white' : 'text-text-light'
          }`}>
            {lang.label}
          </span>
        </button>
      ))}
      <IoLanguage className="text-accent ml-2 text-xl" />
    </div>
  );
};

export default LanguageSwitcher;
