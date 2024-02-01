import { EyeOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Pagination, Space, Table } from 'antd';
import PropTypes from 'prop-types';
import { Fragment, memo } from 'react';
import { formatDate, renderEllipsisTooltip } from 'utils/password-strength';

const List = memo(({ data, totalPages, isLoading, page, limit, handlePageChange, setFormModeAndVisible, handleDeleteUser, handleSortBy }) => {
	const handleViewEditClick = (mode, initialValues) => () => setFormModeAndVisible(mode, initialValues);

	const renderColumn = (title, dataIndex) => ({
		title: renderEllipsisTooltip(title, 150),
		dataIndex,
		width: 150,
		key: dataIndex,
		render: (text) => renderEllipsisTooltip(text, 150),
		sorter: true,
		onHeaderCell: () => ({
			onClick: () => handleSortBy(dataIndex),
		}),
	});

	const columns = [
		renderColumn('ID', 'id'),
		renderColumn('FirstName', 'firstName'),
		renderColumn('LastName', 'lastName'),
		renderColumn('CNIC', 'cnic'),
		renderColumn('Password', 'password'),
		renderColumn('Email', 'email'),
		renderColumn('PhoneNumber', 'phoneNumber'),
		renderColumn('Role', 'role'),
		{
			title: renderEllipsisTooltip('JoiningDate', 150),
			dataIndex: 'createdAt',
			width: 150,
			key: 'createdAt',
			render: (text) => formatDate(text),
			sorter: true,
			onHeaderCell: () => ({
				onClick: () => handleSortBy('createdAt'),
			}),
		},
		{
			title: 'Actions',
			key: 'action',
			fixed: 'right',
			width: 150,
			align: 'center',
			render: (_, record) => (
				<Space size="middle">
					<EyeOutlined onClick={handleViewEditClick('view', record)} style={{ color: 'green' }} />
					<EditOutlined onClick={handleViewEditClick('edit', record)} style={{ color: 'blue' }} />
					<DeleteOutlined onClick={() => handleDeleteUser(record.id)} style={{ color: 'red' }} />
				</Space>
			),
		},
	];

	return (
		<Fragment>
			<Table columns={columns} dataSource={data} loading={isLoading} scroll={{ x: 'max-content', y: '65vh' }} pagination={false} height='60vh' />

			<Pagination
				current={page}
				pageSize={limit}
				onChange={handlePageChange}
				total={totalPages * 10}
				showQuickJumper
				showSizeChanger
				showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
				style={{ padding: '10px', textAlign: 'right', position: 'sticky', bottom: 0 }}
			/>
		</Fragment>
	);
});

List.propTypes = {
	setFormModeAndVisible: PropTypes.func.isRequired,
	handleDeleteUser: PropTypes.func.isRequired,
	totalPages: PropTypes.number.isRequired,
	page: PropTypes.number.isRequired,
	limit: PropTypes.number.isRequired,
	isLoading: PropTypes.bool.isRequired,
	data: PropTypes.arrayOf(PropTypes.object).isRequired,
	handleSortBy: PropTypes.func.isRequired,
	handlePageChange: PropTypes.func.isRequired,
};

export default List;