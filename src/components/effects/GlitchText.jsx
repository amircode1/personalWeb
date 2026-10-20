import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

/**
 * RGB-split glitch text.
 *
 * Renders three stacked copies of the same string. The red and cyan layers are
 * offset and masked so the channel separation reads like a signal tearing
 * apart rather than a drop shadow.
 *
 * The layers only animate while the `cold` skin is active — the studio skin
 * renders a single clean copy.
 */
const GLYPHS = '!<>-_\\/[]{}—=+*^?#01';

const GlitchText = ({ text, as: Tag = 'span', className = '', glitchChars = 0 }) => {
  const [isCold, setIsCold] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setIsCold(root.dataset.design === 'cold');
    sync();

    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ['data-design'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isCold) return undefined;

    const timer = window.setInterval(() => {
      setTick((current) => current + 1);
    }, 90);
    return () => window.clearInterval(timer);
  }, [isCold]);

  // A deterministic scramble so the two channel layers never share a glitch.
  const scramble = (offset) => {
    let result = '';
    for (let i = 0; i < text.length; i += 1) {
      const char = text[i];
      if (char === ' ' || char === '\n') {
        result += char;
      } else {
        const seed = (tick * 7 + i * 13 + offset * 29) % GLYPHS.length;
        result += GLYPHS[seed];
      }
    }
    return result;
  };

  if (!isCold) {
    return <Tag className={className}>{text}</Tag>;
  }

  const shift = 1 + (tick % 3);

  return (
    <Tag className={`glitch-text ${className}`} aria-label={text}>
      <span className="glitch-text__base" aria-hidden="true">
        {text}
      </span>
      <span
        className="glitch-text__layer glitch-text__layer--cyan"
        style={{ transform: `translate(${shift}px, ${-shift}px)` }}
        aria-hidden="true"
      >
        {scramble(1)}
      </span>
      <span
        className="glitch-text__layer glitch-text__layer--red"
        style={{ transform: `translate(${-shift}px, ${shift}px)` }}
        aria-hidden="true"
      >
        {scramble(2)}
      </span>
      {glitchChars > 0 && (
        <span className="glitch-text__after" aria-hidden="true">
          {GLYPHS[tick % GLYPHS.length]}
        </span>
      )}
    </Tag>
  );
};

GlitchText.propTypes = {
  text: PropTypes.string.isRequired,
  as: PropTypes.elementType,
  className: PropTypes.string,
  glitchChars: PropTypes.number,
};

export default GlitchText;
