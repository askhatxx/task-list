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
  const [newTask, setNewTask] = useState('');

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
    if (!newTask.trim()) return;
    const result = await api.addTask({ title: newTask.trim() });
    console.log('PageHome addTask', result);
    getTasks();
  }

  return (
    <div>
      <div className='add-task'>
        <input className='task-input'
          value={newTask} 
          onChange={e => setNewTask(e.target.value)}
          placeholder='Enter task...'/>
        <button className='task__btn task__btn_lg' onClick={addTask}><i className="fas fa-paper-plane"/></button>
      </div>
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
      <div className='padding-task'>
        <div className='task'>
          <div className='task__title'>
            { task.title }
          </div>
          <div className='task__options'>
            <div className="form-check form-switch">
              <input className="form-check-input task__checkbox" type="checkbox" checked={task.completed} onChange={updateTask} disabled={loading}/>
            </div>
            <div className='task__btn-group'>
              <button className='task__btn' onClick={deleteTask}><i className="far fa-trash-alt"/></button>
              { url === '/' && <Link to={'/' + task._id} className='task__btn'><i className="far fa-eye"/></Link> }
            </div>
          </div>
        </div>
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