export const loadData = () => {
	return async (dispatch, getState) => {
		dispatch({ type: 'SET_IS_LOADING' });
		const searchExpression = getState().filtering.searchExpression;
		const isSorted = getState().filtering.isSorted;
		try {
			const response = await fetch(
				`http://localhost:3000/todos?q=${searchExpression}${isSorted ? '&_sort=title&_order=asc' : ''}`,
			);
			const data = await response.json();
			dispatch({ type: 'SET_TODOS', payload: data });
			dispatch({ type: 'SUCCESS' });
		} catch (error) {
			dispatch({ type: 'ERROR', payload: error.message });
		}
	};
};

export const newTodo = (title) => {
	return async (dispatch, getState) => {
		dispatch({ type: 'SET_IS_LOADING' });
		try {
			const response = await fetch('http://localhost:3000/todos', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
				body: JSON.stringify({
					title: title,
				}),
			});
			const newTodo = await response.json();
			const prevTodos = getState().todosReducer.todos;
			dispatch({ type: 'SET_TODOS', payload: [...prevTodos, newTodo] });
			dispatch({ type: 'SUCCESS' });
		} catch (error) {
			dispatch({ type: 'ERROR', payload: error.message });
		}
	};
};

export const delTodo = (id) => {
	return async (dispatch, getState) => {
		dispatch({ type: 'SET_IS_EDITING', payload: false });
		dispatch({ type: 'SET_EDITED_TODO', payload: null });
		dispatch({ type: 'SET_IS_LOADING' });
		try {
			await fetch(`http://localhost:3000/todos/${id}`, {
				method: 'DELETE',
			});
			const prevTodos = getState().todosReducer.todos;
			dispatch({
				type: 'SET_TODOS',
				payload: prevTodos.filter((todo) => todo.id !== id),
			});
			dispatch({ type: 'SUCCESS' });
		} catch (error) {
			dispatch({ type: 'ERROR', payload: error.message });
		}
	};
};

export const editTodo = (newTitle) => {
	return async (dispatch, getState) => {
		dispatch({ type: 'SET_IS_LOADING' });
		try {
			const response = await fetch(
				`http://localhost:3000/todos/${getState().editingReducer.editedTodo.id}`,
				{
					method: 'PUT',
					headers: { 'Content-Type': 'application/json;charset=utf-8' },
					body: JSON.stringify({
						title: newTitle,
					}),
				},
			);
			const updatedTodo = await response.json();
			dispatch({ type: 'SET_IS_EDITING', payload: false });
			dispatch({ type: 'SET_EDITED_TODO', payload: null });
			const prevTodos = getState().todosReducer.todos;
			dispatch({
				type: 'SET_TODOS',
				payload: prevTodos.map((curTodo) =>
					curTodo.id === updatedTodo.id ? updatedTodo : curTodo,
				),
			});

			dispatch({ type: 'SUCCESS' });
		} catch (error) {
			dispatch({ type: 'ERROR', payload: error.message });
		}
	};
};
