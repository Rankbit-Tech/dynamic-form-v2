// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  // build: {
  //   target: 'modules',
  //   rollupOptions: {
  //     input: 'src/main.tsx',
  //     output: {
  //       dir: 'dist',
  //       entryFileNames: 'index.js',
  //       // file: 'dist/index.js',
  //       // chunkFileNames: 'dist/[name].js',
  //     },
  //   }
  // },
});
