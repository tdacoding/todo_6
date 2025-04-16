import styles from './Form.module.css';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const Form = ({
	request,
	isLoading,
	isEditing,
	editedTodo,
	setIsEditing,
	formInputRef,
}) => {
	const [titleField, setTitleField] = useState('');

	useEffect(() => {
		if (isEditing) {
			setTitleField(editedTodo.title);
		} else {
			setTitleField('');
		}
	}, [isEditing, editedTodo]);

	const sendData = (event) => {
		event.preventDefault();
		request(titleField);
		setTitleField('');
	};

	const cancel = (event) => {
		event.preventDefault();
		setTitleField('');
		setIsEditing(false);
	};

	return (
		<form className={styles.form}>
			<input
				className={styles.input}
				name="title"
				type="text"
				placeholder="Новая задача"
				autoComplete="off"
				ref={formInputRef}
				value={titleField}
				onChange={(event) => setTitleField(event.target.value)}
			/>

			<button
				className={styles.button}
				onClick={sendData}
				disabled={titleField.length == 0 || isLoading}
			>
				{isEditing ? 'Сохранить изменения' : 'Добавить задачу'}
			</button>
			<button
				className={styles.button}
				onClick={cancel}
				disabled={!isEditing ? titleField.length == 0 || isLoading : ''}
			>
				Отмена
			</button>
		</form>
	);
};

Form.propTypes = {
	request: PropTypes.func,
	isLoading: PropTypes.bool,
	isEditing: PropTypes.bool,
	editedTodo: PropTypes.object,
	setIsEditing: PropTypes.func,
	formInputRef: PropTypes.object,
};
