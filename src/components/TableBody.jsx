const TableBody = ({ todos, table }) => {
	const renderContent = (todo, column) => {
		if (table[column].component) {
			const component = table[column].component;
			if (typeof component === 'function') {
				return component(todo.id);
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
