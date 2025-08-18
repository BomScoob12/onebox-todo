import React from 'react';
import TodoCard from './TodoCard';

const TodoList = ({ todos, onUpdate, onDelete }) => {
  const [searchParam, setSearchParam] = React.useState('');
  const [todoList, setTodoList] = React.useState(todos);

  const sortDefault = (todos) => {
    return todos.sort((a, b) => {
      if (a?.dueDate && b?.dueDate) {
        return new Date(b.dueDate) - new Date(a.dueDate);
      }
    });
  };

  React.useEffect(() => {
    setTodoList(sortDefault(todos));
  }, [todos]);

  React.useEffect(() => {
    // Debounce logic for search input
    const timer = setTimeout(() => {
      console.log(`Searching for: ${searchParam}`);
      if (searchParam.trim() === '') {
        setTodoList(todos);
        return;
      }

      const todoFilter = todoList.filter((todo) =>
        todo.title.toLowerCase().includes(searchParam.toLowerCase())
      );
      setTodoList(todoFilter);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchParam, todoList, todos]);

  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <p>No todos yet. Add your first todo to get started!</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      <input
        type="text"
        value={searchParam}
        onChange={(e) => setSearchParam(e.target.value)}
        className="search-input"
        placeholder="Search todos..."
      />
      {todoList.map((todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TodoList;
