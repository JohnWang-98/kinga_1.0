/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      padding: {
        "frame-padding": 14,
      },
      margin: {
        "frame-margin": 14,
      },
      colors: {
        primary: {
          DEFAULT: "#3DA1B1",
          bright: "#50D6E2",
        },
        muted: { DEFAULT: "#64748B", foreground: "#C9C9D5" },
        background: "#162F42",
      },
      fontFamily: {
        900: ["Poppins-Black"],
        800: ["Poppins-ExtraBold"],
        700: ["Poppins-Bold"],
        600: ["Poppins-SemiBold"],
        500: ["Poppins-Medium"],
        400: ["Poppins-Regular"],
        300: ["Poppins-Light"],
        200: ["Poppins-ExtraLight"],
        100: ["Poppins-Thin"],
      },
    },
  },
  plugins: [],
};
