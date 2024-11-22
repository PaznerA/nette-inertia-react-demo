import { createRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'

createInertiaApp({
    resolve: async name => {
        const pages = import.meta.glob('./Pages/**/*.jsx')
        const pagePath = `./Pages/${name}.jsx`
        
        if (!pages[pagePath]) {
            throw new Error(`Page not found: ${pagePath}`)
        }

        return (await pages[pagePath]()).default
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />)
    },
}).catch(error => {
    console.error('Failed to start Inertia app:', error)
});