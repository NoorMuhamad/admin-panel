import { Paper } from '@mui/material';
import { Modal } from 'antd';
import Error from 'components/Error';
import useMutationHook from 'hooks/useMutationHook';
import useQueryHook from 'hooks/useQueryHook';
import { useEffect, useState } from 'react';
import { CREATE_CUSTOMER, DELETE_CUSTOMER, GET_CUSTOMERS, UPDATE_CUSTOMER } from '../../graphQl/customer/index';
import Header from './components/header';
import CustomerForm from './components/customerForm';
import List from './list';

const initialValues = {
	firstName: '',
	lastName: '',
	cnic: '',
	email: '',
	phoneNumber: '',
	address: '',
	isActive: '',
	packageName: '',
	billingStatus: '',
	createdAt: '',
};

const Customers = () => {
	const [formState, setFormState] = useState({ mode: null, isVisible: false, initialValues });
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [sortBy, setSortBy] = useState('');
	const [sortOrder, setSortOrder] = useState('asc');
	const [search, setSearch] = useState('');
	const [prevCustomers, setPrevCustomers] = useState([]);

	const { handleMutation: handleUpdateCustomer, loading: loadingUpdate, error: errorUpdate } = useMutationHook(UPDATE_CUSTOMER);
	const { handleMutation: handleCreateCustomer, loading: loadingCreate, error: errorCreate } = useMutationHook(CREATE_CUSTOMER);
	const { handleMutation: handleDeleteCustomer, loading: loadingDelete, error: errorDelete } = useMutationHook(DELETE_CUSTOMER);
	const { loading: loadingQuery, error: errorQuery, data, refetch } = useQueryHook(GET_CUSTOMERS, { variables: { page, limit, sortBy, sortOrder, search } });

	const isLoading = loadingCreate || loadingUpdate || loadingDelete || loadingQuery;
	const error = errorCreate || errorUpdate || errorDelete || errorQuery;

	// Update prevCustomers whenever new data is loaded
	useEffect(() => {
		if (!isLoading && data && data.customers && data.customers.data.length > 0) {
			setPrevCustomers(data.customers.data);
		}
	}, [isLoading, data]);

	if (error) {
		const errorCode = (error.graphQLErrors[0]?.extensions.code) || 'DEFAULT_WARNING';
		return <Error errorCode={errorCode} />;
	}


	const { customers: { data: customers, totalPages, currentPage } } = data || { customers: { data: [], totalPages: 0, currentPage: 1 } };

	const handleFormSubmit = async (values) => {
		try {
			if (formState.mode === 'edit') {
				await handleUpdateCustomer({ updateCustomerType: { ...values } });
			}
			if (formState.mode === 'add') {
				await handleCreateCustomer({ createCustomerType: { ...values } });
				refetch();
			}
			setFormState({ ...formState, isVisible: false });
		} catch (err) {
			console.log("err", err);
		}
	};

	const onCancel = () => setFormState({ ...formState, isVisible: false });

	const handlerDeleteCustomer = (id) => {
		Modal.confirm({
			title: 'Confirm Deletion',
			content: 'Are you sure you want to delete this customer?',
			async onOk() {
				await handleDeleteCustomer({ id });
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
			<Header setIsAddCustomer={() => setFormModeAndVisible('add')} handleSearch={handleSearch} search={search} />
			{/* Error Message */}
			{error && <div>Error: {error.message}. Please try again.</div>}

			<List
				data={isLoading ? prevCustomers : customers}
				totalPages={totalPages}
				currentPage={currentPage}
				isLoading={isLoading}
				setFormModeAndVisible={setFormModeAndVisible}
				handleDeleteCustomer={handlerDeleteCustomer}
				handleSortBy={handleSortBy}
				handlePageChange={handlePageChange}
				page={page}
				limit={limit}
			/>
			{formState.isVisible && <CustomerForm visible={formState.isVisible} onCancel={onCancel} onSubmit={handleFormSubmit} initialValues={formState.initialValues} mode={formState.mode} />}
		</Paper>
	);
};

export default Customers;
