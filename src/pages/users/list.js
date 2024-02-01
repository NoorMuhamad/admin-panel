import { CheckCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Pagination, Space, Table } from 'antd';
import PropTypes from 'prop-types';
import { Fragment, memo } from 'react';
import { formatDate, renderEllipsisTooltip } from 'utils/password-strength';

const List = memo(({ data, totalPages, currentPage, isLoading, setFormModeAndVisible, handleDeleteUser }) => {
	const handleViewEditClick = (mode, initialValues) => () => setFormModeAndVisible(mode, initialValues);

	const renderColumn = (title, dataIndex) => ({
		title: renderEllipsisTooltip(title, 150),
		dataIndex,
		width: 150,
		key: dataIndex,
		render: (text) => renderEllipsisTooltip(text, 150),
		sorter: (a, b) => a.name.length - b.name.length,
	});

	const columns = [
		renderColumn('ID', 'id'),
		renderColumn('FirstName', 'firstName'),
		renderColumn('LastName', 'lastName'),
		renderColumn('CNIC', 'cnic'),
		renderColumn('Password', 'password'),
		renderColumn('Email', 'email'),
		renderColumn('PhoneNumber', 'phoneNumber'),
		{
			title: renderEllipsisTooltip('JoiningDate', 150),
			dataIndex: 'createdAt',
			width: 150,
			key: 'createdAt',
			render: (text) => formatDate(text),
			sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
		},
		renderColumn('Role', 'role'),
		{
			title: 'Actions',
			key: 'action',
			fixed: 'right',
			width: 150,
			align: 'center',
			render: (_, record) => (
				<Space size="middle">
					<CheckCircleOutlined onClick={handleViewEditClick('view', record)} />
					<EditOutlined onClick={handleViewEditClick('edit', record)} />
					<DeleteOutlined onClick={() => handleDeleteUser(record.id)} />
				</Space>
			),
		},
	];

	return (
		<Fragment>
			<Table columns={columns} dataSource={data} loading={isLoading} scroll={{ x: 'max-content', y: '60vh' }} pagination={false} />
			{totalPages > 1 && (
				<Pagination
					current={currentPage}
					total={totalPages * 10}
					showQuickJumper
					showSizeChanger
					showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} users`}
					style={{ padding: '10px', textAlign: 'right' }}
				/>
			)}
		</Fragment>
	);
});

List.propTypes = {
	setFormModeAndVisible: PropTypes.func.isRequired,
	handleDeleteUser: PropTypes.func.isRequired,
	totalPages: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	isLoading: PropTypes.bool.isRequired,
	data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default List;
