import { Button, Col, Form, Input, Modal, Row, Select } from 'antd';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { modelTitles } from 'utils/password-strength';
import * as Yup from 'yup';
import View from './view';

// Validation Schema
const validationSchema = Yup.object().shape({
	subject: Yup.string().required('Please enter your first name'),
	description: Yup.string().required('Please enter your last name'),
	status: Yup.string().required('Please select a role'),
	customerName: Yup.string().required('Customer Name'),
});

const ComplaintForm = ({ visible, onCancel, onSubmit, initialValues, mode }) => {
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
			title={`${modelTitles[mode] || mode} Complaint`}
			open={visible}
			onCancel={handleCancel}
			footer={renderFooterButtons()}
			width={1000}
		>
			{isViewMode ? <View data={formik.values} /> :
				<Form layout="vertical">
					<div className="form-section">
						<h3>Complaint Details</h3>
						<Row gutter={16}>
							<Col span={10}>
								<Form.Item label="Subject" help={formik.errors.subject}>
									<Input name="subject" placeholder="Internet Connection Lost" onChange={formik.handleChange} value={formik.values.subject} onBlur={formik.handleBlur} />
								</Form.Item>
							</Col>
							<Col span={10}>
								<Form.Item label="Description" help={formik.errors.description}>
									<Input name="description" placeholder="complaint detail" onChange={formik.handleChange} value={formik.values.description} onBlur={formik.handleBlur} />
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={16}>
							<Col span={12}>
								<Form.Item label="Status" help={formik.errors.role}>
									<Select
										name="status"
										onChange={value => formik.setFieldValue('status', value)}
										onBlur={formik.handleBlur}
										value={formik.values.status}
									>
										<Select.Option value="PENDING">Pending</Select.Option>
										<Select.Option value="INPROGRESS">In-Progress</Select.Option>
										<Select.Option value="COMPLETE">Complete</Select.Option>
									</Select>
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item label="Customer Name" help={formik.errors.role}>
									<Select
										showSearch
										optionFilterProp="children"
										name="customerName"
										onChange={value => formik.setFieldValue('customerName', value)}
										onBlur={formik.handleBlur}
										value={formik.values.customerName}
										filterOption={(input, option) =>
											option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
										}
									>
										<Select.Option value="Test1">Test Customer1</Select.Option>
										<Select.Option value="Test2">Test Customer2</Select.Option>
									</Select>
								</Form.Item>
							</Col>
						</Row>
					</div>

				</Form>
			}
		</Modal>
	);
};

ComplaintForm.propTypes = {
	visible: PropTypes.bool.isRequired,
	onCancel: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	initialValues: PropTypes.object,
	mode: PropTypes.oneOf(['add', 'edit', 'view']).isRequired,
};

export default ComplaintForm;