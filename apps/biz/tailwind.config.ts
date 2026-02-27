import type { Config } from "tailwindcss";
import sharedConfig from "../../packages/config/tailwind.config";

const config: Config = {
  presets: [sharedConfig],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1E7A42",
          50: "#F0FDF4",
          100: "#DCFCE7",
          200: "#BBF7D0",
          300: "#86EFAC",
          400: "#4ADE80",
          500: "#1E7A42",
          600: "#16A34A",
          700: "#166534",
          800: "#14532D",
          900: "#052E16",
          950: "#022C22",
        },
      },
    },
  },
};

export default config;
