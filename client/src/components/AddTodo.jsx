import { useState } from 'react';
import { addTodo } from '../api/todo-api';

const AddTodo = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eisenhowerLabel, setEisenhowerLabel] = useState('Do');
  const [dueDate, setDueDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim() === '') return;

    setIsLoading(true);
    try {
      const newTodo = await addTodo({
        title: title.trim(),
        description: description.trim(),
        eisenhowerLabel: eisenhowerLabel.trim(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        completed: false,
        dueDate: dueDate, // Default to null, can be set later
      });
      onAdd(newTodo);

      // Reset form fields after adding
      setTitle('');
      setDescription('');
      setEisenhowerLabel('Do');
      setDueDate(null);
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
          <textarea
            placeholder="Add a description (optional)"
            className="todo-description"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <section className="todo-option">
            <div className="todo-due-date">
              <label htmlFor="todo-due-date" className="due-date-label">
                Due Date (optional):
              </label>
              <input
                type="date"
                id="todo-due-date"
                className="due-date-input"
                value={
                  dueDate ? new Date(dueDate).toISOString().split('T')[0] : ''
                }
                onChange={(e) =>
                  setDueDate(
                    e.target.value
                      ? new Date(e.target.value).toISOString()
                      : null
                  )
                }
              />
            </div>

            <div className="todo-category">
              <label htmlFor="todo-category" className="category-label">
                Eisenhower priority:
              </label>
              <select
                name="todo-category"
                id="todo-category"
                className="category-select"
                value={eisenhowerLabel}
                onChange={(e) => setEisenhowerLabel(e.target.value)}
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
          </section>
          <button
            type="submit"
            disabled={isLoading || title.trim() === ''}
            className="add-btn"
          >
            {isLoading ? 'Adding...' : 'Add Todo'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTodo;
