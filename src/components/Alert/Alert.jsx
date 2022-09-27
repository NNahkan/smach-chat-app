import React from 'react';
import './Alert.css';
import PropTypes from 'prop-types';

const Alert = ({ message, type }) => (
	<div className={`alert ${type}`} role='alert' >
		{message}
	</div>
);

Alert.propTypes = {
	message: PropTypes.string,
	type: PropTypes.string,
}

Alert.defaultProps = {
	message: 'Alert Message',
	type: 'success',
}

export default Alert;