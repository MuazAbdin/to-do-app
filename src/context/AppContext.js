import React, { createContext, useReducer, useContext, useEffect } from "react";

// constant categories
export const ACTIONS = {
	ADD_TASK: 'ADD_TASK',
	UPDATE_TASK: 'UPDATE_TASK',
	DELETE_TASK: 'DELETE_TASK',
	SET_QUERY: 'SET_QUERY'
};

export const TASK_STATUS = {
	WAITING: 'WAITING',
	DONE: 'DONE',
	MISSED: 'MISSED'
};

// The Reducer
export const AppReducer = (state, action) => {
	let newTasks = [];
	switch (action.type) {
		case ACTIONS.ADD_TASK:
			newTasks = [ ...state.tasks ];
			newTasks.push(action.payload);
			newTasks.sort( (a, b) => new Date(a.time) - new Date(b.time) );
			return {...state, tasks: newTasks};
	
		case ACTIONS.UPDATE_TASK:
			newTasks =  state.tasks.map( task => {
				return (task.id === action.payload.id) ? action.payload : task;
			} );
			newTasks.sort( (a, b) => new Date(a.time) - new Date(b.time) );
			return {...state, tasks: newTasks};
	
		case ACTIONS.DELETE_TASK:
			newTasks = state.tasks.filter( task => task.id !== action.payload);
			return {...state, tasks: newTasks};

		case ACTIONS.SET_QUERY:
			return {...state, query: action.payload};
	
		default:
			return state;
	}
}

const getLocalStorage = (key, defaultValue=[]) => {
	if (typeof window !== "undefined") {
		const storedTasks = localStorage.getItem(key);
		return JSON.parse(storedTasks) || defaultValue;
	}
};

// Initial State
const initialState = {
	query: '',
	tasks: getLocalStorage('tasks')
};

// Context
export const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

// The Provider
export const AppProvider = (props) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	useEffect( () => {
		localStorage.setItem('tasks', JSON.stringify(state.tasks))
	}, [state.tasks]);

	return (
		<AppContext.Provider
			value={{
				query: state.query,
				tasks: state.tasks,
				dispatch
			}}
		>
			{props.children}
		</AppContext.Provider>
	)
}
