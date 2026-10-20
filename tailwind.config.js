/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        void: 'rgb(var(--void) / <alpha-value>)',
        dark: 'rgb(var(--dark) / <alpha-value>)',
        navy: 'rgb(var(--navy) / <alpha-value>)',
        panel: 'rgb(var(--panel) / <alpha-value>)',
        'panel-light': 'rgb(var(--panel-light) / <alpha-value>)',
        'gray-dark': 'rgb(var(--gray-dark) / <alpha-value>)',
        accent: {
          light: 'rgb(var(--accent-light) / <alpha-value>)',
          DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
          dark: 'rgb(var(--accent-dark) / <alpha-value>)',
        },
        violet: {
          light: 'rgb(var(--violet-light) / <alpha-value>)',
          DEFAULT: 'rgb(var(--violet) / <alpha-value>)',
          dark: 'rgb(var(--violet-dark) / <alpha-value>)',
        },
        magenta: {
          light: 'rgb(var(--magenta-light) / <alpha-value>)',
          DEFAULT: 'rgb(var(--magenta) / <alpha-value>)',
          dark: 'rgb(var(--magenta-dark) / <alpha-value>)',
        },
        gold: {
          light: 'rgb(var(--gold-light) / <alpha-value>)',
          DEFAULT: 'rgb(var(--gold) / <alpha-value>)',
          dark: 'rgb(var(--gold-dark) / <alpha-value>)',
        },
        text: {
          light: 'rgb(var(--text-light) / <alpha-value>)',
          DEFAULT: 'rgb(var(--text) / <alpha-value>)',
          dark: 'rgb(var(--text-dark) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['var(--font-body)'],
        display: ['var(--font-display)'],
        mono: ['var(--font-mono)'],
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        DEFAULT: 'var(--radius)',
        md: 'var(--radius-sm)',
        lg: 'var(--radius)',
        xl: 'var(--radius-lg)',
        '2xl': 'var(--radius-lg)',
      },
      boxShadow: {
        neon: '0 0 0 1px rgb(var(--accent) / 0.24), 0 0 30px rgb(var(--accent) / 0.12)',
        'neon-violet':
          '0 0 0 1px rgb(var(--violet) / 0.3), 0 0 34px rgb(var(--violet) / 0.16)',
        glow: 'var(--accent-glow)',
      },
      transitionTimingFunction: {
        cinematic: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
