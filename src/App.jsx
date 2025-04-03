import styles from './App.module.css';
import Table from './components/Table';
import { useEffect, useState } from 'react';

export const App = () => {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const update = (todoId) => {
		// console.log('upd', todoId);
	};
	const remove = (todoId) => {
		// console.log('del', todoId);
	};

	const table = {
		title: {
			name: 'Задача',
		},

		edit: {
			name: 'Действие',
			component: (todoId) => {
				return (
					<button onClick={() => update(todoId)} className={styles.editBtn}>
						Изменить
					</button>
				);
			},
		},
		delete: {
			name: 'Действие',
			component: (todoId) => {
				return (
					<button onClick={() => remove(todoId)} className={styles.delBtn}>
						Удалить
					</button>
				);
			},
		},
	};

	useEffect(() => {
		setIsLoading(true);

		fetch('https://jsonplaceholder.typicode.com/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedTodos) => {
				setTodos(loadedTodos);
			})
			.finally(() => setIsLoading(false));
	}, []);

	return (
		<div>
			<h1>Список задач</h1>
			<div>
				<input></input>
			</div>

			{isLoading ? (
				<div className={styles.loader}></div>
			) : (
				<div>
					<Table table={table} todos={todos} />
				</div>
			)}
		</div>
	);
};
