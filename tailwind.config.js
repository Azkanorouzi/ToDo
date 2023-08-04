/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/index.html'],
  theme: {
    extend: {
      colors: {
        // Theme one
        'theme-1-main': '#071952',
        'theme-1-second': '#0B666A',
        'theme-1-third': '#35A29F',
        'theme-1-forth': '#97FEED',
        'theme-1-fifth': '#da3182',
        // Theme two
        'theme-2-main': '#EEE2DE',
        'theme-2-second': '#EA906C',
        'theme-2-third': '#B31312',
        'theme-2-forth': '#2B2A4C',
        // Theme three
        'theme-3-main': '#CECE5A',
        'theme-3-second': '#FFE17B',
        'theme-3-third': '#FD8D14',
        'theme-3-forth': '#C51605',
        // Theme forth
        'theme-4-main': '#1D5D9B',
        'theme-4-second': '#75C2F6',
        'theme-4-third': '#F4D160',
        'theme-4-forth': '#FBEEAC',
        // Star Gazing mode
        'theme-5-main': '#1D5D9B',
      },
      fontFamily: {
        main: ['Bebas Neue', 'sans-serif'],
        second: ['Lobster', 'cursive'],
        third: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwindcss-gradients')],
}
