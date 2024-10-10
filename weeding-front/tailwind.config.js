/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        body: "#f0f4f5", // Main page background color
        separator: "#dfdfdf",
        footer: "#1d3752",
        asideText: "#fff", // white text
        cardTitle: "#0057b0", // Light blue
        aside: "#0a4a78", // darkest blue
        lighterPrimary: "#08557f", // blue used for background color in hover state
        primary: "#34d6fd", // intermediary blue
        secondary: "#1d3752", // lighter blue for active status
        tertiary: "#34d5ff", // light blue (border)
        lighter: "#00b4c5", // light blue (border)
        oranger: "#ff792b",
        links: "#4c5177",
        red: "#f22613",
        green: "#1ab704",

        error: "var(--color-error, #9F1D1D)",
        "error-bg": "var(--color-error-bg, #FF8585)",
        success: "var(--color-success, #126435)",
        "success-bg": "var(--color-success-bg, #7EEDB0)",
        "alert-info": "#16BAC5",
        "alert-error": "#D7263D"
      },
    },
  },
  plugins: [],
};
