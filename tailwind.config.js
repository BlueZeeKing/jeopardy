module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blue: {
          DEFAULT: '#0000ff',
          light: '#1e1eff',
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
