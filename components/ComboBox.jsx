import React from 'react';
/*global ReactMeteorData */
import ErrorMessages from './ErrorMessages.jsx';
import LoginForm from './LoginForm.jsx';
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

        return (
            <div>
                <div className="ui large top attached segment">
                    <div className="ui two column very relaxed stackable grid">
                        <div className="column">
                            <h2 className="ui center aligned dividing header"><T>sign_in</T></h2>

                            <LoginForm
                              onError={ utils.onError.bind(this) }
                              clearErrors={ utils.clearErrors.bind(this) }
                              />
                        </div>
                        <div className="ui vertical divider">
                            <T>or</T>
                        </div>
                        <div className="column">
                            <h2 className="ui center aligned dividing header"><T>sign_up</T></h2>

                            <RegisterForm
                                onError={ utils.onError.bind(this) }
                                clearErrors={ utils.clearErrors.bind(this) }
                                />
                        </div>
                    </div>
                </div>

                {this.props.resetLink ?
                    <div className="ui large bottom attached info icon message">
                        <i className="user icon"></i>
                        <T>forgot_your_password</T><a href={this.props.resetLink}>&nbsp;<T>click_to_reset</T></a>
                    </div>
                    : ''}

                { this.renderErrorMessages() }
            </div>
        );
    }
});