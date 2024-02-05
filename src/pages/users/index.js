import { Paper } from '@mui/material';
import { Modal } from 'antd';
import Error from 'components/Error';
import useMutationHook from 'hooks/useMutationHook';
import useQueryHook from 'hooks/useQueryHook';
import { useEffect, useState } from 'react';
import { CREATE_USER, DELETE_USER, GET_USERS, UPDATE_USER } from '../../graphQl/user/index';
import Header from './components/header';
import UserForm from './components/userForm';
import List from './list';

const initialValues = {
	id: '',
	firstName: '',
	lastName: '',
	image: '',
	cnic: '',
	password: '',
	email: '',
	phoneNumber: '',
	role: '',
	address: '',
	createdAt: ''
};

const Users = () => {
	const [formState, setFormState] = useState({ mode: null, isVisible: false, initialValues });
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [sortBy, setSortBy] = useState('');
	const [sortOrder, setSortOrder] = useState('asc');
	const [search, setSearch] = useState('');
	const [prevUsers, setPrevUsers] = useState([]);

	const { handleMutation: handleUpdateUser, loading: loadingUpdate, error: errorUpdate } = useMutationHook(UPDATE_USER);
	const { handleMutation: handleCreateUser, loading: loadingCreate, error: errorCreate } = useMutationHook(CREATE_USER);
	const { handleMutation: handleDeleteUser, loading: loadingDelete, error: errorDelete } = useMutationHook(DELETE_USER);
	const { loading: loadingQuery, error: errorQuery, data, refetch } = useQueryHook(GET_USERS, { variables: { page, limit, sortBy, sortOrder, search } });

	const isLoading = loadingCreate || loadingUpdate || loadingDelete || loadingQuery;
	const error = errorCreate || errorUpdate || errorDelete || errorQuery;

	// Update prevUsers whenever new data is loaded
	useEffect(() => {
		if (!isLoading && data && data.users && data.users.data.length > 0) {
			setPrevUsers(data.users.data);
		}
	}, [isLoading, data]);

	if (error) {
		const errorCode = (error.graphQLErrors[0]?.extensions.code) || 'DEFAULT_WARNING';
		return <Error errorCode={errorCode} />;
	}


	const { users: { data: users, totalPages, currentPage } } = data || { users: { data: [], totalPages: 0, currentPage: 1 } };

	const handleFormSubmit = async (values) => {
		try {
			if (formState.mode === 'edit') {
				await handleUpdateUser({ updateUserType: { ...values } });
			}
			if (formState.mode === 'add') {
				await handleCreateUser({ createUserType: { ...values } });
				refetch();
			}
			setFormState({ ...formState, isVisible: false });
		} catch (err) {
			console.log("err", err);
		}
	};

	const onCancel = () => setFormState({ ...formState, isVisible: false });

	const handlerDeleteUser = (id) => {
		Modal.confirm({
			title: 'Confirm Deletion',
			content: 'Are you sure you want to delete this user?',
			async onOk() {
				await handleDeleteUser({ id });
				refetch();
			},
			onCancel() {
				onCancel();
			},
		});
	};

	const setFormModeAndVisible = (mode, initialValues = {}) => {
		const { __typename, createdAt, ...rest } = initialValues;
		console.log(__typename, createdAt);
		setFormState({ mode, isVisible: true, initialValues: rest });
	};

	const handleSearch = (e) => {
		setSearch(e.target.value);
	};

	const handleSortBy = (column) => {
		const newSortOrder = sortBy === column ? (sortOrder === 'asc' ? 'desc' : 'asc') : 'asc';
		setSortBy(column);
		setSortOrder(newSortOrder);
	};

	const handlePageChange = (page, pageSize) => {
		setPage(page);
		setLimit(pageSize);
	};

	return (
		<Paper style={{ background: 'white', paddingTop: '5px' }}>
			<Header setIsAddUser={() => setFormModeAndVisible('add')} handleSearch={handleSearch} search={search} />
			{/* Error Message */}
			{error && <div>Error: {error.message}. Please try again.</div>}

			<List
				data={isLoading ? prevUsers : users}
				totalPages={totalPages}
				currentPage={currentPage}
				isLoading={isLoading}
				setFormModeAndVisible={setFormModeAndVisible}
				handleDeleteUser={handlerDeleteUser}
				handleSortBy={handleSortBy}
				handlePageChange={handlePageChange}
				page={page}
				limit={limit}
			/>
			{formState.isVisible && <UserForm visible={formState.isVisible} onCancel={onCancel} onSubmit={handleFormSubmit} initialValues={formState.initialValues} mode={formState.mode} />}
		</Paper>
	);
};

export default Users;
