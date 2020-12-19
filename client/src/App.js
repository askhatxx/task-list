function App() {
  fetch('http://localhost:5000')
  .then(response => response.json())
  .then(result => console.log('x1', result));

  fetch('/tasks')
  .then(response => response.json())
  .then(result => console.log('x2', result));

  fetch('/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ title: 'title from front 1' })
  })
  .then(response => response.json())
  .then(result => console.log('x3', result));

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
