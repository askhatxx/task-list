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
    await api.addTask({ title: newTask.trim() });
    await getTasks();
    setNewTask('');
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

function Task({ task, refresh, fullWidth }) {
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

  const dateTask = () => {
    const formatDateAddZero = num => {
      if (num < 10) {
          return '0' + num;
      }
      return num;
    }

    const date = new Date(Date.parse(task.date));
    const day = formatDateAddZero(date.getDate());
    const month = formatDateAddZero(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = formatDateAddZero(date.getHours());
    const minutes = formatDateAddZero(date.getMinutes());

    return `${day}.${month}.${year} ${hours}:${minutes}`;
  }

  return (
    <div className={fullWidth ? 'col' : 'col-md-6 col-lg-4'}>
      <div className='padding-task'>
        <div className='task'>
          <div className='task__title'>
            { task.title }
          </div>
          <div className='task__date'>
            <i className="far fa-calendar-alt"/> { dateTask() }
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
      <div className='go-back'>
        <Link to='/'className='task__btn task__btn_lg'>
          <i className="fas fa-angle-left"/> Home
        </Link>
      </div>
      <div className='row'>
        { task && <Task task={task} refresh={() => getTask(id)} fullWidth/> }
      </div>
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