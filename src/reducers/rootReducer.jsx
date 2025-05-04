import { combineReducers } from 'redux';
import { todosReducer } from './todosReducer';
import { filtering } from './filtering';
import { status } from './status';

export const rootReducer = combineReducers({
	todosReducer,
	filtering,
	status,
});
