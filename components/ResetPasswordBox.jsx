import React from 'react';
import i18n from 'meteor/universe:i18n';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';
import { withTracker } from 'meteor/react-meteor-data';
import ErrorMessages from './ErrorMessages.jsx';
import LoggedIn from './LoggedIn.jsx';

// instance of translate component in "accounts-ui" namespace
const T = i18n.createComponent(i18n.createTranslator('accounts-ui'));

class ResetPasswordBox extends React.Component {
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
      email: '',
    };
    ResetPasswordBox.renderErrorMessages = ResetPasswordBox.renderErrorMessages.bind(this);
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

    const { email } = this.state;

    if (!email) {
      this.setState({ error: i18n.__('accounts-ui', 'you_need_to_provide_email') });
      return;
    }

    this.setState({
      loading: true,
      error: null,
    });

    Accounts.forgotPassword({ email }, (err) => {
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
      });
    });
  }

  render() {
    if (this.props.user) {
      return <LoggedIn />;
    }

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

            <button
              type="submit"
              className="ui fluid large primary button"
            >
              <T>send_reset_link</T>
            </button>
          </form>
        </div>

        {this.props.registerLink ?
          <div className="ui large bottom attached info icon message">
            <i className="user icon" />
            <T>dont_have_an_account</T>
            <a href={this.props.registerLink}>&nbsp;<T>register_here</T></a>
          </div>
                    : ''}

        { ResetPasswordBox.renderErrorMessages() }
      </div>
    );
  }
}

ResetPasswordBox.propTypes = {
  registerLink: PropTypes.string,
  user: PropTypes.shape({
    _id: PropTypes.string,
  }),
};

export default withTracker(() => ({
  user: Meteor.users.findOne(),
}))(ResetPasswordBox);
