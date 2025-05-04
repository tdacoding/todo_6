import styles from './Form.module.css';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newTodo, editTodo } from '../actions/todosReducerActions';

export const Form = () => {
	const dispatch = useDispatch();
	const isLoading = useSelector((state) => state.status.isLoading);
	const editedTodo = useSelector((state) => state.editingReducer.editedTodo);
	const isEditing = useSelector((state) => state.editingReducer.isEditing);
	const inputFocus = useSelector((state) => state.editingReducer.inputFocus);

	const formInputRef = useRef(null);

	useEffect(() => {
		if (inputFocus) {
			formInputRef.current.focus();
			dispatch({ type: 'SET_INPUT_FOCUS', payload: false });
		}
	}, [inputFocus, dispatch]);

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
