import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isGhActions = !!process.env.GITHUB_ACTIONS;
  const repo = process.env.GITHUB_REPOSITORY?.split('/')[1];
  const ghBase = repo ? `/${repo}/` : '/';
  const base = process.env.VITE_BASE || (isGhActions ? ghBase : '/');

  return {
    plugins: [react()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    base,
  };
});
