import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { todoRouter } from './api/todo-router.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// API routes
app.use('/api', todoRouter);

// Serve static files from the React build directory
// Check if we're in Docker (public folder) or local development (client/dist)
const staticPath = path.join(__dirname, 'public');
const clientDistPath = path.join(__dirname, '../client/dist');

// Try Docker path first, then fallback to local development path
if (fs.existsSync(staticPath)) {
  app.use(express.static(staticPath));
  app.get('*', (_, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
  });
} else {
  app.use(express.static(clientDistPath));
  app.get('*', (_, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`React app will be served from: ${path.join(__dirname, '../client/dist')}`);
});
