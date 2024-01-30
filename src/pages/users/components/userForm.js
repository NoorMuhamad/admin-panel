import { Button, Form, Input, Modal } from 'antd';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import View from './view'



// Validation Schema
const validationSchema = Yup.object().shape({
	title: Yup.string().required('Please enter the title'),
	firstName: Yup.string().required('Please enter your first name'),
	lastName: Yup.string().required('Please enter your last name'),
	email: Yup.string().email('Please enter a valid email').required('Please enter an email'),
	age: Yup.number().min(1).max(100).required('Please enter age'),
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

	// const formItemLayout = {
	// 	labelCol: { span: 4 },
	// 	wrapperCol: { span: 14 },
	// };


	return (
		<Modal
			title={`${mode === 'add' ? 'Add' : mode} User`}
			open={visible}
			onCancel={handleCancel}
			footer={renderFooterButtons()}
			width={1000}
		>
			<Form layout="vertical">
				<Form.Item label="Title" help={formik.errors.title}>
					{isViewMode ? (
						<View />
					) : (
						<Input name="title" onChange={formik.handleChange} value={formik.values.title} onBlur={formik.handleBlur} />
					)}
				</Form.Item>

				{/* <Form.Item label="First Name" {...formItemLayout} help={formik.errors.firstName}>
					{isViewMode ? (
						<span>{formik.values.firstName}</span>
					) : (
						<Input name="firstName" onChange={formik.handleChange} value={formik.values.firstName} onBlur={formik.handleBlur} />
					)}
				</Form.Item> */}
			</Form>
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