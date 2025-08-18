import { useState, useEffect } from 'react';
import { fetchTodos } from './api/todo-api';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import './App.css';

const TODO = [
  {
    id: 1,
    title: 'Sample Todo',
    completed: false,
  },
  {
    id: 2,
    title: 'Another Todo',
    completed: true,
  },
  {
    id: 3,
    title: 'Yet Another Todo',
    completed: false,
  },
]

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const fetchedTodos = await fetchTodos();
      setTodos(fetchedTodos);
      setError(null);
    } catch (err) {
      setError('Failed to load todos. Please try again.');
      console.error('Error loading todos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = (newTodo) => {
    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  const handleUpdateTodo = (updatedTodo) => {
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === updatedTodo.id ? updatedTodo : todo
      )
    );
  };

  const handleDeleteTodo = (todoId) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId));
  };

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
          todos={TODO} 
          onUpdate={handleUpdateTodo} 
          onDelete={handleDeleteTodo} 
        />
      </main>
    </div>
  );
}

export default App;
