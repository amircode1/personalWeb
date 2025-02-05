import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaUser, FaCode, FaBriefcase, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa';
import LanguageSwitcher from './LanguageSwitcher';

const navItems = [
  { name: 'home', icon: <FaHome />, href: '#home' },
  { name: 'about', icon: <FaUser />, href: '#about' },
  { name: 'skills', icon: <FaCode />, href: '#skills' },
  { name: 'portfolio', icon: <FaBriefcase />, href: '#portfolio' },
  { name: 'contact', icon: <FaEnvelope />, href: '#contact' }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'fa';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-dark/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="text-text-light font-bold text-xl">
            React Developer
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-text-light hover:text-accent transition-colors flex items-center gap-2"
              >
                <span className="text-accent text-2xl align-text-top">{item.icon}</span>
                <span>{t(`nav.${item.name}`)}</span>
              </a>
            ))}
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-accent p-2 hover:text-accent-light transition-colors"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 inset-x-0 bg-dark/95 backdrop-blur-sm md:hidden"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-text-light hover:text-accent flex items-center gap-2 p-2 rounded-lg transition-colors"
                  >
                    <span className="text-accent">{item.icon}</span>
                    <span>{t(`nav.${item.name}`)}</span>
                  </a>
                ))}
                <div className="pt-4 border-t border-gray-dark">
                  <LanguageSwitcher />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
