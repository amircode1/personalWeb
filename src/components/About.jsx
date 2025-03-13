import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaDownload } from 'react-icons/fa';
import profile from '../assets/profile.jpg';

const About = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'fa';

  // Get resume file based on language
  const getResumeFile = () => {
    return i18n.language === 'fa' ? '/امیرمحمد رضایی.pdf' : '/amirmohammadrezaei.pdf';
  };

  const stats = [
    { label: 'experience', value: '2+' },
    { label: 'projects', value: '5+' },
  ];

  return (
    <section id="about" className="py-20 bg-dark relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-1/2 -translate-y-1/2 -right-64 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl" />
      
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
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative group"
            >
              <div className="relative z-10 rounded-2xl overflow-hidden">
                <img
                  src={profile}
                  alt="Profile"
                  className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-accent/20 mix-blend-overlay" />
              </div>
              {/* Decorative Elements */}
              <div className="absolute -inset-4 bg-accent/20 rounded-2xl blur-lg -z-10 transition-opacity duration-500 opacity-0 group-hover:opacity-100" />
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
                    className="text-center p-4 rounded-xl bg-accent/5 backdrop-blur-sm"
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

              {/* Add Download Resume Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
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
