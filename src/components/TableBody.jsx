import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const TableBody = ({ table }) => {
	const todos = useSelector((state) => state.todosReducer.todos);
	const renderContent = (todo, column) => {
		if (table[column].component) {
			const component = table[column].component;
			if (typeof component === 'function') {
				return component(todo);
			}
		} else {
			return todo[column];
		}
	};
	return (
		<tbody>
			{todos.map((todo) => {
				return (
					<tr key={todo.id}>
						{Object.keys(table).map((column) => {
							return <td key={column}>{renderContent(todo, column)}</td>;
						})}
					</tr>
				);
			})}
		</tbody>
	);
};

export default TableBody;

TableBody.propTypes = {
	table: PropTypes.object,
};
