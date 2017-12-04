import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessages = ({ errors }) => (
  <div className="ui large negative icon message">
    <i className="warning circle icon" />
    <div className="content">
      <ui className="list">
        { errors.map((error, index) => <li key={index}>{ error }</li>) }
      </ui>
    </div>
  </div>
);

ErrorMessages.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string),
};

export default ErrorMessages;

