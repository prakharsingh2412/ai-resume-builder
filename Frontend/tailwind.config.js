/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'score-fill': 'score 1s ease-out forwards'
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        ping: {
          '75%, 100%': {
            transform: 'scale(2)',
            opacity: '0'
          }
        },
        score: {
          '0%': { '--score-progress': '0%' },
          '100%': { '--score-progress': 'var(--target-score)' }
        }
      },
      backgroundColor: {
        'glass': 'rgba(255, 255, 255, 0.05)'
      },
      backdropFilter: {
        'glass': 'blur(10px)'
      }
    },
  },
  plugins: [],
}