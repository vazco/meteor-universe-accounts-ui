/*global ReactMeteorData */

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import LoggedIn from './LoggedIn';
import i18n from '{universe:i18n}';

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

                            <LoginForm />
                        </div>
                        <div className="ui vertical divider">
                            <T>or</T>
                        </div>
                        <div className="column">
                            <h2 className="ui center aligned dividing header"><T>sign_up</T></h2>

                            <RegisterForm />
                        </div>
                    </div>
                </div>

                {this.props.resetLink ?
                    <div className="ui bottom attached info message">
                        <i className="user icon"></i>
                        <T>forgot_your_password</T><a href={this.props.resetLink}><T>click_to_reset</T></a>
                    </div>
                    : ''}
            </div>
        );
    }
});