import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FaBars,
  FaBriefcase,
  FaCode,
  FaEnvelope,
  FaHome,
  FaTimes,
  FaUser,
} from 'react-icons/fa';
import LanguageSwitcher from './LanguageSwitcher';

const navItems = [
  { name: 'home', icon: <FaHome aria-hidden="true" />, href: '#home' },
  { name: 'about', icon: <FaUser aria-hidden="true" />, href: '#about' },
  { name: 'skills', icon: <FaCode aria-hidden="true" />, href: '#skills' },
  { name: 'portfolio', icon: <FaBriefcase aria-hidden="true" />, href: '#portfolio' },
  { name: 'contact', icon: <FaEnvelope aria-hidden="true" />, href: '#contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'fa';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav
      aria-label={t('nav.ariaLabel')}
      className={`fixed inset-x-0 top-0 z-50 px-4 pt-4 transition-all duration-300 md:px-8 ${
        scrolled ? 'pt-3' : 'pt-4'
      }`}
    >
      <div className="nav-shell mx-auto max-w-7xl rounded-lg">
        <div className="flex min-h-[4.5rem] items-center justify-between gap-4 px-4 md:px-6">
          <a href="#home" className="flex min-w-0 items-center gap-3" onClick={closeMenu}>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-accent/50 bg-accent/10 font-display text-xs font-bold text-accent shadow-neon">
              AR
            </span>
            <span className="min-w-0">
              <span className="block truncate font-display text-sm font-bold tracking-[0.12em] text-text-light">
                AMIR <span className="text-accent">{'//'} 01</span>
              </span>
              <span className="data-label mt-1 block truncate">{t('nav.brandRole')}</span>
            </span>
          </a>

          <div className="hidden items-center gap-6 lg:flex">
            <div className="flex items-center gap-5">
              {navItems.map((item) => (
                <a key={item.name} href={item.href} className="nav-link">
                  <span className="text-accent/80">{item.icon}</span>
                  <span>{t(`nav.${item.name}`)}</span>
                </a>
              ))}
            </div>
            <LanguageSwitcher />
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((current) => !current)}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label={isOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            title={isOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-accent transition hover:border-accent/50 hover:bg-accent/10 lg:hidden"
          >
            {isOpen ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
          </button>
        </div>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              id="mobile-navigation"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-white/[0.08] lg:hidden"
            >
              <div className={`space-y-2 px-4 py-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={closeMenu}
                    className="flex items-center gap-3 rounded-lg border border-transparent px-3 py-3 text-sm font-semibold text-text/80 transition hover:border-accent/20 hover:bg-accent/[0.06] hover:text-text-light"
                  >
                    <span className="text-accent">{item.icon}</span>
                    <span>{t(`nav.${item.name}`)}</span>
                  </a>
                ))}
                <div className="border-t border-white/[0.08] pt-4">
                  <LanguageSwitcher />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
