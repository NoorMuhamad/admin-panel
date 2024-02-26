import React from 'react';
import PropTypes from 'prop-types';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';

const Header = ({ setIsAddPackage, handleSearch, search }) => {
	return (
		<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px' }}>
			<Space>
				<Input
					style={{ height: '40px' }}
					placeholder="Search"
					prefix={<SearchOutlined style={{ marginRight: 8 }} />}
					allowClear
					value={search}
					onChange={handleSearch}
				/>
			</Space>
			<Button type="primary" size="large" style={{ height: '40px' }} onClick={() => setIsAddPackage(true)} icon={<PlusOutlined />}>
				Add Package
			</Button>
		</div>
	);
}

Header.propTypes = {
	setIsAddPackage: PropTypes.func.isRequired,
	handleSearch: PropTypes.func.isRequired,
	search: PropTypes.string,
};

export default Header;
