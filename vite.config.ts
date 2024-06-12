import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.config'
import packageJson from './package.json';

export default defineConfig({
  plugins: [
    react(),
    crx({ manifest }),
  ],
  define:  {
    'import.meta.env.PACKAGE_VERSION': JSON.stringify(packageJson.version)
  },
})