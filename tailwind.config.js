/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    colors: {
      'darker-gray-blue': '#222831',
      'dark-gray-blue': '#393E46',
      'green-credit': '#97D35B',
      'red-primary': '#F64F4F',
      'light-green': '#00ADB5',
      'white': '#FFF',
    }
  },
  plugins: [],
}
