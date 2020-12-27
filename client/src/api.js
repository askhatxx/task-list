const api = {
  getTasks: async () => {
    const response = await fetch('/api/tasks');
    return await response.json();
  },

  getTask: async (id) => {
    const response = await fetch('/api/tasks/' + id);
    return await response.json();
  },

  addTask: async (newTask) => {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      body: JSON.stringify(newTask),
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    });
    return await response.json();
  },

  updateTask: async ({ id, completed }) => {
    const response = await fetch('/api/tasks/' + id, {
      method: 'PUT',
      body: JSON.stringify({ completed }),
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    });
    return await response.json();
  },

  deleteTask: async (id) => {
    const response = await fetch('/api/tasks/' + id, {
      method: 'DELETE',
    });
    return await response.json();
  }
};

export default api;