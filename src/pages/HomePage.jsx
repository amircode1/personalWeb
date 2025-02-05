import { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';

// Components
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Portfolio from '../components/Portfolio';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const HomePage = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Scroll to top functionality
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Show/hide scroll-to-top button based on scroll position
  useEffect(() => {
    const toggleScrollButton = () => {
      const scrollButton = document.getElementById('scroll-to-top');
      if (scrollButton) {
        if (window.scrollY > 500) {
          scrollButton.classList.remove('opacity-0', 'invisible');
          scrollButton.classList.add('opacity-100', 'visible');
        } else {
          scrollButton.classList.add('opacity-0', 'invisible');
          scrollButton.classList.remove('opacity-100', 'visible');
        }
      }
    };

    window.addEventListener('scroll', toggleScrollButton);
    return () => window.removeEventListener('scroll', toggleScrollButton);
  }, []);

  return (
    <div className="bg-navy min-h-screen">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-50"
        style={{ scaleX }}
      />

      {/* Main Content */}
      <main>
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Portfolio />
        <Contact />
        <Footer />
      </main>

      {/* Scroll to Top Button */}
      <button
        id="scroll-to-top"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="fixed bottom-8 right-8 p-4 bg-accent text-white rounded-full shadow-lg opacity-0 invisible transition-all duration-300 hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
      >
        <FaArrowUp className="text-xl" />
      </button>

      {/* Background Decorations */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Top-left gradient */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-accent/20 rounded-full filter blur-[120px] opacity-20" />
        
        {/* Bottom-right gradient */}
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/20 rounded-full filter blur-[120px] opacity-20" />
      </div>
    </div>
  );
};

export default HomePage; 