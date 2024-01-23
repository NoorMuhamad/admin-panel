import { useSelector } from 'react-redux';
import { isAuthenticated } from 'utils/password-strength';

const useAuthorization = () => {
	const user = useSelector((state) => state.authReducer.user);

	const hasRole = (requiredRole) => {
		return isAuthenticated() && user.role === requiredRole;
	};

	const hasPermission = () => {
		// Add your permission logic here based on user roles or any other criteria
		// For simplicity, we'll just return true for now
		return true;
	};

	return { hasRole, hasPermission };
};

export default useAuthorization;