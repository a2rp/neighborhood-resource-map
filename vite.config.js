import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
    base: "/neighborhood-resource-map/",
    build: {
        sourcemap: false,
    },
    plugins: [react()],
});
