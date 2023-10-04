import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    define: {
        _BACKEND_ADDRESS_ : JSON.stringify("http://localhost:3000"),
        _TESTING_ : true
    },
  plugins: [react()],
})
