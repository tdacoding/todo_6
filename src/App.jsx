import styles from './App.module.css';
import Table from './components/Table';
import { Form } from './components/Form';
import { SearchForm } from './components/SearchForm';
import { useEffect, useState, useRef, useCallback } from 'react';
import { AppContext } from './AppContext.jsx';

export const App = () => {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [isEditing, setIsEditing] = useState(false);
	const [editedTodo, setEditedTodo] = useState(null);
	const formInputRef = useRef(null);
	const [isSorted, setIsSorted] = useState(false);
	const [searchExpression, setSearchExpression] = useState('');

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
					<button onClick={() => delTodo(todo.id)} className={styles.delBtn}>
						Удалить
					</button>
				);
			},
		},
	};

	const loadData = useCallback(async () => {
		setIsLoading(true);
		try {
			const response = await fetch(
				`http://localhost:3000/todos?q=${searchExpression}${isSorted ? '&_sort=title&_order=asc' : ''}`,
			);
			const data = await response.json();
			setTodos(data);
			setIsLoading(false);
		} catch (error) {
			setError(error.message);
			setIsLoading(false);
		}
	}, [isSorted, searchExpression]);

	const newTodo = async (title) => {
		setIsLoading(true);
		try {
			const response = await fetch('http://localhost:3000/todos', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
				body: JSON.stringify({
					title: title,
				}),
			});
			const newTodo = await response.json();

			setTodos((prevTodos) => [...prevTodos, newTodo]);
			setIsLoading(false);
		} catch (error) {
			setError(error.message);
			setIsLoading(false);
		}
	};

	const delTodo = async (id) => {
		setEditedTodo(null);
		setIsEditing(false);
		setIsLoading(true);
		try {
			await fetch(`http://localhost:3000/todos/${id}`, {
				method: 'DELETE',
			});
			setTodos(todos.filter((todo) => todo.id !== id));
			setIsLoading(false);
		} catch (error) {
			setError(error.message);
			setIsLoading(false);
		}
	};

	const editTodo = async (newTitle) => {
		setIsLoading(true);
		try {
			const response = await fetch(`http://localhost:3000/todos/${editedTodo.id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
				body: JSON.stringify({
					title: newTitle,
				}),
			});
			const updatedTodo = await response.json();
			setEditedTodo(null);
			setIsEditing(false);
			setTodos(
				todos.map((curTodo) =>
					curTodo.id === updatedTodo.id ? updatedTodo : curTodo,
				),
			);
			setIsLoading(false);
		} catch (error) {
			setError(error.message);
			setIsLoading(false);
		}
	};

	const editRegime = (todo) => {
		setIsEditing(true);
		setEditedTodo(todo);
		formInputRef.current.focus();
	};

	useEffect(() => {
		loadData();
	}, [loadData]);

	return (
		<AppContext
			value={{
				isLoading,
				isEditing,
				editedTodo,
				formInputRef,
				isSorted,
				editTodo,
				newTodo,
				setIsEditing,
				setIsSorted,
				setSearchExpression,
			}}
		>
			<div className={styles.app}>
				<h1>Список задач</h1>
				<Form />
				<SearchForm />

				{isLoading ? (
					<div className={styles.loader}></div>
				) : (
					<>
						<div>
							{Object.keys(todos).length > 0 && (
								<Table
									table={table}
									todos={todos}
									setEditedTodo={setEditedTodo}
								/>
							)}
						</div>
						<div className={styles.error}>{error}</div>
					</>
				)}
			</div>
		</AppContext>
	);
};
