import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import Checkbox from '@mui/material/Checkbox';
import TableSortLabel from '@mui/material/TableSortLabel';

function createData(id, firstName, lastName, email, phoneNumber, address, joinDate) {
	return { id, firstName, lastName, email, phoneNumber, address, joinDate };
}


const rows = [
	createData('077c8ffd-9be1-4fff-ac00-a4c753a8d1b6', 'Ali', 'Arslan', 'arslan@gmail.com', '+923008772984', 'Test Town Test Road Test city Test', '19-10-2018'),
	createData('077c8ffd-9be1-4fff-ac00-a4c753a8d1b6', 'Ali', 'Arslan', 'arslan@gmail.com', '+923008772984', 'Test Town Test Road Test city Test', '19-10-2018'),
	createData('077c8ffd-9be1-4fff-ac00-a4c753a8d1b6', 'Ali', 'Arslan', 'arslan@gmail.com', '+923008772984', 'Test Town Test Road Test city Test', '19-10-2018'),
	createData('077c8ffd-9be1-4fff-ac00-a4c753a8d1b6', 'Ali', 'Arslan', 'arslan@gmail.com', '+923008772984', 'Test Town Test Road Test city Test', '19-10-2018'),
	createData('077c8ffd-9be1-4fff-ac00-a4c753a8d1b6', 'Ali', 'Arslan', 'arslan@gmail.com', '+923008772984', 'Test Town Test Road Test city Test', '19-10-2018'),
	createData('077c8ffd-9be1-4fff-ac00-a4c753a8d1b6', 'Ali', 'Arslan', 'arslan@gmail.com', '+923008772984', 'Test Town Test Road Test city Test', '19-10-2018'),
	createData('077c8ffd-9be1-4fff-ac00-a4c753a8d1b6', 'Ali', 'Arslan', 'arslan@gmail.com', '+923008772984', 'Test Town Test Road Test city Test', '19-10-2018'),
	createData('077c8ffd-9be1-4fff-ac00-a4c753a8d1b6', 'Ali', 'Arslan', 'arslan@gmail.com', '+923008772984', 'Test Town Test Road Test city Test', '19-10-2018'),
	createData('077c8ffd-9be1-4fff-ac00-a4c753a8d1b6', 'Ali', 'Arslan', 'arslan@gmail.com', '+923008772984', 'Test Town Test Road Test city Test', '19-10-2018'),
	createData('077c8ffd-9be1-4fff-ac00-a4c753a8d1b6', 'Ali', 'Arslan', 'arslan@gmail.com', '+923008772984', 'Test Town Test Road Test city Test', '19-10-2018'),
	createData('077c8ffd-9be1-4fff-ac00-a4c753a8d1b6', 'Ali', 'Arslan', 'arslan@gmail.com', '+923008772984', 'Test Town Test Road Test city Test', '19-10-2018'),
	createData('077c8ffd-9be1-4fff-ac00-a4c753a8d1b6', 'Ali', 'Arslan', 'arslan@gmail.com', '+923008772984', 'Test Town Test Road Test city Test', '19-10-2018'),
	createData('077c8ffd-9be1-4fff-ac00-a4c753a8d1b6', 'Ali', 'Arslan', 'arslan@gmail.com', '+923008772984', 'Test Town Test Road Test city Test', '19-10-2018'),
	createData('077c8ffd-9be1-4fff-ac00-a4c753a8d1b6', 'Ali', 'Arslan', 'arslan@gmail.com', '+923008772984', 'Test Town Test Road Test city Test', '19-10-2018'),
	createData('077c8ffd-9be1-4fff-ac00-a4c753a8d1b6', 'Ali', 'Arslan', 'arslan@gmail.com', '+923008772984', 'Test Town Test Road Test city Test', '19-10-2018'),
	createData('077c8ffd-9be1-4fff-ac00-a4c753a8d1b6', 'Ali', 'Arslan', 'arslan@gmail.com', '+923008772984', 'Test Town Test Road Test city Test', '19-10-2018'),
	createData('077c8ffd-9be1-4fff-ac00-a4c753a8d1b6', 'Ali', 'Arslan', 'arslan@gmail.com', '+923008772984', 'Test Town Test Road Test city Test', '19-10-2018'),
	createData('077c8ffd-9be1-4fff-ac00-a4c753a8d1b6', 'Ali', 'Arslan', 'arslan@gmail.com', '+923008772984', 'Test Town Test Road Test city Test', '19-10-2018'),
	createData('077c8ffd-9be1-4fff-ac00-a4c753a8d1b6', 'Ali', 'Arslan', 'arslan@gmail.com', '+923008772984', 'Test Town Test Road Test city Test', '19-10-2018'),
	createData('077c8ffd-9be1-4fff-ac00-a4c753a8d1b6', 'Ali', 'Arslan', 'arslan@gmail.com', '+923008772984', 'Test Town Test Road Test city Test', '19-10-2018'),
];


const headCells = [
	{ id: 'id', label: 'Id' },
	{ id: 'firstName', label: 'First Name' },
	{ id: 'lastName', label: 'Last Name' },
	{ id: 'email', label: 'Email' },
	{ id: 'phoneNumber', label: 'Phone Number' },
	{ id: 'address', label: 'Address' },
	{ id: 'joinDate', label: 'Join Date' },
];

const Customers = () => {
	const [order, setOrder] = React.useState('asc');
	const [orderBy, setOrderBy] = React.useState('id');
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	const handleRequestSort = (property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelecteds = rows.map((n) => n.id);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event, id) => {
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}

		setSelected(newSelected);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const isSelected = (id) => selected.indexOf(id) !== -1;

	const tableContainerStyle = {
		height: `${rowsPerPage === 5 ? 45 : 71}vh`,
		overflowY: 'auto',
	};

	return (
		<Paper>
			<TableContainer style={tableContainerStyle}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead style={{ position: 'sticky', top: 0, background: 'white', zIndex: 1 }}>
						<TableRow>
							<TableCell padding="checkbox">
								<Checkbox
									indeterminate={selected.length > 0 && selected.length < rows.length}
									checked={selected.length === rows.length}
									onChange={handleSelectAllClick}
								/>
							</TableCell>
							{headCells.map((headCell) => (
								<TableCell
									key={headCell.id}
									align="left"
									sortDirection={orderBy === headCell.id ? order : false}
								>
									<TableSortLabel
										active={orderBy === headCell.id}
										direction={orderBy === headCell.id ? order : 'asc'}
										onClick={() => handleRequestSort(headCell.id)}
									>
										{headCell.label}
									</TableSortLabel>
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{/* Your existing code for rendering rows goes here */}
						{(rowsPerPage > 0
							? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							: rows
						).map((row) => (
							<TableRow
								key={row.id}
								selected={isSelected(row.id)}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell padding="checkbox">
									<Checkbox
										checked={isSelected(row.id)}
										onChange={(event) => handleClick(event, row.id)}
									/>
								</TableCell>
								<TableCell component="th" scope="row">
									{row.id}
								</TableCell>
								<TableCell >{row.firstName}</TableCell>
								<TableCell >{row.lastName}</TableCell>
								<TableCell >{row.email}</TableCell>
								<TableCell >{row.phoneNumber}</TableCell>
								<TableCell >{row.address}</TableCell>
								<TableCell >{row.joinDate}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
				component="div"
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Paper>
	);
};

export default Customers;