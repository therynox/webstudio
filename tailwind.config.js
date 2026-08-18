/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        therynox: {
          bg: "#F5F3EE",
          white: "#FFFFFF",

          black: "#111111",
          text: "#171717",
          dark: "#242321",

          muted: "#6F6D67",
          lightMuted: "#8D8A82",

          surface: "#EDEBE5",
          surfaceWhite: "#FAFAF8",

          orange: "#FF5A1F",
          orangeLight: "#FF7A45",

          border: "#DCD9D1",
          borderLight: "#E7E4DC",
        },
      },

      fontFamily: {
        sans: [
          "Inter",
          "sans-serif",
        ],

        display: [
          "Inter",
          "sans-serif",
        ],
      },

      maxWidth: {
        "8xl": "1440px",
        "9xl": "1600px",
      },

      letterSpacing: {
        tightest: "-0.07em",
      },
    },
  },

  plugins: [],
};