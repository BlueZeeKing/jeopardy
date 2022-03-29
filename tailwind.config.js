module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          DEFAULT: "#0000ff",
          light: "#1e1eff",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
