module.exports = {
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {

    },
    cursor: {
      pointer: 'pointer',
      grab: 'grab'
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "3rem",
        xl: "4rem",
      },
    },
  },
  variants: {
    extend: {
      ringWidth: ['hover'],
    }
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    })
  ],
}
