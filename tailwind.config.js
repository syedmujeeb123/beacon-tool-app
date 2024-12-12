/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lightYellow: "#fcdf03",
        "dark-green-forest": "#228B22",
      },
      animation: {
        "slow-spin": "slow-rotate 20s linear infinite", // Slow rotation
        marquee: "marquee 12s linear infinite", // Marquee animation
      },
      keyframes: {
        "slow-rotate": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        marquee: {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(100%)" },
        },
      },
    },
  },
  plugins: [],
};
