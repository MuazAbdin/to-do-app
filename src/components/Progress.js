import React, { useMemo } from 'react'
import { useAppContext, TASK_STATUS } from '../context/AppContext'
import './Progress.css'


const Progress = () => {
	const {tasks} = useAppContext();

	const [donePercentage, missedPercentage] = 	useMemo( () => {
		let done = 0, missed = 0;
		if (tasks.length===0) { return [0, 0]; }
		tasks.forEach(task => {
			if (task.status === TASK_STATUS.DONE) { done++; }
			else if (task.status === TASK_STATUS.MISSED) { missed++; }
		});
		return [done / tasks.length, missed / tasks.length];
	}, [tasks]);
	
	return (
		<article className="radial-progress" style={ {'--done':`${donePercentage}`,
																									'--miss':`${missedPercentage}`} }>
			<div className="progress-bar">
				{/* <div className="bar-head"></div> */}
				<span className="done-text"> Done {(donePercentage * 100).toFixed(0)}% </span>
				<span className="missed-text"> Missed {(missedPercentage * 100).toFixed(0)}% </span>
			</div>
		</article>
	)
}

export default Progress