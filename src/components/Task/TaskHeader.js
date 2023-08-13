import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { useAppContext, ACTIONS } from '../../context/AppContext';
import { toggleStatus, displayTaksHeader } from '../../utils';

import './Task.css'


const TaskHeader = (props) => {
	const {task, style, icon, toggleEditMode} = props;
	const { dispatch } = useAppContext();
	const [headertitle, dueDate] = displayTaksHeader(task);

	const onClickStatus = () => {
		dispatch({type: ACTIONS.UPDATE_TASK, 
							payload: { ...task, 
								 				 status: toggleStatus(task.status) }});
	};

	const onClickDelete = () => {
		dispatch({type: ACTIONS.DELETE_TASK,
							payload: task.id });
	};

	return (
	<section className='task__header' style={ style }>
		<span className='task__header-title'>
			<FontAwesomeIcon icon={icon} className='icon' onClick={ onClickStatus }/>				
			&nbsp; <span>{headertitle}</span> &nbsp; : &nbsp; <span className='due-date'>{dueDate}</span>
		</span>
		<span className='task__heading-icons'>
			<FontAwesomeIcon icon={faEdit} className='icon' onClick={toggleEditMode}/>
			<FontAwesomeIcon icon={faTrashCan} className='icon' onClick={ onClickDelete }/>
		</span>
	</section>
	)
}

export default TaskHeader