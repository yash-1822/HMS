// tailwind.config.js
module.exports = {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
      extend: {
        keyframes: {
          'fade-in-down': {
            '0%': { opacity: '0', transform: 'translateY(-10%)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          },
        },
        animation: {
          'fade-in-down': 'fade-in-down 0.3s ease-out',
        },
      },
    },
    plugins: [],
  }
  