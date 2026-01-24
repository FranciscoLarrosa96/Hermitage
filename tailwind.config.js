/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',

        primary: 'var(--color-primary)',
        accent: 'var(--color-accent)',

        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
        },

        border: 'var(--color-border)',
        hover: 'var(--color-hover)',
      },
      fontFamily: {
        sans: ['Rajdhani', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.08)',
        softDark: '0 10px 30px rgba(0,0,0,0.35)',
      },
    },
  },
  plugins: [],
}
