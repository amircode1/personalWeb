import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaChevronUp, FaGithub, FaHeart, FaLinkedin, FaTelegram } from 'react-icons/fa';

const footerLinks = [
  { name: 'home', href: '#home' },
  { name: 'about', href: '#about' },
  { name: 'skills', href: '#skills' },
  { name: 'portfolio', href: '#portfolio' },
  { name: 'contact', href: '#contact' },
];

const socialLinks = [
  { name: 'GitHub', icon: <FaGithub aria-hidden="true" />, href: 'https://github.com/amircode1' },
  { name: 'LinkedIn', icon: <FaLinkedin aria-hidden="true" />, href: 'https://linkedin.com/in/yourusername' },
  { name: 'Telegram', icon: <FaTelegram aria-hidden="true" />, href: 'https://t.me/Amirmohammadrezaei1' },
];

const Footer = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'fa';
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.08] bg-dark py-12">
      <div className="pointer-events-none absolute inset-0 cyber-grid opacity-15" />
      <div className="container relative z-10 mx-auto max-w-7xl px-6 md:px-10">
        <div className={`grid gap-10 border-b border-white/[0.08] pb-10 md:grid-cols-[1.2fr_0.8fr_0.8fr] ${isRTL ? 'text-right' : 'text-left'}`}>
          <div>
            <a href="#home" className="inline-flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-accent/50 bg-accent/10 font-display text-xs font-bold text-accent">AR</span>
              <span className="font-display text-lg font-bold tracking-[0.12em] text-text-light">AMIR <span className="text-accent">{'//'}</span></span>
            </a>
            <p className="section-copy mt-5 max-w-sm text-sm">{t('footer.description')}</p>
            <p className="data-label mt-6 text-accent/70">{t('footer.systemNote')}</p>
          </div>

          <div>
            <h3 className="data-label mb-4 text-text-light">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-text/65 transition hover:text-accent">{t(`nav.${link.name}`)}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="data-label mb-4 text-text-light">{t('footer.followMe')}</h3>
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" title={link.name} aria-label={link.name} className="social-icon">
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className={`flex flex-col items-center justify-between gap-4 pt-7 text-center text-xs text-text-dark md:flex-row ${isRTL ? 'md:text-right' : 'md:text-left'}`}>
          <p>© {currentYear} {t('footer.copyright')}</p>
          <p className="flex items-center gap-2">
            {t('footer.madeWith')}
            <motion.span animate={{ scale: [1, 1.18, 1] }} transition={{ duration: 1.4, repeat: Infinity }} className="text-accent">
              <FaHeart aria-hidden="true" />
            </motion.span>
            <span className="text-text/65">{t('footer.forTheWeb')}</span>
          </p>
        </div>

        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.96 }}
          aria-label={t('common.scrollTop')}
          title={t('common.scrollTop')}
          className={`absolute -top-5 flex h-10 w-10 items-center justify-center rounded-lg border border-accent/45 bg-void text-accent shadow-neon transition hover:bg-accent/10 ${isRTL ? 'left-6 md:left-10' : 'right-6 md:right-10'}`}
        >
          <FaChevronUp aria-hidden="true" />
        </motion.button>
      </div>
    </footer>
  );
};

export default Footer;
