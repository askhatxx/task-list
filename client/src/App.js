import { BrowserRouter, Switch, Route, Link, useParams } from 'react-router-dom';

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
    <BrowserRouter>
      <button onClick={getCommon}>getCommon</button><br/>
      <button onClick={getTasks}>getTasks</button><br/>
      <button onClick={getTask}>getTask</button><br/>
      <button onClick={addTask}>addTask</button><br/>
      <button onClick={updateTask}>updateTask</button><br/>
      <button onClick={deleteTask}>deleteTask</button><br/>
      <div>
        <Switch>
          <Route path='/' component={Home} exact/>
          <Route path='/:id' component={Task} exact/>
          <Route component={Page404}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

function Home() {
  return (
    <div>
      <Link to='/1234'>Task 1234</Link>
      <h2>Home</h2>
    </div>
  );
}

function Task() {
  let { id } = useParams();
  console.log('id', id);
  return (
    <div>
      <Link to='/'>Home</Link>
      <h2>Task id: {id}</h2>
    </div>
  );
}

function Page404() {
  return (
    <div>
      <Link to='/'>Home</Link>
      <h2>404</h2>
    </div>
  );
}