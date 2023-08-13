import { faSquare } from '@fortawesome/free-regular-svg-icons'
import { faSquareCheck, faSquareXmark } from '@fortawesome/free-solid-svg-icons'
import { TASK_STATUS } from './context/AppContext'
import { nanoid } from 'nanoid'


export const colors = { wait: {'--primary': 'hsl(215, 100%, 50%)', 
												'--bg-primary': 'hsl(215, 100%, 80%)',
												'--bg-secondary': 'hsl(215, 100%, 90%)'},
								 miss: {'--primary': 'hsl(10, 70%, 45%)', 
												'--bg-primary': 'hsl(10, 70%, 75%)',
												'--bg-secondary': 'hsl(10, 70%, 85%)'},
								 done: {'--primary': 'hsl(130, 40%, 50%)', 
												'--bg-primary': 'hsl(130, 40%, 80%)',
												'--bg-secondary': 'hsl(130, 40%, 90%)'},
								 newTask: {'--primary': 'hsl(60, 65%, 45%)', 
												'--bg-primary': 'hsl(45, 100%, 80%)',
												'--bg-secondary': 'hsl(55, 90%, 85%)',
												'--hover': 'hsla(55, 90%, 85%, 0.5)'},

							 };


export const getTheme = (status) => {
	switch (status) {
		case TASK_STATUS.DONE:
			return [faSquareCheck, 'done'];
		case TASK_STATUS.MISSED:
			return [faSquareXmark, 'miss'];
		default:
			return [faSquare, 'wait'];
	}
};

export const displayTaksHeader = (task) => {
	const MONTHS = ['Jan', 'Feb', 'March', 'April', 
									'May', 'June', 'July', 'Aug',
									'Sep', 'Oct', 'Nov', 'Dec'];
	const day = parseInt(task.time.slice(8,10)),
				month = parseInt(task.time.slice(5,7))
	return [`${task.title}`, `[ ${day} ${MONTHS[month-1]} ]`];
}

export const toggleStatus = (status) => {
	switch (status) {
		case TASK_STATUS.DONE:
			return TASK_STATUS.MISSED;
		case TASK_STATUS.MISSED:
			return TASK_STATUS.WAITING;
		default:
			return TASK_STATUS.DONE;
	}
};

const datetimeLocal = () => {
	const dt = new Date();
	dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
	return dt.toISOString().slice(0, 16);
}

export const createNewTask = () => {
	return 		{
		id: nanoid(),
		title: '',
		time: datetimeLocal(),
		description: '',
		status: '',
		isEditted: false
	};
};