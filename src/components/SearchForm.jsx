import styles from './SearchForm.module.css';
import { useState } from 'react';

export const SearchForm = ({ todos, setTodos, reset, setReset }) => {
	const [searchField, setSearchField] = useState('');
	const [isPressed, setIsPressed] = useState(false);

	const handleSearch = (event) => {
		event.preventDefault();
		setTodos(todos.filter((todo) => todo.title.includes(searchField)));
	};
	const handleReset = (event) => {
		event.preventDefault();
		setSearchField('');
		setReset(!reset);
		setIsPressed(false);
	};
	const handleSort = (event) => {
		event.preventDefault();
		setIsPressed(!isPressed);
		isPressed
			? setTodos([...todos].sort((a, b) => a.id - b.id))
			: setTodos([...todos].sort((a, b) => a.title.localeCompare(b.title)));
	};

	return (
		<form className={styles.form}>
			<input
				className={styles.input}
				name="search"
				type="text"
				value={searchField}
				onChange={(event) => setSearchField(event.target.value)}
				placeholder="Поиск"
				autoComplete="off"
			/>
			<button className={styles.button} onClick={handleSearch}>
				Отфильтровать
			</button>
			<button className={styles.button} onClick={handleReset}>
				Сброс
			</button>
			<button
				className={isPressed ? styles.pressedButton : styles.button}
				onClick={handleSort}
			>
				Сортировать
			</button>
		</form>
	);
};
