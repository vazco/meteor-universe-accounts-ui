import React from 'react';
/*global ReactMeteorData */
import ErrorMessages from './ErrorMessages.jsx';
import LoginForm from './LoginForm.jsx';
import LoggedIn from './LoggedIn.jsx';
import utils from '../utils';
import i18n from 'meteor/universe:i18n';

//instance of translate component in "accounts-ui" namespace
const T = i18n.createComponent(i18n.createTranslator('accounts-ui'));

export default React.createClass({
    displayName: 'LoginBox',
    propTypes: {
        registerLink: React.PropTypes.string,
        resetLink: React.PropTypes.string
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

                    <h2 className="ui center aligned dividing header"><T>sign_in</T></h2>

                    <LoginForm
                      onError={ utils.onError.bind(this) }
                      clearErrors={ utils.clearErrors.bind(this) }
                      />
                </div>

                {(this.props.registerLink || this.props.resetLink) ?
                    <div className="ui large bottom attached info icon message">
                        <i className="user icon"></i>

                        <div className="content">
                            <div className="ui list">
                                {this.props.registerLink ?
                                    <div className="item"><T>dont_have_an_account</T><a href={this.props.registerLink}><T>register_here</T></a></div>
                                    : ''}
                                {this.props.resetLink ?
                                    <div className="item"><T>forgot_your_password</T><a href={this.props.resetLink}><T>click_to_reset</T></a></div>
                                    : ''}
                            </div>
                        </div>
                    </div>
                    : ''}

                { this.renderErrorMessages() }
            </div>
        );
    }
});