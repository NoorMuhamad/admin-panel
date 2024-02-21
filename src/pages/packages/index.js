import React, { useState } from 'react';
import { Card, Col, Row, Modal, Form, Input, Switch, notification, Button, Tooltip } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import '../../themes/css/packages/index.css'; // Make sure to import the CSS file

const packagePatterns = ['#f0d9d9', '#d9f0d9', '#f9f6cf'];

const generatePattern = (index) => {
	return packagePatterns[index % packagePatterns.length];
};

const initialPackages = [
	{ id: 1, title: "Basic Package", content: "Ideal for beginners.", price: "$99", isActive: true },
	{ id: 2, title: "Standard Package", content: "A perfect package for regular users.", price: "$199", isActive: false },
];

const Packages = () => {
	const [packages, setPackages] = useState(initialPackages);
	const [isModalVisible, setIsModalVisible] = useState(false);

	const showModal = () => setIsModalVisible(true);
	const handleCancel = () => setIsModalVisible(false);
	const handleEdit = (id) => {
		// Implement your edit functionality here
		console.log('Editing package with id:', id);
	};
	const handleDelete = (id) => {
		// Implement your delete functionality here
		console.log('Deleting package with id:', id);
	};

	const onFinish = (values) => {
		setPackages([...packages, { ...values, isActive: values.isActive ? true : false }]);
		setIsModalVisible(false);
		notification.success({ message: 'Package added successfully!' });
	};

	return (
		<>
			<Row gutter={[16, 16]}>
				{packages.map((pkg, index) => (
					<Col key={pkg.id} xs={24} sm={12} md={8} lg={6} xl={6}>
						<Card
							className="cardHoverEffect"
							title={pkg.title}
							bordered={false}
							style={{ background: generatePattern(index), minHeight: '200px' }}
						>
							<div className="iconContainer">
								<Tooltip title="Edit">
									<EditOutlined onClick={() => handleEdit(pkg.id)} style={{ marginRight: 8, fontSize: '18px', color: 'blue' }} />
								</Tooltip>
								<Tooltip title="Delete">
									<DeleteOutlined onClick={() => handleDelete(pkg.id)} style={{ marginRight: 8, fontSize: '18px', color: 'red' }} />
								</Tooltip>
							</div>
							<div style={{ marginBottom: '10px' }}>
								<strong>Description:</strong> <span className="ellipsis">{pkg.content}</span>
							</div>
							<div style={{ marginBottom: '10px' }}>
								<strong>Price:</strong> {pkg.price}
							</div>
							<div style={{ marginBottom: '10px' }}>
								<strong>Status:</strong> {pkg.isActive ? <span style={{ color: 'green' }}>Active</span> : <span style={{ color: 'red' }}>Inactive</span>}
							</div>
						</Card>
					</Col>
				))}
				<Col xs={24} sm={12} md={8} lg={6} xl={6}>
					<Card
						hoverable
						className="cardHoverEffect"
						style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '220px', background: '#f0f2f5' }}
						onClick={showModal}
					>
						<PlusOutlined style={{ fontSize: '24px', paddingRight: "5px" }} />
						<span style={{ fontSize: '24px' }}>Create Package</span>
					</Card>
				</Col>
			</Row>
			<Modal title="Create New Package" visible={isModalVisible} onCancel={handleCancel} footer={null}>
				<Form onFinish={onFinish}>
					<Form.Item name="title" label="Package Title" rules={[{ required: true }]}>
						<Input />
					</Form.Item>
					<Form.Item name="content" label="Description" rules={[{ required: true }]}>
						<Input.TextArea />
					</Form.Item>
					<Form.Item name="price" label="Price" rules={[{ required: true }]}>
						<Input prefix="$" />
					</Form.Item>
					<Form.Item name="isActive" label="Active" valuePropName="checked">
						<Switch />
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit">
							Submit
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

export default Packages;
