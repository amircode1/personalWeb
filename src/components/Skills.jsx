import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  FaReact, 
  FaGit, 
  FaNpm,
} from 'react-icons/fa';
import { 
  SiRedux, 
  SiTypescript, 
  SiTailwindcss, 
  SiVite, 
  SiJavascript,
  SiReactquery,
  SiReact,
  SiGithub
} from 'react-icons/si';

const Skills = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'fa';

  const skills = [
    { 
      name: 'React', 
      icon: <SiReact />,
      color: 'text-accent hover:text-accent-light'
    },
    { 
      name: 'Redux', 
      icon: <SiRedux />,
      color: 'text-accent hover:text-accent-light'
    },
    { 
      name: 'React Query', 
      icon: <SiReactquery />,
      color: 'text-accent hover:text-accent-light'
    },
    { 
      name: 'github', 
      icon: <SiGithub />,
      color: 'text-accent hover:text-accent-light'
    },
    { 
      name: 'JavaScript', 
      icon: <SiJavascript />,
      color: 'text-accent hover:text-accent-light'
    },
    { 
      name: 'Tailwind CSS', 
      icon: <SiTailwindcss />,
      color: 'text-accent hover:text-accent-light'
    }
  ];

  return (
    <section id="skills" className="py-20 bg-dark relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-64 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-64 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl" />
      </div>

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
                {t('skills.subtitle')}
              </span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-text-light mb-6"
            >
              {t('skills.title')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-text-light max-w-2xl mx-auto leading-relaxed"
            >
              {t('skills.description')}
            </motion.p>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group relative bg-accent/5 backdrop-blur-sm p-8 rounded-2xl hover:bg-accent/10 transition-all duration-300"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className={`text-5xl ${skill.color} transition-colors duration-300`}>
                    {skill.icon}
                  </div>
                  <h3 className="text-text-light font-medium text-lg text-center">
                    {skill.name}
                  </h3>
                </div>
                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="text-center mt-16"
          >
            <p className="text-text-light leading-relaxed">
              {t('skills.additionalInfo')}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
