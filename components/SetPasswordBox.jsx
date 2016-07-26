import React from 'react';
/*global ReactMeteorData */
import ErrorMessages from './ErrorMessages.jsx';
import LoggedIn from './LoggedIn.jsx';
import utils from '../utils';
import i18n from 'meteor/universe:i18n';

//instance of translate component in "accounts-ui" namespace
const T = i18n.createComponent(i18n.createTranslator('accounts-ui'));

export default React.createClass({
    displayName: 'SetPasswordBox',
    mixins: [ReactMeteorData],
    propTypes: {
        token: React.PropTypes.string
    },
    getMeteorData () {
        return {
            user: Meteor.user()
        };
    },
    getInitialState () {
        return {
            loading: false,
            errors: []
        };
    },

    handleSubmit (e) {
        e.preventDefault();

        const onError = utils.onError.bind(this);
        const passwordNode = this.refs.password;
        const passwordRepeatedNode = this.refs.password2;

        if (passwordNode.value !== passwordRepeatedNode.value) {
            onError(i18n.__('accounts-ui', 'passwords_dont_match'));
            return;
        }

        if (this.props.passwordStrengthCheck) {
            let passwordCheck = this.checkPasswordStrength(passwordNode.value);
            if (passwordCheck.status) {
                onError(i18n.__('accounts-ui','password_dont_have') + passwordCheck.errors.join(', '));
                return;
            }
        }

        this.setState({
            loading: true,
            errors: []
        });

        Accounts.resetPassword(this.props.token, passwordNode.value, err => {
            if (err) {
                this.setState({
                    errors: [err.reason || err.message],
                    loading: false
                });
                return;
            }

            this.setState({
                errors: [],
                loading: false
            });
        });
    },

    checkPasswordStrength (password) {
        let errors = [];
        let status = false;

        if (!/[a-z]/.test(password)) {
            errors.push('lowercase letter');
            status = true;
        }
        if (!/[A-Z]/.test(password)) {
            errors.push('uppercase letter');
            status = true;
        }
        if (!/[0-9]/.test(password)) {
            errors.push('number');
            status = true;
        }
        if (/^[a-zA-Z0-9.]*$/.test(password)) {
            errors.push('special character');
            status = true;
        }
        if (password.length < 8) {
            errors.push('at least 8 signs');
            status = true;
        }
        return {status, errors};
    },

    renderErrorMessages () {
        if (this.state.errors.length) {
            return <ErrorMessages errors={ this.state.errors } />;
        }
    },

    render () {
        if (this.data.user) {
            return <LoggedIn />;
        }

        if (this.data.tokenExpired) {
            /*
             * @todo Not sure if this might happen. Just placed here to disscus and take into account.
             * This case is not handled!!!
             */
            return (
                <div className="ui large top attached segment">
                    <h2 className="ui center aligned dividing header"><T>token_expired_title</T></h2>
                    <T>token_expired_text</T>
                </div>
            );
        }

        if (this.state.passwordChanged) {
            /*
             * @todo This case will not happen cause Account.resetPassword logs user in automaticly,
             * just after password change.
             * Placed here jsut to disscuss if we want to pass messaged that operation was successful.
             * This case is not handled!!!
             */
            return (
                <div className="ui large top attached segment">
                    <h2 className="ui center aligned dividing header"><T>password_changed</T></h2>
                    <T>try_login</T>
                </div>
            );
        }

        return (
            <div>
                <div className="ui large top attached segment">

                    { this.renderErrorMessages() }

                    <h2 className="ui center aligned dividing header"><T>change_password</T></h2>

                    <form onSubmit={this.handleSubmit}
                          className={'ui form' + (this.state.loading ? ' loading' : '')}
                          ref="form">

                        <div className="required field">
                            <label><T>password</T></label>

                            <div className="ui fluid input">
                                <input
                                    type="password"
                                    placeholder={ i18n.__('accounts-ui', 'password') }
                                    ref="password"/>
                            </div>
                        </div>

                        <div>
                            <div className="required field">
                                <label><T>repeat_password</T></label>

                                <div className="ui fluid input">
                                    <input
                                        type="password"
                                        placeholder={ i18n.__('accounts-ui', 'repeat_password') }
                                        ref="password2"/>
                                </div>
                            </div>
                            <label><T>password_requirements</T></label>
                        </div>

                        <button type="submit"
                                className="ui fluid large primary button">
                            <T>set_password</T>
                        </button>
                    </form>
                </div>

                {this.props.registerLink ?
                    <div className="ui large bottom attached info icon message">
                        <i className="user icon"></i>
                        <T>dont_have_an_account</T>
                        <a href={this.props.registerLink}>&nbsp;<T>register_here</T></a>
                    </div>
                    : ''}
            </div>
        );
    }
});
