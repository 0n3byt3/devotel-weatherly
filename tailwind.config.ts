const { fontFamily, colors } = require('tailwindcss/defaultTheme');
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/client/comp/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-nunito)', ...fontFamily.sans],
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        lighter: '#ffffff63',
        darker: '#5252521f',
        info: {
          DEFAULT: '#4C9AFF',
        },
        success: {
          DEFAULT: '#00875A',
        },
        warn: {
          DEFAULT: '#bf756b',
        },
        error: {
          DEFAULT: '#DE350B',
        },
        dark: {
          '1': '#0b131e',
        },
        gray: {
          '1': '#ececef',
          ...colors.gray
        }
      },
    },
  },
  plugins: [],
}
export default config
