import { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Link, useParams, useRouteMatch, useHistory } from 'react-router-dom';
import api from './api';

function App() {
  return (
    <div className='container'>
      <BrowserRouter>
        <Switch>
          <Route path='/' exact>
            <PageHome/>
          </Route>
          <Route path='/:id' exact>
            <PageTask/>
          </Route>
          <Route>
            <Page404/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

function PageHome() {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    const result = await api.getTasks();
    console.log('App getTasks', result);
    setTasks(result);
  }

  useEffect(() => {
    console.log('App useEffect');
    getTasks();
  }, []);

  const addTask = async () => {
    const result = await api.addTask({ title: 'title from front 3' });
    console.log('PageHome addTask', result);
    getTasks();
  }

  return (
    <div>
      <button onClick={addTask}>addTask</button><br/><br/><br/>
      <div className='row'>
        { tasks.map(item => <Task key={item._id} task={item} refresh={getTasks}/>) }
      </div>
    </div>
  );
}

function Task({ task, refresh }) {
  const { url } = useRouteMatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const updateTask = async () => {
    setLoading(true);
    const result = await api.updateTask({ id: task._id, completed: !task.completed });
    console.log('TaskElement updateTask', result);
    refresh();
    setLoading(false);
  }

  const deleteTask = async () => {
    setLoading(true);
    const result = await api.deleteTask(task._id);
    console.log('TaskElement deleteTask', result);
    setLoading(false);
    url === '/' ? refresh() : history.push('/');
  }

  return (
    <div className='col-md-6 col-lg-4'>
      <div className='task'>
        { task.title }<br/>
        <div className="form-check form-switch">
          <input className="form-check-input" type="checkbox" checked={task.completed} onChange={updateTask} disabled={loading}/>
        </div>
        <button className='btn btn-info' onClick={deleteTask} disabled={loading}><i className="far fa-trash-alt"/></button><br/>
        { url === '/' && <Link to={'/' + task._id} className='btn btn-info'><i className="far fa-eye"/></Link> }
      </div>
    </div>
  );
}

function PageTask() {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  const getTask = async (id) => {
    const result = await api.getTask(id);
    setTask(result);
    console.log('PageTask getTask', result);
  }

  useEffect(() => {
    console.log('PageTask useEffect');
    getTask(id);
  }, [id]);
  
  return (
    <div>
      <Link to='/'>Home</Link>
      { task && <Task task={task} refresh={() => getTask(id)}/> }
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

export default App;