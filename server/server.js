import express from 'express';
import path from 'path';
import { todoRouter } from './api/todo-router.js';

const app = express();
const PORT = 3000;

// Serve the static files from the public directory
app.use(express.static(path.join('../client', 'public')));

app.use('/api', todoRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
