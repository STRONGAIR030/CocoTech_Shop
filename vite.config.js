import { defineConfig } from "vite";
import eslint from "vite-plugin-eslint";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(), 
        eslint({
            failOnError: false,
            failOnWarning: false, 
          }),
    ],
    // server:{
    //   host: '192.168.137.1'
    // }
});
