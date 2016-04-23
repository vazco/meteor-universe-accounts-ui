import React from 'react';
/*global ReactMeteorData */
import ErrorMessages from './ErrorMessages.jsx';
import RegisterForm from './RegisterForm.jsx';
import LoggedIn from './LoggedIn.jsx';
import utils from '../utils';
import i18n from 'meteor/universe:i18n';

//instance of translate component in "accounts-ui" namespace
const T = i18n.createComponent(i18n.createTranslator('accounts-ui'));

export default React.createClass({
    displayName: 'RegisterBox',
    propTypes: {
        loginLink: React.PropTypes.string
    },
    mixins: [ReactMeteorData],
    getMeteorData () {
        return {
            user: Meteor.user()
        };
    },
    getInitialState () {
        return {
            errors: []
        };
    },
    renderErrorMessages() {
        if (this.state.errors.length) {
            return <ErrorMessages errors={ this.state.errors } />
        }
    },
    render () {
        if (this.data.user) {
            return <LoggedIn />;
        }

        const { clearErrors, onError } = this.props;

        return (
            <div>
                <div className="ui large top attached segment">

                    <h2 className="ui center aligned dividing header">
                        <T>sign_up</T>
                    </h2>

                    <RegisterForm
                        onError={ utils.onError.bind(this) }
                        clearErrors={ utils.clearErrors.bind(this) }
                        />

                </div>

                {this.props.loginLink ?
                    <div className="ui large bottom attached info icon message">
                        <i className="user icon"></i>
                        <T>already_have_an_account</T>
                        <a href={this.props.loginLink}>&nbsp;<T>click_to_login</T></a>
                    </div>
                    : ''}

                { this.renderErrorMessages() }
            </div>
        );
    }
});