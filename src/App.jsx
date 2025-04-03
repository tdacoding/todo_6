import styles from './App.module.css';
import Table from './components/Table';
import { Form } from './components/Form';
import { useEffect, useState } from 'react';

export const App = () => {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isCreating, setIsCreating] = useState(false);

	const update = () => {
		// console.log('upd', todoId);
	};
	const remove = () => {
		// console.log('del', todoId);
	};

	const table = {
		title: {
			name: 'Задача',
		},

		edit: {
			name: 'Действие',
			component: () => {
				return (
					<button onClick={() => update()} className={styles.editBtn}>
						Изменить
					</button>
				);
			},
		},
		delete: {
			name: 'Действие',
			component: () => {
				return (
					<button onClick={() => remove()} className={styles.delBtn}>
						Удалить
					</button>
				);
			},
		},
	};

	useEffect(() => {
		setIsLoading(true);
		fetch('http://localhost:3000/todos')
			.then((response) => response.json())
			.then((data) => {
				setTodos(data);
			})
			.finally(() => setIsLoading(false));
	}, []);

	const requestAddTodo = (newTodo) => {
		setIsCreating(true);

		fetch('http://localhost:3000/todos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: newTodo,
			}),
		})
			.then((response) => response.json())
			.then((todo) => {
				console.log('Задача добавлена, ответ сервера:', todo);

				setTodos((todos) => {
					[...todos, todo];
				});
			})
			.finally(() => setIsCreating(false));
	};

	return (
		<div className={styles.app}>
			<h1>Список задач</h1>
			<Form requestAddTodo={requestAddTodo} isCreating={isCreating} />
			{todos.map(({ id, title }) => (
				<div key={id}>{title}</div>
			))}
			{/* {isLoading ? (
				<div className={styles.loader}></div>
			) : (
				<div>
					<Table table={table} todos={todos} />
				</div>
			)} */}
		</div>
	);
};
