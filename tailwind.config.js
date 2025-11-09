/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#171717',
        surface: '#1f1f1f',
        primary: '#6366f1',
        text: '#ffffff',
        textSecondary: '#a3a3a3',
        border: '#2e2e2e',
      },
    },
  },
  plugins: [],
}