/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
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

