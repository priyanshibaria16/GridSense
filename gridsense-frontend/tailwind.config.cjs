module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00B3FF',
        secondary: '#00E5FF',
        bg: '#07111F',
        'bg-2': '#0B1727',
        card: 'rgba(15, 31, 50, 0.75)'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto']
      }
    }
  },
  plugins: []
}
