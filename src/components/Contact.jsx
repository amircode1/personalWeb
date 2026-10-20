import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  FaArrowRight,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaTelegram,
} from 'react-icons/fa';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'fa';
  const [formData, setFormData] = useState({ from_name: '', from_email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState('');
  const form = useRef(null);

  const contactInfo = [
    {
      icon: <FaEnvelope aria-hidden="true" />,
      title: t('contact.email'),
      value: 'amirmohammadrezaeiwork@gmail.com',
      href: 'mailto:amirmohammadrezaeiwork@gmail.com',
    },
    {
      icon: <FaTelegram aria-hidden="true" />,
      title: t('contact.telegram'),
      value: '@Amirmohammadrezaei1',
      href: 'https://t.me/Amirmohammadrezaei1',
    },
    {
      icon: <FaMapMarkerAlt aria-hidden="true" />,
      title: t('contact.location'),
      value: t('contact.remote'),
    },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSending(true);
    setStatus('');

    try {
      const result = await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );

      if (result.text === 'OK') {
        setFormData({ from_name: '', from_email: '', message: '' });
        setStatus('success');
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
    } finally {
      setIsSending(false);
    }
  };

  const handleChange = (event) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  return (
    <section id="contact" className="section-shell relative overflow-hidden bg-void py-20 sm:py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 cyber-grid opacity-20" />
      <div className="pointer-events-none absolute right-0 top-1/4 h-px w-1/4 bg-magenta/40" />

      <div className="container relative z-10 mx-auto max-w-7xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <div className="section-kicker mb-5">{t('contact.subtitle')}</div>
            <h2 className="section-title max-w-2xl">{t('contact.title')}</h2>
            <div className="hud-tag mt-4">
              <span className="hud-tag__index">04</span>
              <span>{t('contact.hudTag')}</span>
            </div>
          </div>
          <p className={`section-copy max-w-md ${isRTL ? 'text-right' : 'text-left'}`}>{t('contact.description')}</p>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr] lg:gap-8">
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className={`contact-card rounded-lg p-5 sm:p-7 ${isRTL ? 'text-right' : 'text-left'}`}
          >
            <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
              <div>
                <p className="data-label text-accent">{t('contact.signalLabel')}</p>
                <h3 className="mt-2 font-display text-xl font-bold text-text-light">{t('contact.availability')}</h3>
              </div>
              <span className="h-3 w-3 rounded-full bg-accent shadow-[0_0_18px_rgba(34,211,238,0.9)]" aria-hidden="true" />
            </div>
            <p className="mt-6 text-sm leading-8 text-text/70">{t('contact.availabilityDescription')}</p>

            <div className="mt-7 space-y-3">
              {contactInfo.map((info) => {
                const content = (
                  <>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-accent/20 bg-accent/[0.07] text-lg text-accent">
                      {info.icon}
                    </span>
                    <span className="min-w-0">
                      <span className={`block font-bold text-text-light/80 ${isRTL ? 'text-sm tracking-normal' : 'text-xs uppercase tracking-[0.12em]'}`}>{info.title}</span>
                      <span className="mt-1 block break-words text-sm text-text/60">{info.value}</span>
                    </span>
                  </>
                );

                return info.href ? (
                  <a key={info.title} href={info.href} target={info.href.startsWith('http') ? '_blank' : undefined} rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined} className="flex items-center gap-3 rounded-md border border-white/[0.07] bg-white/[0.02] p-3 transition hover:border-accent/35 hover:bg-accent/[0.05]">
                    {content}
                  </a>
                ) : (
                  <div key={info.title} className="flex items-center gap-3 rounded-md border border-white/[0.07] bg-white/[0.02] p-3">
                    {content}
                  </div>
                );
              })}
            </div>

            <a href="mailto:amirmohammadrezaeiwork@gmail.com" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-accent transition hover:text-accent-light">
              <span>{t('contact.directEmail')}</span>
              <FaArrowRight aria-hidden="true" className={isRTL ? 'rotate-180' : ''} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-panel rounded-lg p-5 sm:p-7"
          >
            <form ref={form} onSubmit={handleSubmit} className={`space-y-5 ${isRTL ? 'text-right' : 'text-left'}`}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="from_name" className="mb-2 block text-sm font-semibold text-text-light">{t('contact.form.name')}</label>
                  <input
                    id="from_name"
                    type="text"
                    name="from_name"
                    value={formData.from_name}
                    onChange={handleChange}
                    placeholder={t('contact.form.namePlaceholder')}
                    required
                    className="input-cyber w-full rounded-md px-4 py-3 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="from_email" className="mb-2 block text-sm font-semibold text-text-light">{t('contact.form.email')}</label>
                  <input
                    id="from_email"
                    type="email"
                    name="from_email"
                    value={formData.from_email}
                    onChange={handleChange}
                    placeholder={t('contact.form.emailPlaceholder')}
                    required
                    className="input-cyber w-full rounded-md px-4 py-3 text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-semibold text-text-light">{t('contact.form.message')}</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t('contact.form.messagePlaceholder')}
                  required
                  rows="6"
                  className="input-cyber w-full resize-y rounded-md px-4 py-3 text-sm leading-7"
                />
              </div>

              <div className="flex flex-col gap-4 border-t border-white/[0.08] pt-5 sm:flex-row sm:items-center sm:justify-between">
                <button type="submit" disabled={isSending} className="neon-button w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
                  <FaPaperPlane aria-hidden="true" />
                  <span>{isSending ? t('contact.form.sending') : t('contact.form.submit')}</span>
                </button>
                {status && (
                  <p role="status" className={`text-sm ${status === 'success' ? 'text-accent-light' : 'text-magenta-light'}`}>
                    {t(`contact.form.${status}Message`)}
                  </p>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
