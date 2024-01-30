import { Paper } from '@mui/material';
import { Modal } from 'antd';
import SpinLoader from 'components/SpinLoader';
import useQueryHook from 'hooks/useQueryHook';
import { useState } from 'react';
import GET_USERS from '../../graphQl/user';
import Header from './components/header';
import UserForm from './components/userForm';
import List from './list';

const initialValues = {
	id: '',
	firstName: '',
	lastName: '',
	cnic: '',
	password: '',
	email: '',
	phoneNumber: '',
	role: '',
	address: '',
	createdAt: ''
}

const Users = () => {
	const [formState, setFormState] = useState({ mode: null, isVisible: false, initialValues });
	const { loading, error, data } = useQueryHook(GET_USERS, {
		variables: {
			page: 1,
			limit: 10,
			sortBy: 'createdAt',
			sortOrder: 'asc',
			search: '',
		},
	});


	if (loading) return <SpinLoader />;
	if (error) return <p>Error: {error.message}</p>;

	const { data: users, totalPages, currentPage } = data.users;

	const handleFormSubmit = (values) => {
		console.log('Adding/Editing/Viewing user:', values);
		setFormState({ ...formState, isVisible: false });
	};

	const onCancel = () => setFormState({ ...formState, isVisible: false });

	const handleDeleteUser = () => {
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
			<Header setIsAddUser={() => setFormModeAndVisible('add')} />
			<List
				data={users}
				totalPages={totalPages}
				currentPage={currentPage}
				isLoading={loading}
				setFormModeAndVisible={setFormModeAndVisible}
				handleDeleteUser={handleDeleteUser} s
			/>
			{formState.isVisible && (
				<UserForm
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

export default Users;