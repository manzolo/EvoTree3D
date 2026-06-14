import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Base path is configurable so the same build works locally (`/`) and on
// GitHub Pages under a project subpath (e.g. `/EvoTree3D/`).
// The Pages workflow sets VITE_BASE accordingly.
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
  preview: {
    host: true,
    port: 4173,
  },
});
