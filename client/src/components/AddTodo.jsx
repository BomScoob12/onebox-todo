import { useState } from 'react';
import { addTodo } from '../api/todo-api';

const AddTodo = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim() === '') return;

    setIsLoading(true);
    try {
      const newTodo = await addTodo({ title: title.trim() });
      onAdd(newTodo);
      setTitle('');
    } catch (error) {
      console.error('Error adding todo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="add-todo">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            disabled={isLoading}
            className="todo-input"
          />
          <button type="submit" disabled={isLoading || title.trim() === ''} className="add-btn">
            {isLoading ? 'Adding...' : 'Add Todo'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTodo; 