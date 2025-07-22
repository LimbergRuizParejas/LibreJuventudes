import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// ESM compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // permite usar @/ en imports
    },
  },
  css: {
    postcss: resolve(__dirname, 'postcss.config.cjs'), // asegurarse que sea .cjs
  },
  server: {
    port: 5173,
    open: true,
  },
});
