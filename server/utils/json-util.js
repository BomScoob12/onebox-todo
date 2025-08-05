import fs from 'fs';

export const readJsonFile = (filePath) => {
  try {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.warn(`File does not exist at ${filePath}, creating empty array`);
      return [];
    }
    
    const data = fs.readFileSync(filePath, 'utf8');
    const parsed = JSON.parse(data);
    
    // Ensure we always return an array
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error(`Error reading JSON file at ${filePath}:`, err);
    return [];
  }
};

export const writeJsonFile = (filePath, data) => {
  try {
    if (!Array.isArray(data)) {
      throw new Error('Data must be an array');
    }
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error(`Error writing JSON file at ${filePath}:`, err);
    throw err;
  }
};

// Helper function to find todo by ID
export const findTodoById = (todos, id) => {
  return todos.find(todo => todo.id === id);
};

// Helper function to find todo index by ID
export const findTodoIndexById = (todos, id) => {
  return todos.findIndex(todo => todo.id === id);
};
