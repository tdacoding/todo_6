import TableBody from './TableBody';
import TableHeader from './TableHeader';

const Table = ({ table, todos, setEditedTodo }) => {
	return (
		<table>
			<TableHeader table={table} />
			<TableBody todos={todos} table={table} setEditedTodo={setEditedTodo} />
		</table>
	);
};

export default Table;
