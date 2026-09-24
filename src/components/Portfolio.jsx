import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaFolderOpen, FaGithub } from 'react-icons/fa';
import project1 from '../assets/project1.png';
import project2 from '../assets/project2.png';
import project3 from '../assets/project3.png';
import project4 from '../assets/project4.png';
import project5 from '../assets/project5.png';

const projects = [
  {
    id: 1,
    key: 'gameStore',
    title: 'Game Store',
    description: 'React & TypeScript Application',
    image: project1,
    tags: ['React', 'JavaScript', 'Tailwind CSS', 'React Query', 'Redux'],
    links: { github: 'https://github.com/amircode1/game', live: 'https://gamestoreamir.netlify.app' },
  },
  {
    id: 2,
    key: 'cryptoWay',
    title: 'Crypto Way',
    description: 'React & Redux Dashboard',
    image: project2,
    tags: ['React', 'Redux', 'Tailwind CSS', 'React Query', 'JavaScript'],
    links: { github: 'https://github.com/amircode1/cryptoWay', live: 'https://cryptoway-amir.netlify.app/' },
  },
  {
    id: 3,
    key: 'chatbot',
    title: 'ChatBot AI',
    description: 'React & Next.js',
    image: project3,
    tags: ['ChatBot', 'Tailwind CSS', 'JavaScript', 'React', 'Next.js'],
    links: { github: 'https://github.com/amircode1/chat-ai', live: 'https://chat-ai-amir.netlify.app/' },
  },
  {
    id: 4,
    key: 'car3d',
    title: 'Car 3D Web',
    description: 'Three.js & React 3D Application',
    image: project4,
    tags: ['Three.js', 'React', 'JavaScript', '3D', 'WebGL'],
    links: { github: 'https://github.com/amircode1/car-3d', live: 'https://car-3dweb.netlify.app/' },
  },
  {
    id: 5,
    key: 'wowMarket',
    title: 'Wow Market',
    description: 'Next.js E-commerce Application',
    image: project5,
    tags: ['Next.js', 'React', 'JavaScript', 'E-commerce'],
    links: { live: 'https://wow-market.netlify.app' },
  },
];

const Portfolio = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'fa';

  return (
    <section id="portfolio" className="section-shell relative overflow-hidden border-b border-white/[0.08] bg-dark py-20 sm:py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 cyber-grid opacity-25" />
      <div className="container relative z-10 mx-auto max-w-7xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <div className="section-kicker mb-5">{t('portfolio.subtitle')}</div>
            <h2 className="section-title max-w-2xl">{t('portfolio.title')}</h2>
          </div>
          <p className={`section-copy max-w-md ${isRTL ? 'text-right' : 'text-left'}`}>{t('portfolio.description')}</p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: index * 0.08, duration: 0.55 }}
              className="project-card group overflow-hidden rounded-lg"
            >
              <div className="relative aspect-[16/9] overflow-hidden border-b border-white/[0.08] bg-panel">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-void/25 transition duration-300 group-hover:bg-void/5" />
                <div className={`absolute top-4 flex items-center gap-3 rounded-md border border-white/15 bg-void/80 px-3 py-2 backdrop-blur-md ${isRTL ? 'right-4' : 'left-4'}`}>
                  <FaFolderOpen className="text-accent" aria-hidden="true" />
                  <span className="data-label text-text-light/80">0{project.id} / {t('portfolio.category')}</span>
                </div>
                <div className={`absolute bottom-4 flex gap-2 opacity-100 transition duration-300 md:opacity-0 md:group-hover:opacity-100 ${isRTL ? 'left-4' : 'right-4'}`}>
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={t('portfolio.viewCode')}
                      aria-label={`${t('portfolio.viewCode')} ${project.title}`}
                      className="flex h-10 w-10 items-center justify-center rounded-md border border-white/20 bg-void/85 text-text-light backdrop-blur-md transition hover:border-accent hover:text-accent"
                    >
                      <FaGithub aria-hidden="true" />
                    </a>
                  )}
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={t('portfolio.viewLive')}
                    aria-label={`${t('portfolio.viewLive')} ${project.title}`}
                    className="flex h-10 w-10 items-center justify-center rounded-md border border-accent/50 bg-accent/15 text-accent-light backdrop-blur-md transition hover:bg-accent/25"
                  >
                    <FaExternalLinkAlt aria-hidden="true" />
                  </a>
                </div>
              </div>

              <div className={`p-5 sm:p-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-xl font-bold text-text-light">{project.title}</h3>
                    <p className="mt-2 text-sm text-text/60">{project.description}</p>
                  </div>
                  <span className="font-display text-xs font-bold text-violet-light">0{project.id}</span>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-md border border-white/10 bg-white/[0.035] px-2.5 py-1 text-xs font-medium text-text/65">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
