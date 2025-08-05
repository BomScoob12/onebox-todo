import express from 'express';
import path from 'path';
import { v6 as uuidV6 } from 'uuid';
import { readJsonFile, writeJsonFile } from '../utils/json-util.js';

// from /server
const TODO_PATHS = path.resolve('data/todos.json');

const router = express.Router();

router.use(express.json());

router.get('/todos', (_, res) => {
  try {
    const todos = readJsonFile(TODO_PATHS);
    res.json(todos || []);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to read todos' });
  }
});

router.post('/todos', (req, res) => {
  const newTodo = req.body;

  if (!newTodo) {
    return res.status(400).json({ error: 'Todo data is required' });
  }

  if (newTodo?.id) {
    return res.status(400).json({ error: 'Todo should not have an id' });
  }

  const newTodoWithId = {
    ...newTodo,
    id: uuidV6(),
  };

  const todos = readJsonFile(TODO_PATHS) || [];
  todos.push(newTodoWithId);

  try {
    writeJsonFile(TODO_PATHS, todos);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to save todo' });
  }

  res.status(201).json(newTodo);
});

export { router as todoRouter };
