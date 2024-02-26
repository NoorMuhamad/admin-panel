// import React, { useState } from 'react';
// import { Card, Col, Row, Modal, Form, Input, Switch, notification, Button, Tooltip } from 'antd';
// import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
// import * as Yup from 'yup';
// import { Formik } from 'formik';
// import '../../themes/css/packages/index.css'; // Make sure to import the CSS file

// const packagePatterns = ['#f0d9d9', '#d9f0d9', '#f9f6cf'];

// const generatePattern = (index) => {
// 	return packagePatterns[index % packagePatterns.length];
// };

// const initialPackages = [
// 	{ id: 1, title: "Basic Package", content: "Ideal for beginners.", price: "$99", isActive: true },
// 	{ id: 2, title: "Standard Package", content: "A perfect package for regular users.", price: "$199", isActive: false },
// ];

// const Packages = () => {
// 	const [packages, setPackages] = useState(initialPackages);
// 	const [isModalVisible, setIsModalVisible] = useState(false);
// 	const [editingPackage, setEditingPackage] = useState(null);

// 	const showModal = () => setIsModalVisible(true);
// 	const handleCancel = () => {
// 		setIsModalVisible(false);
// 		setEditingPackage(null);
// 	};
// 	const handleEdit = (pkg) => {
// 		setEditingPackage(pkg);
// 		setIsModalVisible(true);
// 	};
// 	const handleDelete = (id) => {
// 		// Implement your delete functionality here
// 		console.log('Deleting package with id:', id);
// 	};

// 	const validationSchema = Yup.object().shape({
// 		title: Yup.string().required('Title is required'),
// 		content: Yup.string().required('Description is required'),
// 		price: Yup.string().required('Price is required'),
// 		isActive: Yup.boolean(),
// 	});

// 	const handleSubmit = (values, { resetForm }) => {
// 		if (editingPackage) {
// 			// Update existing package
// 			const updatedPackages = packages.map(pkg =>
// 				pkg.id === editingPackage.id ? { ...pkg, ...values } : pkg
// 			);
// 			setPackages(updatedPackages);
// 			setEditingPackage(null);
// 			notification.success({ message: 'Package updated successfully!' });
// 		} else {
// 			// Add new package
// 			setPackages([...packages, { ...values, isActive: values.isActive ? true : false }]);
// 			notification.success({ message: 'Package added successfully!' });
// 		}
// 		setIsModalVisible(false);
// 		resetForm();
// 	};

// 	return (
// 		<>
// 			<Row gutter={[16, 16]}>
// 				{packages.map((pkg, index) => (
// 					<Col key={pkg.id} xs={24} sm={12} md={8} lg={6} xl={6}>
// 						<Card
// 							className="cardHoverEffect"
// 							title={pkg.title}
// 							bordered={false}
// 							style={{ background: generatePattern(index), minHeight: '200px' }}
// 						>
// 							<div className="iconContainer">
// 								<Tooltip title="Edit">
// 									<EditOutlined onClick={() => handleEdit(pkg)} style={{ marginRight: 8, fontSize: '18px', color: 'blue' }} />
// 								</Tooltip>
// 								<Tooltip title="Delete">
// 									<DeleteOutlined onClick={() => handleDelete(pkg.id)} style={{ marginRight: 8, fontSize: '18px', color: 'red' }} />
// 								</Tooltip>
// 							</div>
// 							<div style={{ marginBottom: '10px' }}>
// 								<strong>Description:</strong> <span className="ellipsis">{pkg.content}</span>
// 							</div>
// 							<div style={{ marginBottom: '10px' }}>
// 								<strong>Price:</strong> {pkg.price}
// 							</div>
// 							<div style={{ marginBottom: '10px' }}>
// 								<strong>Status:</strong> {pkg.isActive ? <span style={{ color: 'green' }}>Active</span> : <span style={{ color: 'red' }}>Inactive</span>}
// 							</div>
// 						</Card>
// 					</Col>
// 				))}
// 				<Col xs={24} sm={12} md={8} lg={6} xl={6}>
// 					<Card
// 						hoverable
// 						className="cardHoverEffect"
// 						style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '220px', background: '#f0f2f5' }}
// 						onClick={showModal}
// 					>
// 						<PlusOutlined style={{ fontSize: '24px', paddingRight: "5px" }} />
// 						<span style={{ fontSize: '24px' }}>Create Package</span>
// 					</Card>
// 				</Col>
// 			</Row>
// 			<Modal title={editingPackage ? "Edit Package" : "Create New Package"} visible={isModalVisible} onCancel={handleCancel} footer={null}>
// 				<Formik
// 					initialValues={editingPackage || { title: '', content: '', price: '', isActive: false }}
// 					validationSchema={validationSchema}
// 					onSubmit={handleSubmit}
// 				>
// 					{({ values, handleChange, handleSubmit, errors, touched }) => (
// 						<Form onSubmit={handleSubmit}>
// 							<Form.Item label="Package Title" validateStatus={errors.title && touched.title ? "error" : ""} help={errors.title && touched.title ? errors.title : ""}>
// 								<Input name="title" value={values.title} onChange={handleChange} />
// 							</Form.Item>
// 							<Form.Item label="Description" validateStatus={errors.content && touched.content ? "error" : ""} help={errors.content && touched.content ? errors.content : ""}>
// 								<Input.TextArea name="content" value={values.content} onChange={handleChange} />
// 							</Form.Item>
// 							<Form.Item label="Price" validateStatus={errors.price && touched.price ? "error" : ""} help={errors.price && touched.price ? errors.price : ""}>
// 								<Input prefix="$" name="price" value={values.price} onChange={handleChange} />
// 							</Form.Item>
// 							<Form.Item name="isActive" label="Active" valuePropName="checked">
// 								<Switch name="isActive" checked={values.isActive} onChange={handleChange} />
// 							</Form.Item>
// 							<Form.Item>
// 								<Button type="primary" htmlType="submit">
// 									{editingPackage ? "Update" : "Submit"}
// 								</Button>
// 							</Form.Item>
// 						</Form>
// 					)}
// 				</Formik>
// 			</Modal>
// 		</>
// 	);
// };

// export default Packages;
