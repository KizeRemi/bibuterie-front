const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    fontFamily: {
      mono: 'Nunito Sans'
    },
    boxShadow: {
      default: '0 1px 3px 0 rgba(0, 0, 0, .1), 0 1px 2px 0 rgba(0, 0, 0, .06)',
      md: '0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -2px rgba(0, 0, 0, .05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, .1), 0 10px 10px -5px rgba(0, 0, 0, .04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, .25)',
      '3xl': '0 35px 60px -15px rgba(0, 0, 0, .3)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      outline: '0 0 0 3px #d6bcfa',
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