/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          default: "#4AD8DA",
        },
        success: {
          default: "#20D231",
        },
        alert: {
          default: "#FFC120",
        },
      },
      fontSize: {
        xs: "0.625rem", // 10px
        sm: "0.9375rem", // 15px
        md: "1rem", // 16px
        title: "1.0625rem", // 17px
        lg: "1.125rem", // 18px
      },
    },
  },
  plugins: [],
};
