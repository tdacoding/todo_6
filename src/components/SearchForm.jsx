import styles from './SearchForm.module.css';
import { useState } from 'react';
import PropTypes from 'prop-types';

export const SearchForm = ({ isLoading, isSorted, setIsSorted, setSearchExpression }) => {
	const [searchField, setSearchField] = useState('');

	const handleSearch = (event) => {
		event.preventDefault();
		setSearchExpression(searchField);
	};
	const handleReset = (event) => {
		event.preventDefault();
		setSearchField('');
		setSearchExpression('');
		setIsSorted(false);
	};
	const handleSort = (event) => {
		event.preventDefault();
		setIsSorted(!isSorted);
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

SearchForm.propTypes = {
	isLoading: PropTypes.bool,
	isSorted: PropTypes.bool,
	setSearchExpression: PropTypes.func,
	setIsSorted: PropTypes.func,
};
