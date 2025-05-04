const initState = { isLoading: false, error: null };

export const status = (state = initState, action) => {
	switch (action.type) {
		case 'SET_IS_LOADING':
			return { ...state, isLoading: true };
		case 'SUCCESS':
			return { ...state, isLoading: false, error: null };
		case 'ERROR':
			return { ...state, isLoading: false, error: action.payload };
		default:
			return state;
	}
};
