import React from 'react';
import PropTypes from 'prop-types';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';

const Header = ({ setIsAddComplaint }) => {
	return (
		<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px' }}>
			<Space>
				<Input
					style={{ height: '40px' }}
					placeholder="Search"
					prefix={<SearchOutlined style={{ marginRight: 8 }} />}
					allowClear
				// onSearch={onSearch}
				/>
			</Space>
			<Button type="primary" size="large" style={{ height: '40px' }} onClick={() => setIsAddComplaint(true)}>
				Add Complaint
			</Button>
		</div>
	);
}

Header.propTypes = {
	setIsAddComplaint: PropTypes.func.isRequired,
};

export default Header;
