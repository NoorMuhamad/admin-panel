import { Button, Form, Input, Modal, Row, Col, Select, Upload } from 'antd';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import View from './view';
import { modelTitles } from 'utils/password-strength';
import { PlusOutlined } from '@ant-design/icons';

// Validation Schema
const validationSchema = Yup.object().shape({
	firstName: Yup.string().required('Please enter your first name'),
	lastName: Yup.string().required('Please enter your last name'),
	email: Yup.string().email('Please enter a valid email').required('Please enter an email'),
	phoneNumber: Yup.string().matches(/^[0-9]+$/, "Phone number must be only digits")
		.min(10, 'Phone number must be at least 10 digits long')
		.required('Please enter a phone number'),
	cnic: Yup.string().matches(/^[0-9]+$/, "CNIC must be only digits")
		.length(13, 'CNIC must be exactly 13 digits long')
		.required('Please enter your CNIC'),
	role: Yup.string().required('Please select a role'),
	password: Yup.string().min(8, 'Password must be at least 8 characters long')
		.required('Please enter a password'),
	address: Yup.string().required('Please enter your address')
});

const UserForm = ({ visible, onCancel, onSubmit, initialValues, mode }) => {
	const isViewMode = mode === 'view';

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: (values) => {
			onSubmit(values);
			formik.resetForm();
		},
		enableReinitialize: true,
	});

	const handleCancel = () => {
		formik.resetForm();
		onCancel();
	};

	const renderFooterButtons = () => {
		if (isViewMode) {
			return [
				<Button key="cancel" onClick={handleCancel}>
					Close
				</Button>,
			];
		}

		return [
			<Button key="cancel" onClick={handleCancel}>
				Cancel
			</Button>,
			<Button key="submit" type="primary" onClick={formik.handleSubmit}>
				{mode === 'edit' ? 'Update' : 'Submit'}
			</Button>,
		];
	};

	return (
		<Modal
			title={`${modelTitles[mode] || mode} User`}
			open={visible}
			onCancel={handleCancel}
			footer={renderFooterButtons()}
			width={1000}
		>
			{isViewMode ? <View data={formik.values} /> :
				<Form layout="vertical">
					<div className="form-section">
						<h3>Personal Details</h3>
						<Row gutter={16}>
							<Col span={4}>
								<Form.Item>
									<Upload
										id="image-uploader"
										name="image"
										listType="picture-circle"
										className="image-uploader"
										showUploadList={false}
										action="/path/to/upload" // Replace with your upload URL
										beforeUpload={() => {/* Perform before upload checks here */ }}
									>
										{formik.values.image ? <img src={formik.values.image} alt="avatar" style={{ width: '100%' }} /> : (
											<div>
												<PlusOutlined />
												<div style={{ marginTop: 8 }}>Upload</div>
											</div>
										)}
									</Upload>
								</Form.Item>
							</Col>
							<Col span={10}>
								<Form.Item label="First Name" help={formik.errors.firstName}>
									<Input name="firstName" placeholder="John" onChange={formik.handleChange} value={formik.values.firstName} onBlur={formik.handleBlur} />
								</Form.Item>
							</Col>
							<Col span={10}>
								<Form.Item label="Last Name" help={formik.errors.lastName}>
									<Input name="lastName" placeholder="Ali" onChange={formik.handleChange} value={formik.values.lastName} onBlur={formik.handleBlur} />
								</Form.Item>
							</Col>
						</Row>
					</div>

					<div className="form-section">
						<h3>Contact Details</h3>
						<Row gutter={16}>
							<Col span={12}>
								<Form.Item label="Email" help={formik.errors.email}>
									<Input name="email" type="email" placeholder="ali@gmail.com" onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} />
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item label="Phone Number" help={formik.errors.phoneNumber}>
									<Input name="phoneNumber" placeholder="+923008772984" onChange={formik.handleChange} value={formik.values.phoneNumber} onBlur={formik.handleBlur} />
								</Form.Item>
							</Col>
						</Row>
					</div>

					<Row gutter={16}>
						<Col span={12}>
							<Form.Item label="CNIC" help={formik.errors.cnic}>
								<Input name="cnic" placeholder="42101-1234567-1" onChange={formik.handleChange} value={formik.values.cnic} onBlur={formik.handleBlur} />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item label="Role" help={formik.errors.role}>
								<Select
									name="role"
									onChange={value => formik.setFieldValue('role', value)}
									onBlur={formik.handleBlur}
									value={formik.values.role}
								>
									<Select.Option value="STAFF">Staff</Select.Option>
									<Select.Option value="ADMIN">Admin</Select.Option>
								</Select>
							</Form.Item>
						</Col>
					</Row>

					<Row gutter={16}>
						<Col span={12}>
							<Form.Item label="Password" help={formik.errors.password}>
								<Input.Password name="password" placeholder="••••••••" onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item label="Address" help={formik.errors.address}>
								<Input
									name="address"
									placeholder="123 Main St"
									onChange={formik.handleChange}
									value={formik.values.address}
									onBlur={formik.handleBlur}
								/>
							</Form.Item>
						</Col>
					</Row>


				</Form>
			}
		</Modal>
	);
};

UserForm.propTypes = {
	visible: PropTypes.bool.isRequired,
	onCancel: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	initialValues: PropTypes.object,
	mode: PropTypes.oneOf(['add', 'edit', 'view']).isRequired,
};

export default UserForm;