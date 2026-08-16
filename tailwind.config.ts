import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        abyss: "#0A1B24",
        abyss2: "#0F2530",
        chart: "#EDE7D6",
        chart2: "#E3DBC5",
        signal: "#E0932C",
        signalDim: "#8A5A1F",
        steel: "#5C7A8A",
        alert: "#C1482E",
        ink: "#16232B",
        mist: "#9FB4BD",
        good: "#5E8B6B",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      backgroundImage: {
        grid:
          "linear-gradient(rgba(159,180,189,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(159,180,189,0.06) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "28px 28px",
      },
    },
  },
  plugins: [],
};
export default config;
