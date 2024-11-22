import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
    plugins: [
        react({
            refresh: false, // Disabled to temporary avid problems
        })
    ],
    root: './resources',
    base: '/dist/',
    
    server: {
        origin: 'http://localhost:5173',
        hmr: false
    },
    
    build: {
        outDir: resolve(__dirname, 'www/dist'),
        emptyOutDir: true,
        manifest: true,
        rollupOptions: {
            input: resolve(__dirname, 'resources/js/app.jsx')
        }
    },
    
    resolve: {
        alias: {
            '@': resolve(__dirname, 'resources/js')
        }
    },

    optimizeDeps: {
        include: ['react', 'react-dom', '@inertiajs/react']
    },

    esbuild: {
        jsxInject: `import React from 'react'`
    }
});