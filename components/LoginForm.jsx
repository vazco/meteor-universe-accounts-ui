import React from 'react';
import i18n from 'meteor/universe:i18n';
import PropTypes from 'prop-types';
import utils from '../utils';
import OAuthButton from './OAuthButton.jsx';
import PasswordForm from './PasswordForm.jsx';

// instance of translate component in "accounts-ui" namespace
const T = i18n.createComponent(i18n.createTranslator('accounts-ui'));

const LoginForm = ({ clearErrors, onError }) => {
  const services = utils.getServiceNames();
  // `Sign in with ${utils.capitalize(service)}`
  return (
    <div className="ui form">
      <div>
        {services.map(service => (
          <OAuthButton
            service={service}
            text={`${i18n.__('accounts-ui', 'sign_in_with')} ${utils.capitalize(service)}`}
            key={service}
          />
          ))}
      </div>
      {services.length > 0 && utils.hasPasswordService() ?
        <div className="ui horizontal divider"><T>sign_in_with_email</T></div> : ''
      }
      {utils.hasPasswordService() ?
        <PasswordForm
          type="login"
          onError={onError}
          clearErrors={clearErrors}
        /> : ''
      }
    </div>
  );
};

LoginForm.propTypes = {
  clearErrors: PropTypes.func,
  onError: PropTypes.func,
};

export default LoginForm;
