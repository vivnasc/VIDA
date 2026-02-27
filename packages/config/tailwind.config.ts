import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ─── VIDA Brand Colors ─── */
        primary: {
          DEFAULT: "#FF6B35",
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
          950: "#441609",
        },
        secondary: {
          DEFAULT: "#FFB4A2",
          50: "#FFF5F2",
          100: "#FFE8E1",
          200: "#FFD5C8",
          300: "#FFB4A2",
          400: "#FF9580",
          500: "#FF7A66",
          600: "#E05A48",
          700: "#BC4436",
          800: "#9A3A30",
          900: "#80342D",
          950: "#451714",
        },
        accent: {
          DEFAULT: "#FFCF56",
          50: "#FFFCEB",
          100: "#FFF7C6",
          200: "#FFED88",
          300: "#FFDF5A",
          400: "#FFCF56",
          500: "#F0B020",
          600: "#CC8A13",
          700: "#A26314",
          800: "#864D16",
          900: "#724018",
          950: "#43210A",
        },
        background: {
          DEFAULT: "#FFF8F0",
          dark: "#1A1412",
        },

        /* ─── Semantic App Colors ─── */
        familia: {
          DEFAULT: "#FF6B35",
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
        dinheiro: {
          DEFAULT: "#10B981",
          50: "#ECFDF5",
          100: "#D1FAE5",
          200: "#A7F3D0",
          300: "#6EE7B7",
          400: "#34D399",
          500: "#10B981",
          600: "#059669",
          700: "#047857",
          800: "#065F46",
          900: "#064E3B",
        },
        lar: {
          DEFAULT: "#3B82F6",
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#1E3A8A",
        },
        saude: {
          DEFAULT: "#F43F5E",
          50: "#FFF1F2",
          100: "#FFE4E6",
          200: "#FECDD3",
          300: "#FDA4AF",
          400: "#FB7185",
          500: "#F43F5E",
          600: "#E11D48",
          700: "#BE123C",
          800: "#9F1239",
          900: "#881337",
        },
        biz: {
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
        },

        /* ─── Dark Mode Surface Colors ─── */
        surface: {
          DEFAULT: "#FFFFFF",
          dark: "#231E1B",
        },
        "surface-elevated": {
          DEFAULT: "#FFFFFF",
          dark: "#2D2623",
        },
        "on-surface": {
          DEFAULT: "#1A1412",
          dark: "#FFF8F0",
        },
        muted: {
          DEFAULT: "#F5F0EB",
          dark: "#3D3430",
          foreground: "#78716C",
        },
        border: {
          DEFAULT: "#E7E0DA",
          dark: "#4A403A",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
        ],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.875rem" }],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        soft: "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
        "soft-lg":
          "0 10px 40px -10px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.04)",
      },
      animation: {
        "slide-up": "slideUp 0.3s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "fade-in": "fadeIn 0.2s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
      },
      keyframes: {
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      screens: {
        xs: "375px",
        "3xl": "1920px",
      },
      spacing: {
        "safe-bottom": "env(safe-area-inset-bottom)",
        "safe-top": "env(safe-area-inset-top)",
        "safe-left": "env(safe-area-inset-left)",
        "safe-right": "env(safe-area-inset-right)",
      },
    },
  },
  plugins: [],
};

export default config;
