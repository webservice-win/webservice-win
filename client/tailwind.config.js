/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        "poppins":["Poppins","serif"],
        "rubik":[ "Rubik","serif"],
        "urbanist":["Urbanist","serif"],
        "bangla_font":['Mukti',"sans-serif"],
        "noto-sans":["LalSabujNormal"]
      },
      colors:{
        "theme_color":"#5777FF",
        "btncolor1":"#30C10B",
        "color2":"#2563EB"
      },
       backgroundImage:{
        "main_section":"linear-gradient(90deg, #0F8CFF 0%, #7544FF 100%)"
      },
       keyframes: {
        bubble: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '50%': { opacity: '0.7' },
          '100%': { transform: 'translateY(-100px)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200px 0' },
          '100%': { backgroundPosition: '200px 0' }
        },
         rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        jump: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        bubble: 'bubble 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
       'spin-slow': 'spin 1s linear infinite', // Slow down the spin
       jump: 'jump 0.8s infinite',
      },
      animationDelay: {
        '100': '100ms',
        '200': '200ms',
        '300': '300ms',
        '400': '400ms',
        '500': '500ms',
      },
    },
    
     
  },
  plugins: [],
}