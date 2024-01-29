import { Paper } from '@mui/material';
import { Modal } from 'antd';
import { useState } from 'react';
import ComplaintForm from './components/complaintForm';
import Header from './components/header';
import List from './list';

const Complaints = () => {
	const [formState, setFormState] = useState({ mode: null, isVisible: false, initialValues: { title: '' } });

	const handleFormSubmit = (values) => {
		console.log('Adding/Editing/Viewing complaint:', values);
		setFormState({ ...formState, isVisible: false });
	};

	const onCancel = () => setFormState({ ...formState, isVisible: false });

	const handleDeleteComplaint = () => {
		Modal.error({
			title: 'This is an error message',
			content: 'some messages...some messages...',
		});
	};

	const setFormModeAndVisible = (mode, initialValues = {}) => {
		setFormState({ mode, isVisible: true, initialValues });
	};

	return (
		<Paper style={{ background: 'white', paddingTop: '5px' }}>
			<Header setIsAddComplaint={() => setFormModeAndVisible('add')} />
			<List
				setIsEditComplaint={() => setFormModeAndVisible('edit', { title: 'noor' })}
				setIsViewComplaint={() => setFormModeAndVisible('view')}
				handleDeleteComplaint={handleDeleteComplaint}
			/>
			{formState.isVisible && (
				<ComplaintForm
					visible={formState.isVisible}
					onCancel={onCancel}
					onSubmit={handleFormSubmit}
					initialValues={formState.initialValues}
					mode={formState.mode}
				/>
			)}
		</Paper>
	);
};

export default Complaints;