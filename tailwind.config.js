/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,html}"],
  theme: {
    extend: {
      colors: {
        "primary-text": "var(--primary-text)",
        "secondary-text": "var(--secondary-text)",
        "accent-text": "var(--accent-text)",
        "primary-bg": "var(--primary-bg)",
        "secondary-bg": "var(--secondary-bg)",
        "accent-bg": "var(--accent-bg)",
      },
    },
  },
  plugins: [],
};
