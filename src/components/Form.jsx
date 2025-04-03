import styles from './Form.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { fieldsSchema } from '../data/validationConfig';

export const Form = ({ requestAddTodo, isCreating }) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			title: '',
		},
		resolver: yupResolver(fieldsSchema),
		mode: 'onChange',
	});

	const sendFormData = (newTodo) => {
		console.log(newTodo);
		requestAddTodo(newTodo.title);
	};

	const error = errors.title?.message;

	return (
		<form className={styles.form} onSubmit={handleSubmit(sendFormData)}>
			<input
				className={styles.input}
				name="title"
				type="text"
				placeholder="Новая задача"
				autoComplete="off"
				{...register('title')}
			/>
			{error && <div className={styles.error}>{error}</div>}

			<button
				className={styles.button}
				type="submit"
				disabled={!isValid || isCreating}
			>
				Добавить задачу
			</button>
		</form>
	);
};
