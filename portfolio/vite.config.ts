import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  ssr: {
    // react-icons ships ESM with directory imports Node can't resolve
    // natively — bundle it into the prerender build instead.
    noExternal: ['react-icons'],
  },
})
