import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Boot log.
 *
 * A fake terminal handshake that types itself out line by line. It only
 * renders under the cold skin — the studio skin keeps the clean editorial
 * layout with no terminal furniture at all.
 */
const BOOT_LINES = [
  { key: 'mount', tone: 'ok' },
  { key: 'identity', tone: 'ok' },
  { key: 'uplink', tone: 'ok' },
  { key: 'decrypt', tone: 'warn' },
  { key: 'ready', tone: 'err' },
];

const BootLog = () => {
  const { t } = useTranslation();
  const [isCold, setIsCold] = useState(false);
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => {
      const cold = root.dataset.design === 'cold';
      setIsCold(cold);
      if (!cold) setVisible(0);
    };
    sync();

    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ['data-design'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isCold) return undefined;

    setVisible(0);
    const timers = BOOT_LINES.map((_, index) =>
      window.setTimeout(() => setVisible(index + 1), 220 + index * 190),
    );
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [isCold]);

  if (!isCold) return null;

  return (
    <div className="boot-log mt-7" role="status" aria-label={t('hero.bootLabel')}>
      {BOOT_LINES.slice(0, visible).map((line) => (
        <span key={line.key} className={`boot-log__line boot-log__line--${line.tone}`}>
          {t(`hero.boot.${line.key}`)}
        </span>
      ))}
      {visible < BOOT_LINES.length && (
        <span className="boot-log__line">
          <span className="boot-log__caret" aria-hidden="true" />
        </span>
      )}
    </div>
  );
};

export default BootLog;
