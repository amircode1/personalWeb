import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaTelegram, 
  FaHeart,
  FaChevronUp 
} from 'react-icons/fa';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'fa';
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaGithub />, href: 'https://github.com/amircode1' },
    { icon: <FaLinkedin />, href: 'https://linkedin.com/in/yourusername' },
    { icon: <FaTelegram />, href: 'https://t.me/Amirmohammadrezaei1' }
  ];

  const footerLinks = [
    { name: 'home', href: '#home' },
    { name: 'about', href: '#about' },
    { name: 'skills', href: '#skills' },
    { name: 'portfolio', href: '#portfolio' },
    { name: 'contact', href: '#contact' }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-dark/80 backdrop-blur-sm relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
        <div className="absolute -bottom-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 pt-16 pb-8">
        {/* Scroll to Top */}
        <motion.button
          onClick={scrollToTop}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-accent text-text-light rounded-full flex items-center justify-center shadow-lg hover:bg-accent-light transition-colors"
        >
          <FaChevronUp />
        </motion.button>

        <div className="max-w-6xl mx-auto">
          {/* Top Section */}
          <div className="grid md:grid-cols-3 gap-12 pb-12 border-b border-accent/10">
            {/* Brand */}
            <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
              <motion.h3 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent-light"
              >
                React Developer
              </motion.h3>
              <p className="text-text-light/80 leading-relaxed">
                {t('footer.description')}
              </p>
            </div>

            {/* Quick Links */}
            <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
              <h3 className="text-text-light font-bold mb-4">
                {t('footer.quickLinks')}
              </h3>
              <ul className="space-y-2">
                {footerLinks.map((link) => (
                  <motion.li 
                    key={link.name}
                    whileHover={{ x: isRTL ? -8 : 8 }}
                  >
                    <a
                      href={link.href}
                      className="text-text-light/80 hover:text-accent transition-colors inline-block"
                    >
                      {t(`nav.${link.name}`)}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
              <h3 className="text-text-light font-bold mb-4">
                {t('footer.followMe')}
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-accent/5 rounded-lg flex items-center justify-center text-text-light hover:text-accent hover:bg-accent/10 transition-all"
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-text-light/70 text-center md:text-left"
            >
              © {currentYear} {t('footer.copyright')}
            </motion.p>

            {/* Made with Love */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-text-light/70 flex items-center gap-2"
            >
              {t('footer.madeWith')} 
              <motion.span
                animate={{ 
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
              >
                <FaHeart className="text-accent" />
              </motion.span>
            </motion.p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
