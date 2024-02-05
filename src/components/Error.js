import React from 'react';
import { Result, Button } from 'antd';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Error = ({ errorCode }) => {
	const navigate = useNavigate();
	let status, title, subTitle, extra;

	const handleToUnauthenticated = () => {
		navigate('/login');
	}

	switch (errorCode) {
		case 'UNAUTHENTICATED':
			status = "403";
			title = "403";
			subTitle = "Sorry, you are not authorized to access this page.";
			extra = <Button type="primary" onClick={() => handleToUnauthenticated()} >Back Login</Button>;
			break;
		case 'OTHER_ERROR':
			status = "500";
			title = "500";
			subTitle = "Sorry, something went wrong.";
			extra = <Button type="primary">Back Dashboard</Button>;
			break;
		default:
			status = "warning";
			title = "There are some problems with your operation.";
			extra = <Button type="primary">Go Console</Button>;
	}

	return (
		<Result
			status={status}
			title={title}
			subTitle={subTitle}
			extra={extra}
		/>
	);
};

Error.propTypes = {
	errorCode: PropTypes.oneOf(['UNAUTHENTICATED', 'OTHER_ERROR', 'DEFAULT_WARNING']),
};

export default Error;
