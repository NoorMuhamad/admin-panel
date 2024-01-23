import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from 'utils/password-strength';
import useAuthorization from 'hooks/useAuthorization';

const withAuthentication = (WrappedComponent, allowedRoles) => {
	const AuthenticatedAndAuthorizedRoute = (props) => {
		const { hasRole } = useAuthorization(); // use the hook here

		// Check if the user is authenticated
		if (!isAuthenticated()) {
			return <Navigate to="/login" replace={true} />;
		}

		// Check if the user has any of the allowed roles
		const isAuthorized = allowedRoles.some(role => hasRole(role));

		if (!isAuthorized) {
			// Redirect to an 'Access Denied' page if the user doesn't have required role
			return <Navigate to="/" replace={true} />;
		}

		return <WrappedComponent {...props} />;
	};

	return AuthenticatedAndAuthorizedRoute;
};

export default withAuthentication;