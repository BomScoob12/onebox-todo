import { useState } from 'react';
import { updateTodo, deleteTodo, markTodoComplete } from '../api/todo-api';

const TodoCard = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.title);
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = async () => {
    if (editText.trim() === '') return;
    
    setIsLoading(true);
    try {
      const updatedTodo = await updateTodo(todo.id, { title: editText });
      onUpdate(updatedTodo);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating todo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteTodo(todo.id);
      onDelete(todo.id);
    } catch (error) {
      console.error('Error deleting todo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleComplete = async () => {
    setIsLoading(true);
    try {
      const updatedTodo = await markTodoComplete(todo.id, !todo.completed);
      onUpdate(updatedTodo);
    } catch (error) {
      console.error('Error toggling todo completion:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditText(todo.title);
    setIsEditing(false);
  };

  return (
    <div className={`todo-card ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        {isEditing ? (
          <div className="edit-form">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleEdit()}
              disabled={isLoading}
              autoFocus
            />
            <div className="edit-actions">
              <button onClick={handleEdit} disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save'}
              </button>
              <button onClick={handleCancelEdit} disabled={isLoading}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="todo-header">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={handleToggleComplete}
                disabled={isLoading}
              />
              <h3 className={todo.completed ? 'completed-text' : ''}>
                {todo.title}
              </h3>
            </div>
            <div className="todo-actions">
              <button onClick={() => setIsEditing(true)} disabled={isLoading}>
                Edit
              </button>
              <button onClick={handleDelete} disabled={isLoading} className="delete-btn">
                {isLoading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoCard; 