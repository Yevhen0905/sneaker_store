/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    screens: {
      desktop: { max: '1280px' },
      laptop: { max: '1124px' },
      tablet: { max: '860px' },
      mobile: { max: '580px' }
    }
  },

  plugins: []
}
