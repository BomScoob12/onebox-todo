import React, { useState, useEffect } from 'react';
import { fetchTodos } from './api/todo-api';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import './App.css';

const TODO = [
  {
    id: 1,
    title: 'Sample Todo',
    completed: false,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // due in 3 days
    eisenhowerLabel: 'Do',
  },
  {
    id: 2,
    title: 'Another Todo',
    description:
      'This is a sample todo item to demonstrate the app functionality.',
    completed: false,
    createdAt: new Date(Date.now() - 3 * 7 * 24 * 60 * 60 * 1000).toISOString(), // 3 weeks ago
    updatedAt: new Date(Date.now() - 2 * 7 * 24 * 60 * 60 * 1000).toISOString(), // 2 weeks ago
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // due in 1 day
    eisenhowerLabel: 'Delete',
  },
  {
    id: 3,
    title: 'Third Todo',
    completed: false,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // due in 5 days
    eisenhowerLabel: 'Schedule',
  },
  {
    id: 4,
    title: 'Fourth Todo',
    completed: false,
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    dueDate: null,
    eisenhowerLabel: 'Delegate',
  },
  {
    id: 5,
    title: 'Fifth Todo',
    completed: false,
    createdAt: new Date(Date.now() - 1 * 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(), // due in 4 days
    eisenhowerLabel: 'Delegate',
  },
];

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sortDefault = (todos) => {
    return todos.sort((a, b) => {
      if (a?.dueDate && b?.dueDate) {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
    });
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const fetchedTodos = await fetchTodos();
      setTodos(sortDefault(fetchedTodos));
      setError(null);
    } catch (err) {
      setError('Failed to load todos. Please try again.');
      console.error('Error loading todos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = (newTodo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const handleUpdateTodo = (updatedTodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  };

  const handleDeleteTodo = (todoId) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
  };

  React.useEffect(() => {
    if (todos.length > 0) {
      setTodos(sortDefault(todos));
    }
  }, [todos]);

  if (loading) {
    return (
      <div className="app">
        <div className="loading">
          <h2>Loading todos...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <title>Local Todo App</title>
      <header className="app-header">
        <h1>Todo App</h1>
        <p>Manage your tasks efficiently</p>
      </header>

      <main className="app-main">
        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={loadTodos}>Retry</button>
          </div>
        )}

        <AddTodo onAdd={handleAddTodo} />
        <TodoList
          todos={todos}
          onUpdate={handleUpdateTodo}
          onDelete={handleDeleteTodo}
        />
      </main>
    </div>
  );
}

export default App;
