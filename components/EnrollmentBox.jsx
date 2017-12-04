import React from 'react';
import i18n from 'meteor/universe:i18n';
import { Accounts } from 'meteor/accounts-base';
import PropTypes from 'prop-types';
import ErrorMessages from './ErrorMessages.jsx';
// instance of translate component in "accounts-ui" namespace
const T = i18n.createComponent(i18n.createTranslator('accounts-ui'));

class EnrollmentBox extends React.Component {
  static renderErrorMessages() {
    if (this.state.errors.length) {
      return <ErrorMessages errors={this.state.errors} />;
    }
    return <div />;
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null,
      emailSent: false,
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrorMessages = this.renderErrorMessages.bind(this);
  }

  handleChange(e) {
    const newState = {};
    newState[e.target.name] = e.target.value;

    this.setState(newState);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { password } = this.state;

    if (!password) {
      this.setState({ error: i18n.__('accounts-ui', 'you_need_to_provide_password') });
      return;
    }

    this.setState({
      loading: true,
      error: null,
    });

    Accounts.resetPassword(this.props.token, password, (err) => {
      if (err) {
        this.setState({
          error: err.reason || err.message,
          loading: false,
        });
        return;
      }

      this.setState({
        error: null,
        loading: false,
        emailSent: true,
        password: '',
      });

      if (this.props.onComplete) {
        this.props.onComplete();
      }
    });
  }

  render() {
    if (this.state.emailSent) {
      return (
        <div className="ui large top attached segment">
          <h2 className="ui center aligned dividing header"><T>email_sent</T></h2>
          <T>check_your_inbox_for_further_instructions</T>
        </div>
      );
    }

    return (
      <div>
        <div className="ui large top attached segment">

          <h2 className="ui center aligned dividing header"><T>reset_password</T></h2>

          <form
            onSubmit={this.handleSubmit}
            className={`ui form${this.state.loading ? ' loading' : ''}`}
          >

            <div className="required field">
              <label htmlFor="your_new_password"><T>your_new_password</T></label>

              <div className="ui fluid input">
                <input
                  type="password"
                  placeholder={i18n.__('accounts-ui', 'password')}
                  name="password"
                  required
                  onChange={this.handleChange}
                  value={this.state.password}
                />
              </div>
            </div>

            <button
              type="submit"
              className="ui fluid large primary button"
            >
              <T>save</T>
            </button>
          </form>
        </div>

        { EnrollmentBox.renderErrorMessages() }
      </div>
    );
  }
}

EnrollmentBox.propTypes = {
  token: PropTypes.string,
  onComplete: PropTypes.func,
};

export default EnrollmentBox;
