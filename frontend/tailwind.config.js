/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primaryColor: 'rgb(33, 150, 243)',
        secondaryColor: 'rgb(174, 175, 177)',
        primaryBgColor: 'rgb(13 36 56/1)',
      },
    },
  },
  plugins: [],
}

