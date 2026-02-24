import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from 'vite-plugin-pwa'

export default defineConfig({
    plugins: [
        react(), VitePWA(
            {
                registerType: 'autoUpdate',
                includeAssets: ['logo.svg'],
                manifest: {
                    name: 'Truth & Dare - Premium Edition',
                    short_name: 'TruthDare',
                    description: 'The ultimate party game with Group, Couple, and Steamy modes.',
                    theme_color: '#000000',
                    background_color: '#000000',
                    display: 'standalone',
                    orientation: 'portrait',
                    icons: [
                        {
                            src: 'logo.svg',
                            sizes: 'any',
                            type: 'image/svg+xml',
                            purpose: 'any maskable'
                        }, {
                            src: 'logo.svg',
                            sizes: '192x192',
                            type: 'image/svg+xml'
                        }, {
                            src: 'logo.svg',
                            sizes: '512x512',
                            type: 'image/svg+xml'
                        }
                    ]
                }
            }
        )
    ]
})
