import { CheckCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Space, Table } from 'antd';
import PropTypes from 'prop-types';

const data = [];

const List = ({ setIsViewComplaint, setIsEditComplaint, handleDeleteComplaint }) => {

	const handleViewClick = () => {
		setIsViewComplaint(true);
	};

	const handleEditClick = () => {
		setIsEditComplaint(true);
	};

	const columns = [
		{
			title: 'ID',
			width: 100,
			dataIndex: 'id',
			key: 'name',
		},
		{
			title: 'Subject',
			width: 100,
			dataIndex: 'Subject',
			key: 'name',
		},
		{
			title: 'Actions',
			key: 'action',
			fixed: 'right',
			width: 100,
			align: 'center',
			render: () => (
				<Space size="middle">
					<CheckCircleOutlined onClick={handleViewClick} />
					<EditOutlined onClick={handleEditClick} />
					<DeleteOutlined onClick={handleDeleteComplaint} />
				</Space>
			),
		},
	];
	return (
		<Table
			columns={columns}
			dataSource={data}
			scroll={{
				x: 'max-content',
				y: '60vh',
			}}
		/>

	)
}

List.propTypes = {
	setIsViewComplaint: PropTypes.func.isRequired,
	setIsEditComplaint: PropTypes.func.isRequired,
	handleDeleteComplaint: PropTypes.func.isRequired
};

export default List