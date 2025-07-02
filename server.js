const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = 3000;

app.prepare().then(() => {
  const server = express();

  // Logging middleware
  server.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });

  // Basic auth flag (checks for token=authenticated in cookies)
  server.use((req, res, next) => {
    req.isAuthenticated = req.headers.cookie?.includes('token=authenticated') || false;
    next();
  });

  // Custom routes
  server.get('/dashboard', (req, res) => {
    return app.render(req, res, '/dashboard');
  });

  server.get('/login', (req, res) => {
    return app.render(req, res, '/login');
  });

  // API health check
  server.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Catch-all for everything else
  // Catch-all for everything else (using RegExp instead of '*')
server.all(/.*/, (req, res) => {
  return handle(req, res);
});


  server.listen(PORT, () => {
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});