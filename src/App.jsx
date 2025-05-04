import styles from './App.module.css';
import Table from './components/Table';
import { Form } from './components/Form';
import { SearchForm } from './components/SearchForm';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadData, delTodo } from './actions/todosReducerActions';

export const App = () => {
	const dispatch = useDispatch();
	const todos = useSelector((state) => state.todosReducer.todos);
	const isLoading = useSelector((state) => state.status.isLoading);
	const error = useSelector((state) => state.status.error);
	const isSorted = useSelector((state) => state.filtering.isSorted);
	const searchExpression = useSelector((state) => state.filtering.searchExpression);

	const table = {
		title: {
			name: 'Задача',
		},

		edit: {
			name: 'Действие',
			component: (todo) => {
				return (
					<button onClick={() => editRegime(todo)} className={styles.editBtn}>
						Изменить
					</button>
				);
			},
		},
		delete: {
			name: 'Действие',
			component: (todo) => {
				return (
					<button
						onClick={() => dispatch(delTodo(todo.id))}
						className={styles.delBtn}
					>
						Удалить
					</button>
				);
			},
		},
	};

	useEffect(() => {
		dispatch(loadData());
	}, [isSorted, searchExpression, dispatch]);

	const editRegime = (todo) => {
		dispatch({ type: 'SET_IS_EDITING', payload: true });
		dispatch({ type: 'SET_EDITED_TODO', payload: todo });
		dispatch({ type: 'SET_INPUT_FOCUS', payload: true });
	};

	return (
		<div className={styles.app}>
			<h1>Список задач</h1>
			<Form />
			<SearchForm />

			{isLoading ? (
				<div className={styles.loader}></div>
			) : (
				<>
					<div>{Object.keys(todos).length > 0 && <Table table={table} />}</div>
					<div className={styles.error}>{error}</div>
				</>
			)}
		</div>
	);
};
