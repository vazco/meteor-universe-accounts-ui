import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import i18n from 'meteor/universe:i18n';
import { withTracker } from 'meteor/react-meteor-data';
import ErrorMessages from './ErrorMessages.jsx';
import LoginForm from './LoginForm.jsx';
import RegisterForm from './RegisterForm.jsx';
import LoggedIn from './LoggedIn.jsx';
import utils from '../utils';

// instance of translate component in "accounts-ui" namespace
const T = i18n.createComponent(i18n.createTranslator('accounts-ui'));

class RegisterBox extends React.Component {
  static renderErrorMessages() {
    if (this.state.errors.length) {
      return <ErrorMessages errors={this.state.errors} />;
    }
    return <div />;
  }

  constructor(props) {
    super(props);
    this.state = {
      errors: [],
    };
    RegisterBox.renderErrorMessages = RegisterBox.renderErrorMessages.bind(this);
  }

  render() {
    if (this.props.user) {
      return <LoggedIn />;
    }

    return (
      <div>
        <div className="ui large top attached segment">
          <div className="ui two column very relaxed stackable grid">
            <div className="column">
              <h2 className="ui center aligned dividing header"><T>sign_in</T></h2>

              <LoginForm
                onError={utils.onError.bind(this)}
                clearErrors={utils.clearErrors.bind(this)}
              />
            </div>
            <div className="ui vertical divider">
              <T>or</T>
            </div>
            <div className="column">
              <h2 className="ui center aligned dividing header"><T>sign_up</T></h2>

              <RegisterForm
                onError={utils.onError.bind(this)}
                clearErrors={utils.clearErrors.bind(this)}
              />
            </div>
          </div>
        </div>

        {this.props.resetLink ?
          <div className="ui large bottom attached info icon message">
            <i className="user icon" />
            <T>forgot_your_password</T>
            <a href={this.props.resetLink}>
              &nbsp;<T>click_to_reset</T>
            </a>
          </div>
                    : ''}

        { RegisterBox.renderErrorMessages() }
      </div>
    );
  }
}

RegisterBox.propTypes = {
  resetLink: PropTypes.string,
  user: PropTypes.shape({
    _id: PropTypes.string,
  }),
};

export default withTracker(() => ({
  user: Meteor.users.findOne(),
}))(RegisterBox);
