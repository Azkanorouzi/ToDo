/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/index.html'],
  theme: {
    colors: {
      // Theme one
      'theme-1-main': '#071952',
      'theme-1-second': '#0B666A',
      'theme-1-third': '#35A29F',
      'theme-1-forth': '#97FEED',
      // Theme two
      'theme-2-main': '#EEE2DE',
      'theme-2-second': '#EA906C',
      'theme-2-third': '#B31312',
      'theme-2-forth': '#2B2A4C',
      // Theme three
      'theme-3-main': '#F4E0B9',
      'theme-3-second': '#A8A196',
      'theme-3-third': '#7D7463',
      'theme-3-forth': '#FE0000',
      // Theme forth
      'theme-4-main': '#1D5D9B',
      'theme-4-second': '#75C2F6',
      'theme-4-third': '#F4D160',
      'theme-4-forth': '#FBEEAC',
    },
    extend: {},
  },
  plugins: [require('tailwindcss-gradients')],
}
