import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    define: {
        _BACKEND_ADDRESS_ : JSON.stringify("http://10.88.23.146:3000"),
        _TESTING_ : false
    },
  plugins: [react()],
})
