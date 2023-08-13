import React, { useState } from 'react'
import { TASK_STATUS, useAppContext } from '../../context/AppContext'
import Task from './Task';
import './Task.css'

const TaskList = () => {
	const { query, tasks } = useAppContext();
	const [showPast, setShowPast] = useState(true);

	const searchResult = tasks.filter( task => {
		return task.title.toLowerCase().includes(query.toLowerCase());
	});

	let taskComponents = searchResult.map(task => <Task key={task.id} task={task} />);
	if (!showPast) {
		taskComponents = taskComponents.filter( task => {
			return (task.props.task.status === TASK_STATUS.WAITING) || (task.props.task.isEditted);
		});
	}

	const toggleShowPast = () => { setShowPast(curVal => !curVal)	};

	return (
		<div className='container'>
			<div className='task-list'>
				{ taskComponents }
			</div>
			<button className='btn-primary' onClick={toggleShowPast}>
				{!showPast ? 'Show' : 'Hide'} Past Tasks
			</button>
		</div>
	);
}

export default TaskList