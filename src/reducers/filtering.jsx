const initState = { isSorted: false, searchExpression: '' };

export const filtering = (state = initState, action) => {
	switch (action.type) {
		case 'SET_IS_SORTED':
			return { ...state, isSorted: action.payload };
		case 'SET_SEARCH_EXPRESSION':
			return { ...state, searchExpression: action.payload };
		default:
			return state;
	}
};
