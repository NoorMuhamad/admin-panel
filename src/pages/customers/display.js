import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useState } from 'react';


const createData = (id, firstName, lastName, email, phoneNumber, address, joinDate) => ({
	id,
	firstName,
	lastName,
	email,
	phoneNumber,
	address,
	joinDate,
});

const rows = Array.from({ length: 20 }, () =>
	createData(
		'077c8ffd-9be1-4fff-ac00-a4c753a8d1b6',
		'Ali',
		'Arslan',
		'arslan@gmail.com',
		'+923008772984',
		'Test Town Test Road Test city Test',
		'19-10-2018'
	)
);

const headCells = [
	{ id: 'id', label: 'Id' },
	{ id: 'firstName', label: 'First Name' },
	{ id: 'lastName', label: 'Last Name' },
	{ id: 'email', label: 'Email' },
	{ id: 'phoneNumber', label: 'Phone Number' },
	{ id: 'address', label: 'Address' },
	{ id: 'joinDate', label: 'Join Date' },
];

const List = () => {
	const [order, setOrder] = useState('asc');
	const [orderBy, setOrderBy] = useState('id');
	const [selected, setSelected] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [visibleColumns, setVisibleColumns] = useState(
		headCells.map((headCell) => headCell.id)
	);

	const [anchorEl, setAnchorEl] = useState(null);

	const handleMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleToggleColumn = (columnId) => {
		setVisibleColumns((prevVisibleColumns) =>
			prevVisibleColumns.includes(columnId)
				? prevVisibleColumns.filter((id) => id !== columnId)
				: [...prevVisibleColumns, columnId]
		);
	};

	const handleRequestSort = (property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleSelectAllClick = (event) => {
		setSelected(event.target.checked ? rows.map((n) => n.id) : []);
	};

	const handleClick = (event, id) => {
		setSelected((prevSelected) => {
			const selectedIndex = prevSelected.indexOf(id);
			return selectedIndex === -1
				? [...prevSelected, id]
				: [...prevSelected.slice(0, selectedIndex), ...prevSelected.slice(selectedIndex + 1)];
		});
	};

	const handleChangePage = (_, newPage) => setPage(newPage);

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const isSelected = (id) => selected.indexOf(id) !== -1;

	const StyledTableHead = styled(TableHead)({
		position: 'sticky',
		top: 0,
		zIndex: 1,
		background: 'rgb(250, 250, 250)',
		borderTop: '1px solid rgb(240, 240, 240)',
		borderBottom: '2px solid rgb(240, 240, 240)',
	});

	const CustomTableCell = styled(TableCell)({
		'&:first-child': {
			padding: 'checkbox',
		},
	});

	const CustomTableSortLabel = styled(TableSortLabel)({
		'&:hover': {
			cursor: 'pointer',
		},
	});

	const CustomTooltip = styled(Tooltip)({
		whiteSpace: 'nowrap',
	});

	const CustomCheckbox = styled(Checkbox)({
		padding: '0',
	});

	const HeaderLabel = styled(Typography)({
		fontWeight: 700,
		textTransform: 'uppercase',
	});

	return (
		<Paper>
			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px' }}>
				<div>
					<Button
						onClick={handleMenuOpen}
						variant="contained" size="medium"
					>
						Columns
					</Button>
					<Menu
						anchorEl={anchorEl}
						open={Boolean(anchorEl)}
						onClose={handleMenuClose}
					>
						<MenuItem>
							<Typography variant="body2" style={{ fontWeight: 'bold' }}>
								Select All
							</Typography>
							<Typography variant="body2" style={{ fontWeight: 'bold' }}>
								Select None
							</Typography>
						</MenuItem>
						{headCells.map((headCell) => (
							<MenuItem key={headCell.id}>
								<FormControlLabel
									control={
										<Switch
											checked={visibleColumns.includes(headCell.id)}
											onChange={() => handleToggleColumn(headCell.id)}
											color="primary"
										/>
									}
									label={headCell.label}
								/>
							</MenuItem>
						))}
					</Menu>
				</div>
			</div>
			<TableContainer style={{ height: `${rowsPerPage === 5 ? 45 : 72}vh`, overflowY: 'auto' }}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<StyledTableHead>
						<TableRow>
							<CustomTableCell>
								<CustomCheckbox
									indeterminate={selected.length > 0 && selected.length < rows.length}
									checked={selected.length === rows.length}
									onChange={handleSelectAllClick}
								/>
							</CustomTableCell>
							{headCells.map(
								(headCell) =>
									visibleColumns.includes(headCell.id) && (
										<CustomTableCell key={headCell.id} align="left">
											<CustomTableSortLabel
												active={orderBy === headCell.id}
												direction={orderBy === headCell.id ? order : 'asc'}
												onClick={() => handleRequestSort(headCell.id)}
											>
												<CustomTooltip title={headCell.label} placement="bottom">
													<HeaderLabel variant="subtitle2" noWrap>
														{headCell.label}
													</HeaderLabel>
												</CustomTooltip>
											</CustomTableSortLabel>
										</CustomTableCell>
									)
							)}
						</TableRow>
					</StyledTableHead>
					<TableBody>
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
									<Checkbox checked={isSelected(row.id)} onChange={(event) => handleClick(event, row.id)} />
								</TableCell>
								{headCells.map(
									(cell) =>
										visibleColumns.includes(cell.id) && (
											<TableCell key={cell.id}>{row[cell.id]}</TableCell>
										)
								)}
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

export default List;