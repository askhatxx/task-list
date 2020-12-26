import { BrowserRouter, Switch, Route, Link, useParams } from 'react-router-dom';
import api from './api';

function App() {
  let taksList = [];

  const getCommon = async () => {
    const result = await api.getCommon();
    console.log('getCommon', result);
  }

  const getTasks = async () => {
    const result = await api.getTasks();
    console.log('getTasks', result);
    taksList = result;
  }

  const getTask = async () => {
    const result = await api.getTask(taksList[0]._id);
    console.log('getTask', result);
  }

  const addTask = async () => {
    const result = await api.addTask({ title: 'title from front 1' });
    console.log('addTask', result);
  }

  const updateTask = async () => {
    const result = await api.updateTask(taksList[0]._id);
    console.log('updateTask', result);
  }

  const deleteTask = async () => {
    const result = await api.deleteTask(taksList[0]._id);
    console.log('deleteTask', result);
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