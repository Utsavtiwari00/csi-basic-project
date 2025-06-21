// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()]
  // You usually don't need a 'css' section here for Tailwind unless
  // you have very specific PostCSS configurations that Vite isn't
  // picking up automatically from postcss.config.js.
  // Vite will automatically find and use your postcss.config.js
  // as long as it's in the project root.
});
