const initState = { isEditing: false, editedTodo: null, inputFocus: false };

export const editingReducer = (state = initState, action) => {
	switch (action.type) {
		case 'SET_IS_EDITING':
			return { ...state, isEditing: action.payload };
		case 'SET_EDITED_TODO':
			return { ...state, editedTodo: action.payload };
		case 'SET_INPUT_FOCUS':
			return { ...state, inputFocus: action.payload };
		default:
			return state;
	}
};
