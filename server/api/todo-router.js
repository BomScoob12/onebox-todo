import express from 'express';
import path from 'path';
import { v6 as uuidV6 } from 'uuid';
import { readJsonFile, writeJsonFile, findTodoIndexById } from '../utils/json-util.js';

// from /server
const TODO_PATHS = path.resolve('./data/todos.json');

const router = express.Router();

router.use(express.json());

router.get('/todos', (_, res) => {
  try {
    const todos = readJsonFile(TODO_PATHS);
    res.json(todos);
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
    completed: newTodo.completed || false,
  };

  const todos = readJsonFile(TODO_PATHS);
  todos.push(newTodoWithId);

  try {
    writeJsonFile(TODO_PATHS, todos);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to save todo' });
  }

  res.status(201).json(newTodoWithId);
});

// PUT endpoint for updating todo
router.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  if (!updateData) {
    return res.status(400).json({ error: 'Update data is required' });
  }

  const todos = readJsonFile(TODO_PATHS);
  const todoIndex = findTodoIndexById(todos, id);

  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  // Update the todo
  todos[todoIndex] = {
    ...todos[todoIndex],
    ...updateData,
    id: id, // Ensure ID doesn't change
  };

  try {
    writeJsonFile(TODO_PATHS, todos);
    res.json(todos[todoIndex]);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update todo' });
  }
});

// PATCH endpoint for marking todo as complete/incomplete
router.patch('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  if (typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'Completed status is required and must be boolean' });
  }

  const todos = readJsonFile(TODO_PATHS);
  const todoIndex = findTodoIndexById(todos, id);

  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  // Update the completed status
  todos[todoIndex] = {
    ...todos[todoIndex],
    completed: completed,
  };

  try {
    writeJsonFile(TODO_PATHS, todos);
    res.json(todos[todoIndex]);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update todo completion status' });
  }
});

// DELETE endpoint for removing todo
router.delete('/todos/:id', (req, res) => {
  const { id } = req.params;

  const todos = readJsonFile(TODO_PATHS);
  const todoIndex = findTodoIndexById(todos, id);

  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  // Remove the todo
  todos.splice(todoIndex, 1);

  try {
    writeJsonFile(TODO_PATHS, todos);
    res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete todo' });
  }
});

export { router as todoRouter };
