import {nextui} from '@nextui-org/theme';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx},\r\n    ./src/components/**/*.{js,ts,jsx,tsx,mdx},\r\n    ./src/app/**/*.{js,ts,jsx,tsx,mdx},",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {},
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
