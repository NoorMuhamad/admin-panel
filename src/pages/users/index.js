import React, { useState } from 'react';
import { Table, Tag, Space } from 'antd';
import { EditOutlined, DeleteOutlined, SyncOutlined, CheckCircleOutlined } from '@ant-design/icons';
const columns = [
	{
		title: '#',
		dataIndex: 'key',
		key: 'key',
		sorter: (a, b) => a.age - b.age,
	},
	// {
	// 	title: 'User Info',
	// 	dataIndex: 'userInfo',
	// 	key: 'userInfo',
	// 	sorter: (a, b) => a.userInfo - b.userInfo,
	// 	render: (text, record) => (
	// 		<Space direction="vertical">
	// 			<Space style={{ fontSize: '12px' }}>
	// 				<img
	// 					src={record.avatar}
	// 					alt="avatar"
	// 					style={{ borderRadius: '50%', width: 15, height: 15 }}
	// 				/>
	// 				<span style={{ fontSize: '12px' }}>{text}</span>
	// 			</Space>
	// 			<a href={`mailto:${record.email}`} style={{ fontSize: '12px' }}>
	// 				{record.email}
	// 			</a>
	// 		</Space>
	// 	),
	// },
	{
		title: 'Contact',
		dataIndex: 'contact',
		key: 'contact',
		sorter: (a, b) => a.contact - b.contact,
	},
	{
		title: 'Age',
		dataIndex: 'age',
		key: 'age',
		sorter: (a, b) => a.age - b.age,
	},
	{
		title: 'Country',
		dataIndex: 'country',
		key: 'country',
		sorter: (a, b) => a.country - b.country,
	},
	{
		title: 'Status',
		key: 'status',
		dataIndex: 'status',

		width: 100,
		sorter: (a, b) => a.status - b.status,
		render: (status) => {
			let color = 'green';
			if (status === 'Pending') {
				color = 'geekblue';
			} else if (status === 'Rejected') {
				color = 'volcano';
			}
			return (
				<Tag color={color} key={status}>
					{status.toUpperCase()}
				</Tag>
			);
		},
	},
	{
		title: 'Actions',
		key: 'action',
		fixed: 'right',
		align: 'center',// You can keep this line if you want the column fixed to the right
		render: (_, record) => (
			<Space size="middle" >
				<a><CheckCircleOutlined /></a>
				<a><EditOutlined /></a>
				<a><DeleteOutlined /></a>
				{record.status === 'Pending' && <a><SyncOutlined spin /></a>}
			</Space>
		),
	},
];

const data = [
	{
		key: '1',
		userInfo: 'Gabriel Green',
		contact: '+1 (457) 348-4705',
		age: 63,
		country: 'Kyrgyzstan',
		status: 'Verified',
		avatar: 'path_to_avatar_image',
		email: 'nizcanu@gmail.com',
	},
	{
		key: '1',
		userInfo: 'Gabriel Green',
		contact: '+1 (457) 348-4705',
		age: 63,
		country: 'Kyrgyzstan',
		status: 'Verified',
		avatar: 'path_to_avatar_image', // Replace with actual image path
		email: 'nizcanu@gmail.com',
	},
	{
		key: '1',
		userInfo: 'Gabriel Green',
		contact: '+1 (457) 348-4705',
		age: 63,
		country: 'Kyrgyzstan',
		status: 'Verified',
		avatar: 'path_to_avatar_image', // Replace with actual image path
		email: 'nizcanu@gmail.com',
	},
	{
		key: '1',
		userInfo: 'Gabriel Green',
		contact: '+1 (457) 348-4705',
		age: 63,
		country: 'Kyrgyzstan',
		status: 'Verified',
		avatar: 'path_to_avatar_image', // Replace with actual image path
		email: 'nizcanu@gmail.com',
	},
	{
		key: '1',
		userInfo: 'Gabriel Green',
		contact: '+1 (457) 348-4705',
		age: 63,
		country: 'Kyrgyzstan',
		status: 'Verified',
		avatar: 'path_to_avatar_image', // Replace with actual image path
		email: 'nizcanu@gmail.com',
	},
	{
		key: '1',
		userInfo: 'Gabriel Green',
		contact: '+1 (457) 348-4705',
		age: 63,
		country: 'Kyrgyzstan',
		status: 'Verified',
		avatar: 'path_to_avatar_image', // Replace with actual image path
		email: 'nizcanu@gmail.com',
	},
	{
		key: '1',
		userInfo: 'Gabriel Green',
		contact: '+1 (457) 348-4705',
		age: 63,
		country: 'Kyrgyzstan',
		status: 'Verified',
		avatar: 'path_to_avatar_image', // Replace with actual image path
		email: 'nizcanu@gmail.com',
	},
	{
		key: '1',
		userInfo: 'Gabriel Green',
		contact: '+1 (457) 348-4705',
		age: 63,
		country: 'Kyrgyzstan',
		status: 'Verified',
		avatar: 'path_to_avatar_image', // Replace with actual image path
		email: 'nizcanu@gmail.com',
	},

	{
		key: '1',
		userInfo: 'Gabriel Green',
		contact: '+1 (457) 348-4705',
		age: 63,
		country: 'Kyrgyzstan',
		status: 'Verified',
		avatar: 'path_to_avatar_image',
		email: 'nizcanu@gmail.com',
	},
	{
		key: '1',
		userInfo: 'Gabriel Green',
		contact: '+1 (457) 348-4705',
		age: 63,
		country: 'Kyrgyzstan',
		status: 'Verified',
		avatar: 'path_to_avatar_image', // Replace with actual image path
		email: 'nizcanu@gmail.com',
	},
	{
		key: '1',
		userInfo: 'Gabriel Green',
		contact: '+1 (457) 348-4705',
		age: 63,
		country: 'Kyrgyzstan',
		status: 'Verified',
		avatar: 'path_to_avatar_image', // Replace with actual image path
		email: 'nizcanu@gmail.com',
	},
	{
		key: '1',
		userInfo: 'Gabriel Green',
		contact: '+1 (457) 348-4705',
		age: 63,
		country: 'Kyrgyzstan',
		status: 'Verified',
		avatar: 'path_to_avatar_image', // Replace with actual image path
		email: 'nizcanu@gmail.com',
	},
	{
		key: '1',
		userInfo: 'Gabriel Green',
		contact: '+1 (457) 348-4705',
		age: 63,
		country: 'Kyrgyzstan',
		status: 'Verified',
		avatar: 'path_to_avatar_image', // Replace with actual image path
		email: 'nizcanu@gmail.com',
	},
	{
		key: '1',
		userInfo: 'Gabriel Green',
		contact: '+1 (457) 348-4705',
		age: 63,
		country: 'Kyrgyzstan',
		status: 'Verified',
		avatar: 'path_to_avatar_image', // Replace with actual image path
		email: 'nizcanu@gmail.com',
	},
	{
		key: '1',
		userInfo: 'Gabriel Green',
		contact: '+1 (457) 348-4705',
		age: 63,
		country: 'Kyrgyzstan',
		status: 'Verified',
		avatar: 'path_to_avatar_image', // Replace with actual image path
		email: 'nizcanu@gmail.com',
	},
	{
		key: '1',
		userInfo: 'Gabriel Green',
		contact: '+1 (457) 348-4705',
		age: 63,
		country: 'Kyrgyzstan',
		status: 'Verified',
		avatar: 'path_to_avatar_image', // Replace with actual image path
		email: 'nizcanu@gmail.com',
	},
];

const Users = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(5); // Default page size

	const handleTableChange = (pagination) => {
		// When table pagination is changed, update the state
		setCurrentPage(pagination.current);
		setPageSize(pagination.pageSize);
	};

	return (
		<>
			<Table
				columns={columns}
				dataSource={data}
				pagination={{
					current: currentPage,
					pageSize: pageSize,
					onChange: (page, pageSize) => {
						setCurrentPage(page);
						setPageSize(pageSize);
					},
				}}
				onChange={handleTableChange}
				scroll={{
					y: '65vh',
					x: 1200,
				}}
			/>
		</>
	);
};

export default Users;
