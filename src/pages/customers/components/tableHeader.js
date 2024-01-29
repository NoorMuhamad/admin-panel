import React from 'react';
import { styled } from '@mui/material/styles';
import { TableHead, TableRow, TableCell, Checkbox, TableSortLabel, Typography, Tooltip } from '@mui/material';

const EllipsisText = styled(Typography)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

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

const TableHeader = ({ headCells, selected, rows, orderBy, order, handleSelectAllClick, handleRequestSort }) => (
	<StyledTableHead>
		<TableRow>
			<CustomTableCell>
				<CustomCheckbox
					indeterminate={selected.length > 0 && selected.length < rows.length}
					checked={selected.length === rows.length}
					onChange={handleSelectAllClick}
				/>
			</CustomTableCell>
			{headCells.map((headCell) => (
				<CustomTableCell key={headCell.id} align="left">
					<CustomTableSortLabel
						active={orderBy === headCell.id}
						direction={orderBy === headCell.id ? order : 'asc'}
						onClick={() => handleRequestSort(headCell.id)}
					>
						<CustomTooltip title={headCell.label} placement="bottom">
							<EllipsisText variant="subtitle2" noWrap>
								{headCell.label}
							</EllipsisText>
						</CustomTooltip>
					</CustomTableSortLabel>
				</CustomTableCell>
			))}
		</TableRow>
	</StyledTableHead>
);

export default TableHeader;
