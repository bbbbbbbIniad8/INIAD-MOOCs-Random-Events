import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { crx } from "@crxjs/vite-plugin"
import manifest from "./manifest.json"
import { resolve } from 'path'
import zipPack from 'vite-plugin-zip-pack'

export default defineConfig({
  plugins: [
    react(),
    crx({ manifest }),
    zipPack({
      inDir: 'dist',
      outDir: 'archive',
      outFileName: 'RandomEvents-v0.1.0.zip'
    })
  ],
  build: {
    rollupOptions: {
      input: {
        uboa: resolve(__dirname, 'src/event/uboa/uboa.html'),
        redRoom: resolve(__dirname, 'src/event/redRoom/redRoom.html'),
      },
    },
  },
})
