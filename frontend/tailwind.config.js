/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Cormorant', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        'marble-black': '#0A0A0C',
        'deep-obsidian': '#0D0F12',
        'charcoal-smoke': '#1A1C20',
        'white-vein': '#F4F4F4',
        'gold-foil': '#D4B78F',
        'soft-gold': '#B79054',
        'gold-glow': '#B79054',
        'off-white': '#F4F4F4',
        'soft-grey': '#C0C0C0',
      },
    },
  },
  plugins: [],
}
