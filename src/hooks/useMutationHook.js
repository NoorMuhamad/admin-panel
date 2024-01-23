import { useMutation } from '@apollo/client';

const useMutationHook = (mutation, options = {}, isTokenApplied = true) => {
	const authorizationToken = localStorage.getItem('authorizationToken');
	const isAuthorized = !!authorizationToken;
	const [mutateFunction, { loading, error, data }] = useMutation(mutation, {
		...options,
		context: {
			headers: {
				Authorization: isAuthorized && isTokenApplied ? `Bearer ${authorizationToken}` : '',
				...(options.context?.headers || {}),
			},
		},
	});

	const handleMutation = async (variables) => {
		if (!isAuthorized && isTokenApplied) {
			throw new Error('User is not authorized');
		}

		try {
			const response = await mutateFunction({ variables });
			return response.data;
		} catch (mutationError) {
			console.error('Mutation error:', mutationError.message);
			throw mutationError;
		}
	};

	return { handleMutation, loading, error, data };
};

export default useMutationHook;
