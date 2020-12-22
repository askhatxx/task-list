function App() {
  let taksList = [];

  const getCommon = () => {
    fetch('http://localhost:5000')
      .then(response => response.json())
      .then(result => console.log('x1', result));
  }

  const getTasks = () => {
    fetch('/api/tasks')
      .then(response => response.json())
      .then(result => { taksList = result; console.log('x2', result); });
  }

  const getTask = () => {
    fetch('/api/tasks/' + taksList[0]._id)
      .then(response => response.json())
      .then(result => console.log('x2', result));
  }

  const addTask = () => {
    fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ title: 'title from front 1' })
    })
      .then(response => response.json())
      .then(result => console.log('x3', result));
  }

  const updateTask = () => {
    fetch('/api/tasks/' + taksList[0]._id, {
      method: 'PUT',
    })
      .then(response => response.json())
      .then(result => console.log('x3', result));
  }

  const deleteTask = () => {
    fetch('/api/tasks/' + taksList[0]._id, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(result => console.log('x3', result));
  }

  return (
    <div className="App">
      <button onClick={getCommon}>getCommon</button><br/>
      <button onClick={getTasks}>getTasks</button><br/>
      <button onClick={getTask}>getTask</button><br/>
      <button onClick={addTask}>addTask</button><br/>
      <button onClick={updateTask}>updateTask</button><br/>
      <button onClick={deleteTask}>deleteTask</button><br/>
    </div>
  );
}

export default App;
