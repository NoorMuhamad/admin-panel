import { Paper } from '@mui/material';
import { Modal } from 'antd';
import Error from 'components/Error';
import useMutationHook from 'hooks/useMutationHook';
import useQueryHook from 'hooks/useQueryHook';
import { useEffect, useState } from 'react';
import Header from './components/header';
import ComplaintForm from './components/complaintForm';
import List from './list';
import { DELETE_COMPLAINT, GET_COMPLAINTS, UPDATE_COMPLAINT, CREATE_COMPLAINT } from '../../graphQl/complaint/index';

const initialValues = {
	id: '',
	subject: '',
	description: '',
	status: '',
	customerName: '',
	createdAt: '',
};

const Complaints = () => {
	const [formState, setFormState] = useState({ mode: null, isVisible: false, initialValues });
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [sortBy, setSortBy] = useState('');
	const [sortOrder, setSortOrder] = useState('asc');
	const [search, setSearch] = useState('');
	const [prevComplaints, setPrevComplaints] = useState([]);

	const { handleMutation: handleUpdateComplaint, loading: loadingUpdate, error: errorUpdate } = useMutationHook(UPDATE_COMPLAINT);
	const { handleMutation: handleCreateComplaint, loading: loadingCreate, error: errorCreate } = useMutationHook(CREATE_COMPLAINT);
	const { handleMutation: handleDeleteComplaint, loading: loadingDelete, error: errorDelete } = useMutationHook(DELETE_COMPLAINT);
	const { loading: loadingQuery, error: errorQuery, data, refetch } = useQueryHook(GET_COMPLAINTS, { variables: { page, limit, sortBy, sortOrder, search } });

	const isLoading = loadingCreate || loadingUpdate || loadingDelete || loadingQuery;
	const error = errorCreate || errorUpdate || errorDelete || errorQuery;

	// Update prevComplaints whenever new data is loaded
	useEffect(() => {
		if (!isLoading && data && data.complaints && data.complaints.data.length > 0) {
			setPrevComplaints(data.complaints.data);
		}
	}, [isLoading, data]);

	if (error) {
		const errorCode = (error.graphQLErrors[0]?.extensions.code) || 'DEFAULT_WARNING';
		return <Error errorCode={errorCode} />;
	}


	const { complaints: { data: complaints, totalPages, currentPage } } = data || { complaints: { data: [], totalPages: 0, currentPage: 1 } };

	const handleFormSubmit = async (values) => {
		try {
			if (formState.mode === 'edit') {
				await handleUpdateComplaint({ updateComplaintType: { ...values } });
			}
			if (formState.mode === 'add') {
				await handleCreateComplaint({ createComplaintType: { ...values } });
				refetch();
			}
			setFormState({ ...formState, isVisible: false });
		} catch (err) {
			console.log("err", err);
		}
	};

	const onCancel = () => setFormState({ ...formState, isVisible: false });

	const handlerDeleteComplaint = (id) => {
		Modal.confirm({
			title: 'Confirm Deletion',
			content: 'Are you sure you want to delete this Complaint?',
			async onOk() {
				await handleDeleteComplaint({ id });
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
			<Header setIsAddComplaint={() => setFormModeAndVisible('add')} handleSearch={handleSearch} search={search} />
			{/* Error Message */}
			{error && <div>Error: {error.message}. Please try again.</div>}

			<List
				data={isLoading ? prevComplaints : complaints}
				totalPages={totalPages}
				currentPage={currentPage}
				isLoading={isLoading}
				setFormModeAndVisible={setFormModeAndVisible}
				handleDeleteComplaint={handlerDeleteComplaint}
				handleSortBy={handleSortBy}
				handlePageChange={handlePageChange}
				page={page}
				limit={limit}
			/>
			{formState.isVisible && <ComplaintForm visible={formState.isVisible} onCancel={onCancel} onSubmit={handleFormSubmit} initialValues={formState.initialValues} mode={formState.mode} />}
		</Paper>
	);
};

export default Complaints;
