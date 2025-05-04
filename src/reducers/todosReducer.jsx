const initState = { todos: [] };

export const todosReducer = (state = initState, action) => {
	switch (action.type) {
		case 'SET_TODOS':
			return { ...state, todos: action.payload };
		default:
			return state;
	}
};
