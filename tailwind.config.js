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
        'theme-2-main': '#0E21A0',
        'theme-2-second': '#4D2DB7',
        'theme-2-third': '#9D44C0',
        'theme-2-forth': '#EC53B0',
        'theme-2-fifth': '#D2DE32',
        // Theme three
        'theme-3-main': '#040D12',
        'theme-3-second': '#A8DF8E',
        'theme-3-third': '#93B1A6',
        'theme-3-forth': '#5C8374',
        'theme-3-fifth': '#F94C10',
        // Theme forth
        'theme-4-main': '#FAF0E4',
        'theme-4-second': '#9BCDD2',
        'theme-4-third': '#FFFFFF',
        'theme-4-forth': '#22A699',
        'theme-4-fifth': '#FF8551',
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
