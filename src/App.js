import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { AppProvider } from './context/AppContext';
import { colors, createNewTask } from './utils';
import Progress from './components/Progress';
import Search from './components/Search';
import TaskList from './components/Task/TaskList';
import TaskBody from './components/Task/TaskBody';
import './App.css';


function App() {
  const [showNew, setShowNew] = useState(false);
  const onClickNew = () => {setShowNew(curVal => !curVal)};

  return (
    <AppProvider>
      <header className='app-header'>
        To-do App
      </header>
      <main>
        <Progress/>
        <div className='banner' style={ colors['newTask'] }>
          <FontAwesomeIcon icon={faPlus} className='icon-add' onClick={onClickNew}
                            style={ showNew ? {borderRadius: '10px 10px 0 0'} : 
                                              {borderRadius: '10px'}}/>
          <Search />
        </div>
        <div className='container-new-task'>
          { showNew && <TaskBody style={ colors['newTask'] } 
                                 task={createNewTask()}
                                 onSubmit={setShowNew} />}
        </div>
        <TaskList />
      </main>
      <footer className='app-footer'>
        <span>
          © 2023 &nbsp;<b>Muaz Abdeen</b> - All Rights Reserved.
        </span>
      </footer>
      

    </AppProvider>
  );
}

export default App;
