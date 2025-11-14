import { defineConfig } from "tailwindcss/helpers";

export default defineConfig({
  theme: {
    extend: {
      colors: {
        primary: "#1e40af",
        secondary: "#9333ea",
      },
    },
    container: {
      center: true, // Centra el contenedor automáticamente
      padding: "1rem", // Espaciado lateral
      screens: {
        sm: "600px",
        md: "728px",
        lg: "1360px",
      },
    },
  },
  plugins: [],
});
