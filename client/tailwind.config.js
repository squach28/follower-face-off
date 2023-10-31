/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        correct: {
          "0%, 100%": {
            transform: "scale(1)"
          },
          "50%": {
            transform: "scale(1.25)"
          }
        },
        wrong: {
          "0%, 100%": {
            transform: 'translateX(0)'
          },
          '25%': {
            transform: 'translateX(50px)'
          },
          '75%': {
            transform: 'translateX(-50px)'
          }
        }
      },
      animation: {
        'correct-answer': 'correct 0.75s',
        'wrong-answer': 'wrong ease-in 0.75s'
      }
    },
  },
  plugins: [],
}

