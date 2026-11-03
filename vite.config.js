import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import intelligence from './api/intelligence.js'

export default defineConfig({
  plugins: [react(), tailwindcss(), {
    name: 'local-intelligence-api',
    configureServer(server) {
      server.middlewares.use('/api/intelligence', async (req, res) => {
        req.query = Object.fromEntries(new URL(req.url, 'http://localhost').searchParams);
        res.status = code => { res.statusCode = code; return res; };
        res.json = value => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(value)); };
        if (req.method === 'POST') {
          let body = '';
          for await (const chunk of req) { body += chunk; if (body.length > 2048) return res.status(413).json({ error: 'invalid_input' }); }
          req.body = body;
        }
        try { await intelligence(req, res); } catch { if (!res.writableEnded) res.status(500).json({ error: 'agent_unavailable' }); }
      });
    },
  }],
})
