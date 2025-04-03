import * as yup from 'yup';

export const fieldsSchema = yup.object().shape({
	title: yup.string().min(1, 'Задача не может быть пустой'),
});
