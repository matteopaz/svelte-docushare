import preprocess from 'svelte-preprocess';
import adapterCFW from '@sveltejs/adapter-cloudflare-workers';
import { defineConfig, searchForWorkspaceRoot } from 'vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://github.com/sveltejs/svelte-preprocess
    // for more information about preprocessors
    preprocess: preprocess({
        postcss: true,
    }),
    kit: {
        ssr: false,
        files: {
            assets: "public"
        },
        adapter: adapterCFW({
            esbuild: (options) => {
                return {
                    ...options,
                    external: ["./editor-675d6d07.js", "./editor*"], // Theoretically all you need it the "./editor*", but I'm not touching this again
                    format: "esm" // Also technically not needed, but I'm not touching this again
                }
            }
        }),
        target: '#svelte',
        vite: defineConfig(() => {
            return {
                optimizeDeps: {
                    include: ["@toast-ui/editor"], // Probably not needed but if it aint broke DONT FIX IT
                },
                server: {
                    hmr: {
                        port: 3000,
                        host: "localhost",
                        open: true
                    },
                    fs: {
                        allow: [
                            searchForWorkspaceRoot(process.cwd())
                        ]
                    }
                }
            }
        })
    },

}

export default config;