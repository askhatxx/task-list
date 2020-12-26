const api = {
  getCommon: async () => {
    const response = await fetch('http://localhost:5000');
    return await response.json();
  },

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
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(newTask)
    });
    return await response.json();
  },

  updateTask: async (id) => {
    const response = await fetch('/api/tasks/' + id, {
      method: 'PUT',
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