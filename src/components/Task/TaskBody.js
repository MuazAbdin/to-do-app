import React, { useRef } from 'react'
import { ACTIONS, TASK_STATUS, useAppContext } from '../../context/AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';


const TaskBody = ({ style, task, onSubmit }) => {
	const { id, title, time, description, status } = task;
	const { dispatch } = useAppContext();

	const titleRef = useRef(),
				timeRef = useRef(),
				descRef = useRef();

	const onAddTask = () => {
		dispatch({type: ACTIONS.ADD_TASK,
							payload: {
								id: id,
								title: titleRef.current.value,
								time: timeRef.current.value,
								description: descRef.current.value,
								status: TASK_STATUS.WAITING,
								isEditted: false
							}})
		onSubmit();
	};

	const onChangeTitle = (newTitle) => {
		dispatch({type: ACTIONS.UPDATE_TASK, 
							payload: { ...task, title: newTitle }});
	};

	const onChangeTime = (newTime) => {
		dispatch({type: ACTIONS.UPDATE_TASK, 
							payload: { ...task, time: newTime }});
	};

	const onChangeDescription = (newDescription) => {
		dispatch({type: ACTIONS.UPDATE_TASK, 
							payload: { ...task, description: newDescription }});
	};

	return (
		<article className='task__details' style={ style }>

			<fieldset className='task__details-title'>
				<input type='text' id={`title-${id}`} name='task-title' placeholder='Task Title'
							 value={status==='' ? undefined : title}
							 onChange={status==='' ? null : (e) => onChangeTitle(e.target.value)}
							 ref={status==='' ? titleRef : null}
							 defaultValue={status==='' ? title : undefined} />
				<label htmlFor={`title-${id}`}>Task Title</label>
			</fieldset>

			<fieldset className='task__details-time'>
				<input type='datetime-local' id={`time-${id}`} name='task-time' placeholder='Task Time'
							 value={status==='' ? undefined : time}
							 onChange={status==='' ? null : (e) => onChangeTime(e.target.value)}
							 ref={status==='' ? timeRef : null}
							 defaultValue={status==='' ? time : undefined} />
				<label htmlFor={`time-${id}`}>Due Date:</label>
			</fieldset>

			<fieldset className='task__details-description'>
				<textarea id={`desc-${id}`} placeholder='Task Description' rows={5}
									value={status==='' ? undefined : description}
									onChange={status==='' ? null : (e) => onChangeDescription(e.target.value)}
									ref={status==='' ? descRef : null}
							 		defaultValue={status==='' ? description : undefined}	/>
				<label htmlFor={`desc-${id}`}>Task Description</label>
			</fieldset>

			{ status==='' &&  
				<button type='button' className='submit-button' onClick={onAddTask}>
					<FontAwesomeIcon icon={faCalendarCheck}/>
					&nbsp;	<span> Add Task </span>
				</button>
			}

		</article>
	);
}

export default TaskBody