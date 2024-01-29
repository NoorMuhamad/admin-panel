import Paper from '@mui/material/Paper';
import List from './display';
import { SearchOutlined } from '@ant-design/icons';
import React from 'react';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const Customers = () => {

	const [searchTerm, setSearchTerm] = React.useState('');

	const handleSearch = (event) => {
		setSearchTerm(event.target.value);
	};

	const StyledContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

	const StyledSearchContainer = styled('div')`
  display: inline-flex;
  align-items: center;
  padding: 8px;
  width: 260px;
  border: 1px solid grey;
  margin-left: 12px;
`;

	const StyledInputBase = styled(InputBase)`
  margin-right: 8px;
`;

	const StyledButton = styled(Button)`
  margin-right: 12px;
`

	return (
		<Paper>
			<StyledContainer>
				<StyledSearchContainer>
					<SearchOutlined />
					<StyledInputBase
						placeholder="Search..."
						value={searchTerm}
						onChange={handleSearch}
					/>
				</StyledSearchContainer>
				<StyledButton variant="contained" size="medium">
					Add Customer
				</StyledButton>
			</StyledContainer>
			<List />
		</Paper>
	);
};

export default Customers;