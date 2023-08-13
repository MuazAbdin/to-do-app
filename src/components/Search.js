import React from 'react'
import { ACTIONS, useAppContext } from '../context/AppContext'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Search = () => {
	const { query, dispatch } = useAppContext();
	const onChangeQuery = (newQuery) => {
		dispatch({type: ACTIONS.SET_QUERY, 
							payload: newQuery });
	};


	return (
		<fieldset className='search-field'>
			<FontAwesomeIcon icon={faMagnifyingGlass} className='search-icon'/>
			<input type='search' id='search-tasks' name='search-tasks'
						 placeholder='Search Tasks ...'
						 value={query} onChange={(e) => onChangeQuery(e.target.value)}/>
		</fieldset>

	);
}

export default Search