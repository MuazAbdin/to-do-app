import React from 'react'
import { ACTIONS, useAppContext } from '../../context/AppContext';
import {getTheme, colors} from '../../utils'
import TaskHeader from './TaskHeader'
import TaskBody from './TaskBody'
import './Task.css'


const Task = ({ task }) => {
	const { status, isEditted } = task;
	const {dispatch} = useAppContext();
	const [icon, colorSet] = getTheme(status);

	const toggleEditMode = () => {
		dispatch({type: ACTIONS.UPDATE_TASK, 
							payload: { ...task, isEditted: !task.isEditted }});
	};

	return (
		<article className='task-card' style={ colors[colorSet] }>
			<TaskHeader style={ colors[colorSet] } icon={icon} task={task}
									toggleEditMode={toggleEditMode}/>
			{ isEditted && <TaskBody style={ colors[colorSet] } task={task} />}
		</article>
	)
}

export default Task