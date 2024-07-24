/** @type {import('tailwindcss').Config} */
export default {
  content: ['./lib/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    {
      pattern: /grid-cols-./,
    }
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

