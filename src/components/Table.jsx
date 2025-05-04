import TableBody from './TableBody';
import TableHeader from './TableHeader';
import PropTypes from 'prop-types';

const Table = ({ table }) => {
	return (
		<table>
			<TableHeader table={table} />
			<TableBody table={table} />
		</table>
	);
};

export default Table;

Table.propTypes = {
	table: PropTypes.object,
};
