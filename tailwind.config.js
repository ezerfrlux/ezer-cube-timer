/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-none": {
          /* Firefox */
          "scrollbar-width": "none",
          /* Chrome, Edge, Safari */
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      });
    },
  ],
};
