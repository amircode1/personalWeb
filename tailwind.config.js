/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark': '#0A0A0A',  // بکگراند اصلی تیره‌تر
        'accent': {
          light: '#FF6B6B', // قرمز روشن
          DEFAULT: '#FF4444', // قرمز اصلی
          dark: '#CC3333',  // قرمز تیره
        },
        'text': {
          light: '#E6E6E6',  // متن روشن
          DEFAULT: '#CCCCCC', // متن معمولی
          dark: '#999999',   // متن تیره‌تر
        }
      },
    },
  },
  plugins: [],
}

