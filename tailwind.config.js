/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}",
  "./src/views/*ejs"],
  theme: {
    extend: {
      colors: {
        "main": "#1AA6B7",
        "secondary": "#F56A79"
      },
      screens: {
                'max-1535': { 'max': '1535px' },
                // => @media (max-width: 1535px) { ... }

                'max-1279': { 'max': '1279px' },
                // => @media (max-width: 1279px) { ... }

                'max-1023': { 'max': '1023px' },
                // => @media (max-width: 1023px) { ... }

                'max-767': { 'max': '767px' },
                // => @media (max-width: 767px) { ... }

                'max-639': { 'max': '639px' },
                // => @media (max-width: 639px) { ... }
            },
    },
  },
  plugins: [],
}