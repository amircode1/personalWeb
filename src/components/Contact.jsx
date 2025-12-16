import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'fa';
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSending, setIsSending] = useState(false);

  const form = useRef();

  const contactInfo = [
    {
      icon: <FaEnvelope className="text-2xl" />,
      title: 'email',
      value: 'amirmohammadrezaeiwork@gmail.com',
      href: 'mailto:example@email.com'
    },
    {
      icon: <FaPhone className="text-2xl" />,
      title: 'phone',
      value: '+1 234 567 890',
      href: 'tel:@Amirmohammadrezaei1'
    },
    {
      icon: <FaMapMarkerAlt className="text-2xl" />,
      title: 'location',
      value: 'remote',
      href: '#'
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const result = await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      if (result.text === 'OK') {
        setFormData({ name: '', email: '', message: '' });
        alert(t('contact.form.successMessage'));
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      alert(t('contact.form.errorMessage'));
    } finally {
      setIsSending(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-dark relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -right-64 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-64 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl" />
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
                {t('contact.subtitle')}
              </span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-text-light mb-6"
            >
              {t('contact.title')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-text-light max-w-2xl mx-auto leading-relaxed"
            >
              {t('contact.description')}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4 md:space-y-8"
            >
              <div className="space-y-3 md:space-y-6">
                {contactInfo.map((info) => (
                  <motion.a
                    key={info.title}
                    href={info.href}
                    whileHover={{ scale: 1.02 }}
                    className="flex w-full items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-accent/5 backdrop-blur-sm hover:bg-accent/10 transition-colors"
                  >
                    <div className="w-10 md:w-12 h-10 md:h-12 bg-accent/10 rounded-lg flex items-center justify-center text-accent flex-shrink-0">
                      <span className="text-lg md:text-2xl">{info.icon.props.children}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-text-light font-medium text-sm md:text-base">
                        {t(`contact.${info.title}`)}
                      </h3>
                      <p className="text-text-light/80 text-xs md:text-sm break-words">{info.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <form ref={form} onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <label htmlFor="from_name" className="block text-text-light mb-2 text-sm md:text-base">
                    {t('contact.form.name')}
                  </label>
                  <input
                    type="text"
                    name="from_name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 md:px-4 py-2 md:py-3 bg-accent/5 rounded-lg text-text-light placeholder-text-light/50 text-sm md:text-base"
                  />
                </div>

                <div>
                  <label htmlFor="to_email" className="block text-text-light mb-2 text-sm md:text-base">
                    {t('contact.form.email')}
                  </label>
                  <input
                    type="email"
                    name="from_email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 md:px-4 py-2 md:py-3 bg-accent/5 rounded-lg text-text-light placeholder-text-light/50 text-sm md:text-base"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-text-light mb-2 text-sm md:text-base">
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-3 md:px-4 py-2 md:py-3 bg-accent/5 rounded-lg text-text-light placeholder-text-light/50 text-sm md:text-base"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full px-6 md:px-8 py-3 md:py-4 bg-accent text-text-light rounded-lg text-sm md:text-base font-medium"
                >
                  {isSending ? t('contact.form.sending') : t('contact.form.submit')}
                </button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
