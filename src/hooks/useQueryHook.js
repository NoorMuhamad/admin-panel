import { useQuery } from '@apollo/client';
import { getAccessToken } from 'utils/password-strength';

const useQueryHook = (query, options = {}, isTokenApplied = true) => {
	const accessToken = getAccessToken();
	const isAuthorized = !!accessToken;

	// Enhanced readability and maintainability for setting Authorization header
	const setAuthorizationHeader = () => {
		if (isAuthorized && isTokenApplied) {
			return { Authorization: `Bearer ${accessToken}` };
		}
		return {};
	};

	// Customized error handling
	const handleError = (error) => {
		// Custom error handling logic here
		console.error('Error in useQueryHook:', error);
	};

	// Using the useQuery hook with enhanced configuration
	const { loading, error, data } = useQuery(query, {
		...options,
		context: {
			...options.context,
			headers: {
				...options.context?.headers,
				...setAuthorizationHeader(),
			},
		},
		onError: handleError,
	});

	// Additional logic can be added here if needed

	return { loading, error, data };
};

export default useQueryHook;
