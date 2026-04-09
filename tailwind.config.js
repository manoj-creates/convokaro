/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'convo-green': '#16a34a',
        'convo-green-light': '#22c55e',
        'convo-green-dark': '#15803d',
        'convo-ink': '#0a0a0a',
        'convo-ink-2': '#171717',
        'convo-bg': '#fcfcfc',
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'serif'],
        sans: ['"Satoshi"', 'sans-serif', 'system-ui'],
      },
      boxShadow: {
        '3d': '0 20px 40px -10px rgba(0,0,0,0.1), 0 10px 20px -5px rgba(0,0,0,0.04)',
        '3d-hover': '0 30px 60px -12px rgba(0,0,0,0.15), 0 15px 30px -7px rgba(0,0,0,0.05)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.05)',
        'inner-light': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.3)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      animation: {
        marquee: 'marquee 20s linear infinite',
      }
    },
  },
  plugins: [],
}
