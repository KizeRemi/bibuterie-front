const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    fontFamily: {
      mono: 'Nunito Sans'
    },
    extend: {
      colors: {
        pink: {
          ...colors.pink,
          '900': '#C2908d',
        },
        indigo: {
          ...colors.indigo,
          '900': '#9172f7',
        },
        blue: {
          ...colors.blue,
          '800': '#4568DC',
          '900': '#24214C',
        }
      }
    }
  },
  variants: {
    display: ['responsive', 'hover', 'focus'],
  }
}