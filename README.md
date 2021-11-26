# A viable document sharing platform, made using cloudflare workers and sveltekit!

# Asset Handling
Use "/public" for static assets such as images. CSS files and such non-proper static files can be placed in root.

# Conventions
Place components to single routes in private folders next to the .svelte route file. Shared components in lib, along
with shared util files. Keep stores in the private folders.
## Developing
Use `127.0.0.1:3000` instead of localhost for cookie auth setting reasons. Replace the `API_URL` constant in src/global.d to whatever the desired API endpoint is for the environment. Dont forget to change it to a production value before pushing to prod.