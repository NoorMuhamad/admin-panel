import { Paper } from '@mui/material';
import { Modal } from 'antd';
import SpinLoader from 'components/SpinLoader';
import useQueryHook from 'hooks/useQueryHook';
import useMutationHook from 'hooks/useMutationHook';
import Header from './components/header';
import UserForm from './components/userForm';
import List from './list';
import { UPDATE_USER, CREATE_USER, DELETE_USER, GET_USERS } from '../../graphQl/user/index';
import { useState } from 'react';

const initialValues = { id: '', firstName: '', lastName: '', image: '', cnic: '', password: '', email: '', phoneNumber: '', role: '', address: '', createdAt: '' };

const Users = () => {
	const [formState, setFormState] = useState({ mode: null, isVisible: false, initialValues });
	const { handleMutation: updateUser } = useMutationHook(UPDATE_USER);
	const { handleMutation: createUser } = useMutationHook(CREATE_USER);
	const { handleMutation: deleteUser } = useMutationHook(DELETE_USER);
	const { loading, error, data } = useQueryHook(GET_USERS, { variables: { page: 1, limit: 10, sortBy: 'createdAt', sortOrder: 'asc', search: '' } });

	if (loading) return <SpinLoader />;
	if (error) return <p>Error: {error.message}</p>;

	const { users: { data: users, totalPages, currentPage } } = data;

	const handleFormSubmit = async (values) => {
		try {
			if (formState.mode === 'edit') {
				await updateUser({ updateUserType: { ...values } });
			}
			if (formState.mode === 'add') {
				await createUser({ createUserType: { ...values } });
			}
			setFormState({ ...formState, isVisible: false });
		} catch (err) {
			console.log("err", err);
		}
	};

	const onCancel = () => setFormState({ ...formState, isVisible: false });

	const handleDeleteUser = (id) => {
		Modal.confirm({
			title: 'Confirm Deletion',
			content: 'Are you sure you want to delete this user?',
			async onOk() {
				await deleteUser({ id });
			},
			onCancel() {
				onCancel()
			},
		});
	};

	const setFormModeAndVisible = (mode, initialValues = {}) => {
		console.log(initialValues)
		const { __typename, createdAt, ...rest } = initialValues;
		console.log(__typename, createdAt);
		setFormState({ mode, isVisible: true, initialValues: rest });
	}

	return (
		<Paper style={{ background: 'white', paddingTop: '5px' }}>
			<Header setIsAddUser={() => setFormModeAndVisible('add')} />
			<List data={users} totalPages={totalPages} currentPage={currentPage} isLoading={loading} setFormModeAndVisible={setFormModeAndVisible} handleDeleteUser={handleDeleteUser} />
			{formState.isVisible && <UserForm visible={formState.isVisible} onCancel={onCancel} onSubmit={handleFormSubmit} initialValues={formState.initialValues} mode={formState.mode} />}
		</Paper>
	);
};

export default Users;
