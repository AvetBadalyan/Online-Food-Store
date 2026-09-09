import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [react()],
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					'react-vendor': ['react', 'react-dom', 'react-router-dom'],
					motion: ['framer-motion'],
					firebase: ['firebase/app', 'firebase/auth', 'firebase/database'],
					forms: ['react-hook-form', '@hookform/resolvers', 'zod'],
					icons: ['react-icons']
				}
			}
		}
	}
})
