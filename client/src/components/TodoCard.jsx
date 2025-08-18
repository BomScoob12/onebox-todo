import { useState } from 'react';
import { updateTodo, deleteTodo, markTodoComplete } from '../api/todo-api';

const TodoCard = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(
    todo.description || ''
  );
  const [editDueDate, setEditDueDate] = useState(todo.dueDate || null);
  const [editEisenhowerLabel, setEditEisenhowerLabel] = useState(
    todo.eisenhowerLabel || 'Do'
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = async () => {
    if (editText.trim() === '') return;

    setIsLoading(true);
    try {
      const updatedTodo = await updateTodo(todo.id, {
        title: editText.trim(),
        description: editDescription.trim(),
        dueDate: editDueDate,
        eisenhowerLabel: editEisenhowerLabel,
        updatedAt: new Date().toISOString(),
      });
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
            {/* Title */}
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              placeholder="Title"
              onKeyDown={(e) => e.key === 'Enter' && handleEdit()}
              disabled={isLoading}
              autoFocus
              className="todo-description"
            />

            {/* Description */}
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              placeholder="Description"
              disabled={isLoading}
              className="todo-description"
              rows={3}
            />

            {/* Due Date */}
            <div className="todo-due-date">
              <label htmlFor="edit-due-date" className="due-date-label">
                Due Date (optional):
              </label>
              <input
                type="date"
                id="edit-due-date"
                value={
                  editDueDate
                    ? new Date(editDueDate).toISOString().split('T')[0]
                    : ''
                }
                onChange={(e) =>
                  setEditDueDate(
                    e.target.value
                      ? new Date(e.target.value).toISOString()
                      : null
                  )
                }
                disabled={isLoading}
                className="due-date-input"
              />
            </div>

            {/* Eisenhower Label */}
            <div className="todo-category">
              <label htmlFor="edit-eisenhower" className="category-label">
                Eisenhower Priority:
              </label>
              <select
                id="edit-eisenhower"
                value={editEisenhowerLabel}
                onChange={(e) => setEditEisenhowerLabel(e.target.value)}
                disabled={isLoading}
                className="category-select"
              >
                <option value="Do">Do (Urgent, Important)</option>
                <option value="Schedule">
                  Schedule (Not Urgent, Important)
                </option>
                <option value="Delegate">Delegate (Urgent, Important)</option>
                <option value="Delete">
                  Delete (Not Urgent, Not Important)
                </option>
              </select>
            </div>
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
            <div>
              {todo.description && (
                <p className="todo-description">{todo.description}</p>
              )}
              <p className="todo-date">
                {todo?.dueDate ? (
                  <>
                    Due date:{' '}
                    {new Date(todo?.dueDate).toLocaleDateString('th-TH')}
                  </>
                ) : (
                  <>No Due date</>
                )}
              </p>
              <p>{todo.eisenhowerLabel}</p>
            </div>
            <div className="todo-actions">
              <button
                onClick={() => handleToggleComplete}
                disabled={isLoading}
                className={
                  todo.completed ? 'completed-btn' : 'not-completed-btn'
                }
              >
                {todo.completed ? 'Mark as not complete' : 'Mark Complete'}
              </button>
              <button onClick={() => setIsEditing(true)} disabled={isLoading}>
                Edit
              </button>
              <button
                onClick={handleDelete}
                disabled={isLoading}
                className="delete-btn"
              >
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
