/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'pico-1': '#000000',
        'pico-2': '#1d2b53',
        'pico-3': '#7e2553',
        'pico-4': '#008751',
        'pico-5': '#ab5236',
        'pico-6': '#5f574f',
        'pico-7': '#c2c3c7',
        'pico-8': '#fff1e8',
        'pico-9': '#ff004d',
        'pico-10': '#ffa300',
        'pico-11': '#ffec27',
        'pico-12': '#00e436',
        'pico-13': '#29adff',
        'pico-14': '#83769c',
        'pico-15': '#ff77a8',
        'pico-16': '#ffccaa',
        'pico-17': '#291814',
        'pico-18': '#111d35',
        'pico-19': '#422136',
        'pico-20': '#125359',
        'pico-21': '#742f29',
        'pico-22': '#49333b',
        'pico-23': '#a28879',
        'pico-24': '#f3ef7d',
        'pico-25': '#be1250',
        'pico-26': '#ff6c24',
        'pico-27': '#a8e72e',
        'pico-28': '#00b543',
        'pico-29': '#065ab5',
        'pico-30': '#754665',
        'pico-31': '#ff6e59',
        'pico-32': '#ff9d81',
      },
    },
    keyframes: {
      'fade-in': {
        '0%': { opacity: 0 },
        '100%': { opacity: 1 },
      },
      'fade-out': {
        '0%': { opacity: 1 },
        '100%': { opacity: 0 },
      },
    },
    animation: {
      'fade-in': 'fade-in 0.5s ease-out',
      'fade-out': 'fade-out 0.5s ease-out',
    },
  },
  plugins: [],
};
