import styles from './SearchForm.module.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const SearchForm = () => {
	const dispatch = useDispatch();
	const isLoading = useSelector((state) => state.status.isLoading);
	const isSorted = useSelector((state) => state.filtering.isSorted);

	const [searchField, setSearchField] = useState('');

	const handleSearch = (event) => {
		event.preventDefault();
		dispatch({ type: 'SET_SEARCH_EXPRESSION', payload: searchField });
	};
	const handleReset = (event) => {
		event.preventDefault();
		setSearchField('');
		dispatch({ type: 'SET_SEARCH_EXPRESSION', payload: '' });
		dispatch({ type: 'SET_IS_SORTED', payload: false });
	};
	const handleSort = (event) => {
		event.preventDefault();
		dispatch({ type: 'SET_IS_SORTED', payload: !isSorted });
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
			<button className={styles.button} onClick={handleSearch} disabled={isLoading}>
				Отфильтровать
			</button>
			<button className={styles.button} onClick={handleReset} disabled={isLoading}>
				Сброс
			</button>
			<button
				className={isSorted ? styles.pressedButton : styles.button}
				onClick={handleSort}
				disabled={isLoading}
			>
				Сортировать
			</button>
		</form>
	);
};
