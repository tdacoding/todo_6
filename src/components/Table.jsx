import TableBody from './TableBody';
import TableHeader from './TableHeader';
import PropTypes from 'prop-types';

const Table = ({ table, todos, setEditedTodo }) => {
	return (
		<table>
			<TableHeader table={table} />
			<TableBody todos={todos} table={table} setEditedTodo={setEditedTodo} />
		</table>
	);
};

export default Table;

Table.propTypes = {
	table: PropTypes.object,
	todos: PropTypes.array,
	setEditedTodo: PropTypes.func,
};
