// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        clash: ["'Clash Display'", "sans-serif"],
      },
      colors: {
        background: "#0D0D0D",
        foreground: "#ffffff",
        accent: "#ffdd00",
      },
    },
  },
  plugins: [],
};
