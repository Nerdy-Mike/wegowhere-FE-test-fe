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
        xs: "10px",
        sm: "15px",
        md: "16px",
        title: "17px",
        lg: "18px",
      },
    },
  },
  plugins: [],
};
