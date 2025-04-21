import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaFolderOpen } from 'react-icons/fa';
import project1 from '../assets/project1.png';
import project2 from '../assets/project2.png';
import project3 from '../assets/project3.png';
import project4 from '../assets/project4.png';

const projects = [
  {
    id: 1,
    title: 'Game Store',
    description: 'React & TypeScript Application',
    image: project1,
    tags: ['React', 'Javascript', 'Tailwind CSS', 'React Query', 'Redux', 'React-router-dom'],
    category: 'Frontend',
    links: {
      github: 'https://github.com/amircode1/game',
      live: 'https://gamestoreamir.netlify.app'
    }
  },
  {
    id: 2,
    title: 'Crypto Way',
    description: 'React & Redux Dashboard',
    image: project2,
    tags: ['React', 'Redux', 'Tailwind CSS', 'React Query', 'Javascript', 'React-router-dom'],
    category: 'Frontend',
    links: {
      github: 'https://github.com/amircode1/cryptoWay',
      live: 'https://cryptoway-amir.netlify.app/'
    }
  },
  {
    id: 3,
    title: 'ChatBot AI',
    description: 'React & Next.js',
    image: project3,
    tags: ['ChatBot', 'Tailwind CSS', 'javascript', 'React', 'Next.js'],
    category: 'Frontend',
    links: {
      github: 'https://github.com/amircode1/chat-ai',
      live: 'https://chat-ai-amir.netlify.app/'
    }
  },
  {
    id: 4,
    title: 'Car 3D Web',
    description: 'Three.js & React 3D Application',
    image: project4,
    tags: ['Three.js', 'React', 'Javascript', '3D', 'WebGL'],
    category: 'Frontend',
    links: {
      github: 'https://github.com/amircode1/car-3d',
      live: 'https://car-3dweb.netlify.app/'
    }
  }
];

const Portfolio = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'fa';

  return (
    <section id="portfolio" className="py-20 bg-dark relative overflow-hidden">
      {/* Background Decorations */}
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
                {t('portfolio.subtitle')}
              </span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-text-light mb-6"
            >
              {t('portfolio.title')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-text-light max-w-2xl mx-auto leading-relaxed"
            >
              {t('portfolio.description')}
            </motion.p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-accent/5 backdrop-blur-sm rounded-2xl overflow-hidden"
              >
                {/* Project Image */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-dark/60 transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100 opacity-100">
                    <div className="absolute inset-0 flex items-center justify-center gap-4">
                      <motion.a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-3 bg-accent/20 hover:bg-accent/40 rounded-full text-text-light transition-colors touch-manipulation"
                      >
                        <FaGithub className="text-xl" />
                      </motion.a>
                      <motion.a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-3 bg-accent/20 hover:bg-accent/40 rounded-full text-text-light transition-colors touch-manipulation"
                      >
                        <FaExternalLinkAlt className="text-xl" />
                      </motion.a>
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <FaFolderOpen className="text-2xl text-accent" />
                    <span className="text-sm text-accent bg-accent/10 px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-text-light mb-2">
                    {project.title}
                  </h3>
                  <p className="text-text-light/80 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-sm text-text-light bg-accent/5 px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio; 
