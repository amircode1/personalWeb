import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaDownload } from 'react-icons/fa';
import { useState } from 'react';
import profile from '../assets/profile.jpg';
import music from '../assets/Doors_Light_Funk_slowed_-_Dj_Vttt77_Dj_Vyz.mp3';
import MusicVisualizer from './MusicVisualizer';

const About = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'fa';
  const [amplitude, setAmplitude] = useState(0);
  
  const getResumeFile = () => {
    return i18n.language === 'fa' ? '/امیرمحمدرضایی.pdf' : '/amirmohammadrezaei.pdf';
  };

  const stats = [
    { label: 'experience', value: '2+' },
    { label: 'projects', value: '5+' },
  ];

  return (
    <section id="about" className="py-20 bg-dark relative overflow-hidden">
      {/* Full-section music visualizer background */}
      <MusicVisualizer src={music} onAmplitudeChange={setAmplitude} fillParent accentColor="#06B6D4" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          {/* Section Title */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block bg-accent/10 px-6 py-2 rounded-full mb-4"
            >
              <span className="text-accent font-medium">
                {t('about.subtitle')}
              </span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-text-light"
              animate={{ scale: 1 + amplitude / 70 }}
              transition={{ type: 'spring', damping: 10, stiffness: 100 }}
            >
              {t('about.title')}
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              animate={{ 
                rotate: Math.sin(amplitude / 50) * 3,
                scale: 1 + (amplitude / 200)
              }}
              transition={{ 
                duration: 0.5, 
                delay: 0.2,
                type: 'spring', 
                damping: 15, 
                stiffness: 100 
              }}
              className="relative group"
            >
              <div className="relative z-10 rounded-2xl overflow-hidden">
                <img
                  src={profile}
                  alt="Profile"
                  className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className={`space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}
            >
              <p className="text-text-light text-lg leading-relaxed">
                {t('about.description')}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="text-center p-4 rounded-xl"
                  >
                    <div className="text-3xl font-bold text-accent mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-text-light">
                      {t(`about.stats.${stat.label}`)}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="my-8" />

              {/* Add Download Resume Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="mt-8"
              >
                <a
                  href={getResumeFile()}
                  download
                  className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-light text-text-light rounded-lg font-medium transition-colors"
                >
                  <FaDownload />
                  {t('about.downloadCV')}
                </a>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
