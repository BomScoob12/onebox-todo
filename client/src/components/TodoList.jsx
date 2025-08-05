import TodoCard from './TodoCard';

const TodoList = ({ todos, onUpdate, onDelete }) => {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <p>No todos yet. Add your first todo to get started!</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
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