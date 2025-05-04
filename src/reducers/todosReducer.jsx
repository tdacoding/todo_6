const initState = { todos: [], isEditing: false, editedTodo: null };

export const todosReducer = (state = initState, action) => {
	switch (action.type) {
		case 'SET_TODOS':
			return { ...state, todos: action.payload };
		case 'SET_IS_EDITING':
			return { ...state, isEditing: action.payload };
		case 'SET_EDITED_TODO':
			return { ...state, editedTodo: action.payload };
		default:
			return state;
	}
};
