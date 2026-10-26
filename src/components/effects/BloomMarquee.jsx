import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Editorial marquee ribbon.
 *
 * A fashion-band strip with serif italic gradient text and gold gems that
 * drifts endlessly across the page. It only renders under the `maximal`
 * skin — the other skins keep their own furniture instead.
 */
const COPIES = 8;

const BloomMarquee = () => {
  const { t } = useTranslation();
  const [isMaximal, setIsMaximal] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setIsMaximal(root.dataset.design === 'maximal');
    sync();

    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ['data-design'] });
    return () => observer.disconnect();
  }, []);

  if (!isMaximal) return null;

  const phrase = t('hero.marquee');

  return (
    <div className="bloom-marquee -mx-6 md:-mx-10" aria-hidden="true">
      <div className="bloom-marquee__track">
        {Array.from({ length: COPIES }).map((_, index) => (
          <span key={index} className="bloom-marquee__phrase">
            {phrase}
            <i className="bloom-marquee__gem" />
          </span>
        ))}
      </div>
    </div>
  );
};

export default BloomMarquee;
