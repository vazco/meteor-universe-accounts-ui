import React from 'react';
import i18n from 'meteor/universe:i18n';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import ErrorMessages from './ErrorMessages.jsx';
import LoginForm from './LoginForm.jsx';
import LoggedIn from './LoggedIn.jsx';
import utils from '../utils';

// instance of translate component in "accounts-ui" namespace
const T = i18n.createComponent(i18n.createTranslator('accounts-ui'));

class LoginBox extends React.Component {
  static renderErrorMessages() {
    if (this.state.errors) {
      return <ErrorMessages errors={this.state.errors} />;
    }
    return <div />;
  }

  constructor(props) {
    super(props);
    this.state = {
      errors: [],
    };
    LoginBox.renderErrorMessages = LoginBox.renderErrorMessages.bind(this);
  }

  render() {
    if (this.props.user) {
      return <LoggedIn />;
    }

    return (
      <div>
        <div className="ui large top attached segment">

          <h2 className="ui center aligned dividing header"><T>sign_in</T></h2>

          <LoginForm
            onError={utils.onError.bind(this)}
            clearErrors={utils.clearErrors.bind(this)}
          />
        </div>

        {(this.props.registerLink || this.props.resetLink) ?
          <div className="ui large bottom attached info icon message">
            <i className="user icon" />

            <div className="content">
              <div className="ui list">
                {this.props.registerLink ?
                  <div className="item">
                    <T>dont_have_an_account</T>
                    <a
                      href={this.props.registerLink}
                    >
                      <T>register_here</T>
                    </a>
                  </div>
                  : ''}
                {this.props.resetLink ?
                  <div className="item">
                    <T>forgot_your_password</T>
                    <a
                      href={this.props.resetLink}
                    >
                      <T>click_to_reset</T>
                    </a>
                  </div>
                  : ''}
              </div>
            </div>
          </div>
          : ''}

        {LoginBox.renderErrorMessages()}
      </div>
    );
  }
}

LoginBox.propTypes = {
  registerLink: PropTypes.string,
  resetLink: PropTypes.string,
  user: PropTypes.shape({
    _id: PropTypes.string,
  }),
};

export default withTracker(() => ({
  user: Meteor.users.findOne(),
}))(LoginBox);
