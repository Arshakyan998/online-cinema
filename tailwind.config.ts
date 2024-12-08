import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./UIkit/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // container: {
    //   center: true,
    //   padding: {
    //     DEFAULT: "1rem",
    //     lg: "0 72px",
    //   },
    //   screens: {
    //     lg: {
    //       min: "100%",
    //     },
    //   },
    // },

    extend: {
      animation: {
        spin: "spin 1.5s linear infinite", // Анимация вращения
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#58DDA3",
        "primary-dark": "#46B284",
        "medium-gray": "#9EA2A8",
        "border-color": "#212020",
      },
      boxShadow: {
        "header-box-shadow": "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
} satisfies Config;
