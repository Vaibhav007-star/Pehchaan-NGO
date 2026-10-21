/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pehchaan: {
          primary: '#1E3A8A',    // Deep Royal Navy
          secondary: '#D97706',  // Warm Amber / Marigold
          accent: '#059669',     // Hope Emerald
          dark: '#0F172A',
          light: '#F8FAFC',
          sand: '#FEF3C7',
          rose: '#E11D48',
          blue: '#2563EB'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
        serif: ['Merriweather', 'serif']
      }
    },
  },
  plugins: [],
}

