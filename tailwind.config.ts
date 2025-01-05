import type { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './UIkit/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // container: {
    //   center: true,
    //   padding: {
    //     DEFAULT: "1rem",
    //     lg: "0 72px",
    //   },
    //   screens: {
    //     lg: {
    //       min: "100%",
    //     },
    //   },
    // },

    extend: {
      animation: {
        spin: 'spin 1.5s linear infinite',
        fadeInCustom: 'fadeInCustom .3s linear forwards',
      },
      keyframes: {
        // fadeIn: {
        //   '0%': { transform: 'scale(0)', opacity: '0' },
        //   '100%': { transform: 'scale(0.5)', opacity: '1' },
        // },
        fadeInCustom: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: '#58DDA3',
        'primary-dark': '#46B284',
        'medium-gray': '#9EA2A8',
        'border-color': '#212020',
        'black-rgba': 'rgba(0, 0, 0, 0.54)',
        disable: 'rgb(162, 162, 144)',
      },
      boxShadow: {
        'header-box-shadow': '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
} satisfies Config;
