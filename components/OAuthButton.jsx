import React from 'react';
import i18n from 'meteor/universe:i18n';
import PropTypes from 'prop-types';
import utils from '../utils';

// instance of translate component in "accounts-ui" namespace
const T = i18n.createComponent(i18n.createTranslator('accounts-ui'));

class OAuthButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ loading: true });

    utils.performOAuthLogin(this.props.service, (err) => {
      this.setState({
        loading: false,
        error: err ? err.message : null,
      });
    });
  }

  render() {
    let { service } = this.props;

    // some meteor -> semantic name mappings for nice styling
    if (service === 'google') {
      service += ' plus';
    }

    if (this.state.error) {
      return (
        <button
          className="ui fluid negative disabled button"
          style={{ marginBottom: 10 }}
        >
          <i className="warning circle icon" /> {this.state.error}
        </button>
      );
    }

    if (this.state.loading) {
      return (
        <button
          className={`ui fluid button ${service} loading`}
          style={{ marginBottom: 10 }}
        >
          <T>loading</T>
        </button>
      );
    }

    return (
      <button
        className={`ui fluid button ${service}`}
        style={{ marginBottom: 10 }}
        onClick={this.handleClick}
      >
        <i className={`${service} icon`} /> {this.props.text}
      </button>
    );
  }
}

OAuthButton.propTypes = {
  service: PropTypes.string,
  text: PropTypes.string,
};

export default OAuthButton;
