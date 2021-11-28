import preprocess from 'svelte-preprocess';
import adapterCFW from '@sveltejs/adapter-cloudflare-workers';
import { defineConfig, searchForWorkspaceRoot } from 'vite';
const viteConfig = defineConfig(() => {
    return {
        optimizeDeps: {
            include: ["@toast-ui/editor"],
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
});

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://github.com/sveltejs/svelte-preprocess
    // for more information about preprocessors
    preprocess: preprocess({
        postcss: true,
    }),

    kit: {
        files: {
            assets: "public"
        },
        adapter: adapterCFW({
            esbuild: (options) => {
                return {
                    ...options,
                    external: ["./editor-675d6d07.js", "./editor*"],
                    format: "esm"
                }
            }
        }),
        target: '#svelte',
        vite: () => {
            return viteConfig;
        },
    },

}

export default config;