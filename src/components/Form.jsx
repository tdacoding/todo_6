import styles from './Form.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newTodo, editTodo } from '../actions/todosReducerActions';
import PropTypes from 'prop-types';

export const Form = ({ formInputRef }) => {
	const dispatch = useDispatch();
	const isLoading = useSelector((state) => state.status.isLoading);
	const editedTodo = useSelector((state) => state.todosReducer.editedTodo);
	const isEditing = useSelector((state) => state.todosReducer.isEditing);

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
		isEditing ? dispatch(editTodo(titleField)) : dispatch(newTodo(titleField));
		setTitleField('');
	};

	const cancel = (event) => {
		event.preventDefault();
		setTitleField('');
		dispatch({ type: 'SET_IS_EDITING', payload: false });
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
	formInputRef: PropTypes.object,
};
