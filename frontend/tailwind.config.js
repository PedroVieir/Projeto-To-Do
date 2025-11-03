/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
      backgroundImage: {
        'hero-radial': 'radial-gradient(1000px 600px at 10% -10%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 60%), radial-gradient(600px 600px at 100% 0%, rgba(59,130,246,0.25) 0%, rgba(59,130,246,0) 60%)',
      },
      boxShadow: {
        'soft': '0 10px 30px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
}
