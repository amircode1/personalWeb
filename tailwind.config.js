/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        void: '#05060b',
        dark: '#080a12',
        navy: '#0b1020',
        panel: '#101426',
        'panel-light': '#151b32',
        'gray-dark': '#252b42',
        accent: {
          light: '#67e8f9',
          DEFAULT: '#22d3ee',
          dark: '#0891b2',
        },
        violet: {
          light: '#c4b5fd',
          DEFAULT: '#8b5cf6',
          dark: '#6d28d9',
        },
        magenta: {
          light: '#f0abfc',
          DEFAULT: '#d946ef',
          dark: '#a21caf',
        },
        gold: {
          light: '#fde68a',
          DEFAULT: '#f59e0b',
          dark: '#b45309',
        },
        text: {
          light: '#f4f7ff',
          DEFAULT: '#c7d2e8',
          dark: '#7c8aa5',
        },
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'Vazirmatn', 'sans-serif'],
        display: ['Orbitron', 'Vazirmatn', 'sans-serif'],
      },
      boxShadow: {
        neon: '0 0 0 1px rgba(34, 211, 238, 0.24), 0 0 30px rgba(34, 211, 238, 0.12)',
        'neon-violet': '0 0 0 1px rgba(139, 92, 246, 0.3), 0 0 34px rgba(139, 92, 246, 0.16)',
      },
    },
  },
  plugins: [],
};
