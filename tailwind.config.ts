import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
        'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        transparent: 'transparent',
        current: 'currentColor',
        'white': '#ffffff',
        'purple': '#3f3cbb',
        'midnight': '#121063',
        'metal': '#565584',
        'tahiti': '#3ab7bf',
        'silver': '#ecebff',
        'bubble-gum': '#ff77e9',
        'bermuda': '#78dcca',
      },
      colors: {
        navy_blue: '#001333',
        peach_primary: "#FF595A",
        peach_secondary: "rgba(255, 89, 90, 0.26)",
        ova_white: "#fff",
        ova_black_: "#000",
        ova_dark_primary: "#333",
        ova_dark_secondary: "#4B4B4B",
        ova_grey: "#EAECEE",
        ova_grey_border: "#C3C3C3",
        'mobile-bg': "#F3F3F3",
        'mobile-card-bg':"#F7F8FA",
        'card-span-text': "#979797",
        'progress-bar': "#d9d9d9"
      },screens: {
        'mini': '500px',
      }
    },
  },
  plugins: [],
}
export default config
