function App() {
  let taksList = [];

  const getCommon = () => {
    fetch('http://localhost:5000')
      .then(response => response.json())
      .then(result => console.log('x1', result));
  }

  const getTasks = () => {
    fetch('/tasks')
      .then(response => response.json())
      .then(result => { taksList = result; console.log('x2', result); });
  }

  const addTask = () => {
    fetch('/tasks', {
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
    fetch('/tasks/' + taksList[0]._id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
    })
      .then(response => response.json())
      .then(result => console.log('x3', result));
  }

  const deleteTask = () => {
    fetch('/tasks/' + taksList[0]._id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
    })
      .then(response => response.json())
      .then(result => console.log('x3', result));
  }

  return (
    <div className="App">
      <button onClick={getCommon}>getCommon</button><br/>
      <button onClick={getTasks}>getTasks</button><br/>
      <button onClick={addTask}>addTask</button><br/>
      <button onClick={updateTask}>updateTask</button><br/>
      <button onClick={deleteTask}>deleteTask</button><br/>
    </div>
  );
}

export default App;
