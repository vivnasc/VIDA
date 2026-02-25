import type { Config } from "tailwindcss";
import sharedConfig from "../../packages/config/tailwind.config";

const config: Config = {
  ...sharedConfig,
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    ...sharedConfig.theme,
    extend: {
      ...sharedConfig.theme?.extend,
      colors: {
        ...(sharedConfig.theme?.extend?.colors as Record<string, unknown>),
        /* App-specific color aliases */
        app: {
          DEFAULT: "#FF6B35",
          light: "#FF9E77",
          dark: "#C44A22",
          50: "#FFF3ED",
          100: "#FFE4D6",
          200: "#FFC5AC",
          300: "#FF9E77",
          400: "#FF7D4D",
          500: "#FF6B35",
          600: "#E85A2A",
          700: "#C44A22",
          800: "#9C3B1B",
          900: "#7D3118",
        },
      },
    },
  },
};

export default config;
