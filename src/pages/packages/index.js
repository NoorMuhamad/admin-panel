import { Paper } from '@mui/material';
import { Modal } from 'antd';
import Error from 'components/Error';
import useMutationHook from 'hooks/useMutationHook';
import useQueryHook from 'hooks/useQueryHook';
import { useEffect, useState } from 'react';
import { CREATE_PACKAGE, DELETE_PACKAGE, GET_PACKAGES, UPDATE_PACKAGE } from '../../graphQl/packages/index';
import Header from './components/header';
import PackageForm from './components/packageForm';
import List from './list';

const initialValues = {
	id: '',
	name: '',
	monthlyFee: '',
	speed: '',
	isActive: '',
	createdAt: '',
};

const Packages = () => {
	const [formState, setFormState] = useState({ mode: null, isVisible: false, initialValues });
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [sortBy, setSortBy] = useState('');
	const [sortOrder, setSortOrder] = useState('asc');
	const [search, setSearch] = useState('');
	const [prevPackages, setPrevPackages] = useState([]);

	const { handleMutation: handleUpdatePackage, loading: loadingUpdate, error: errorUpdate } = useMutationHook(UPDATE_PACKAGE);
	const { handleMutation: handleCreatePackage, loading: loadingCreate, error: errorCreate } = useMutationHook(CREATE_PACKAGE);
	const { handleMutation: handleDeletePackage, loading: loadingDelete, error: errorDelete } = useMutationHook(DELETE_PACKAGE);
	const { loading: loadingQuery, error: errorQuery, data, refetch } = useQueryHook(GET_PACKAGES, { variables: { page, limit, sortBy, sortOrder, search } });

	const isLoading = loadingCreate || loadingUpdate || loadingDelete || loadingQuery;
	const error = errorCreate || errorUpdate || errorDelete || errorQuery;

	// Update prevPackages whenever new data is loaded
	useEffect(() => {
		if (!isLoading && data && data.packages && data.packages.data.length > 0) {
			setPrevPackages(data.packages.data);
		}
	}, [isLoading, data]);

	if (error) {
		const errorCode = (error.graphQLErrors[0]?.extensions.code) || 'DEFAULT_WARNING';
		return <Error errorCode={errorCode} />;
	}


	const { packages: { data: packages, totalPages, currentPage } } = data || { packages: { data: [], totalPages: 0, currentPage: 1 } };

	const handleFormSubmit = async (values) => {
		try {
			if (formState.mode === 'edit') {
				await handleUpdatePackage({ updatePackageType: { ...values } });
			}
			if (formState.mode === 'add') {
				await handleCreatePackage({ createPackageType: { ...values } });
				refetch();
			}
			setFormState({ ...formState, isVisible: false });
		} catch (err) {
			console.log("err", err);
		}
	};

	const onCancel = () => setFormState({ ...formState, isVisible: false });

	const handlerDeletePackage = (id) => {
		Modal.confirm({
			title: 'Confirm Deletion',
			content: 'Are you sure you want to delete this Package?',
			async onOk() {
				await handleDeletePackage({ id });
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
			<Header setIsAddPackage={() => setFormModeAndVisible('add')} handleSearch={handleSearch} search={search} />
			{/* Error Message */}
			{error && <div>Error: {error.message}. Please try again.</div>}

			<List
				data={isLoading ? prevPackages : packages}
				totalPages={totalPages}
				currentPage={currentPage}
				isLoading={isLoading}
				setFormModeAndVisible={setFormModeAndVisible}
				handleDeletePackage={handlerDeletePackage}
				handleSortBy={handleSortBy}
				handlePageChange={handlePageChange}
				page={page}
				limit={limit}
			/>
			{formState.isVisible && <PackageForm visible={formState.isVisible} onCancel={onCancel} onSubmit={handleFormSubmit} initialValues={formState.initialValues} mode={formState.mode} />}
		</Paper>
	);
};

export default Packages;
