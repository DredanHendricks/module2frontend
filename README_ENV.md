Environment variable guidance

- The frontend reads the backend base URL from VUE_APP_API_URL.
- During development a local `.env.development` is provided (points to http://localhost:9090).
- In production set `VUE_APP_API_URL` in your hosting provider (Netlify, Vercel, etc.) to the deployed backend URL.

How it works

- The app creates an axios instance with baseURL = process.env.VUE_APP_API_URL || 'http://localhost:9090'
- All API calls use relative paths (for example `/login`, `/employees`) so the base can be switched without code changes.

Notes

- If you're using the Vue dev server proxy, you can also proxy API calls to avoid CORS in development. See `vue.config.js` for proxy settings.
