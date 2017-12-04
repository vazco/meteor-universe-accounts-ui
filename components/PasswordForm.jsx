import React from 'react';
import { Meteor } from 'meteor/meteor';
import i18n from 'meteor/universe:i18n';
import { Accounts } from 'meteor/accounts-base';
import PropTypes from 'prop-types';
import utils from '../utils';

// instance of translate component in "accounts-ui" namespace
const T = i18n.createComponent(i18n.createTranslator('accounts-ui'));

class PasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: '',
      password: '',
      password2: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const newState = {};
    newState[e.target.name] = e.target.value;

    this.setState(newState);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { clearErrors, onError } = this.props;
    const { password, email } = this.state;

    if (this.props.type === 'login') {
      // log in / sign in

      this.setState({ loading: true });
      Meteor.loginWithPassword(
        email,
        password,
        (err) => {
          // let errors = this.state.errors;
          this.setState({ loading: false });

          if (err && err.error === 400) {
            onError(i18n.__('accounts-ui', 'invalid_usename_or_password'));
          } else if (err) {
            onError(err.reason || i18n.__('accounts-ui', 'unknown_error'));
          } else {
            clearErrors();
          }
        },
      );
    } else {
      // register / sign up
      const { password2 } = this.state;

      if (password !== password2) {
        onError(i18n.__('accounts-ui', 'passwords_dont_match'));

        return;
      }

      this.setState({ loading: true });

      Accounts.createUser({
        email: email.value,
        password: password.value,
      }, (err) => {
        this.setState({ loading: false });
        if (err) {
          onError(err.reason || i18n.__('accounts-ui', 'unknown_error'));
        } else {
          clearErrors();
          // this.refs.form.reset();
        }
      });
    }
  }

  render() {
    if (!utils.hasPasswordService()) {
      return <div />;
    }
    const isRegistration = (this.props.type === 'register');

    return (
      <form
        onSubmit={this.handleSubmit}
        className={`ui large form${this.state.loading ? ' loading' : ''}`}
      >

        <div className="required field">
          <label htmlFor="email"><T>email</T></label>
          <div className="ui fluid input">
            <input
              type="email"
              placeholder={i18n.__('accounts-ui', 'email')}
              name="email"
              required
              onChange={this.handleChange}
              value={this.state.email}
            />
          </div>
        </div>

        <div className="required field">
          <label htmlFor="password"><T>password</T></label>
          <input
            type="password"
            placeholder={i18n.__('accounts-ui', 'password')}
            name="password"
            required
            onChange={this.handleChange}
            value={this.state.password}
          />
        </div>

        {isRegistration ?
          <div className="required field">
            <label htmlFor="repeat_password"><T>repeat_password</T></label>
            <input
              type="password"
              placeholder={i18n.__('accounts-ui', 'repeat_password')}
              name="password"
              required
              onChange={this.handleChange}
              value={this.state.password2}
            />
          </div>
                    : ''}

        <button
          type="submit"
          className="ui fluid large primary button"
        >
          { isRegistration ?
                        i18n.__('accounts-ui', 'sign_up') :
                        i18n.__('accounts-ui', 'sign_in') }
        </button>
      </form>
    );
  }
}

PasswordForm.propTypes = {
  clearErrors: PropTypes.func,
  onError: PropTypes.func,
  type: PropTypes.oneOf(['login', 'register']).isRequired,
};

export default PasswordForm;
