/*global ReactMeteorData */

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

                    <h2 className="ui center aligned dividing header">
                        <T>sign_up</T>
                    </h2>

                    <RegisterForm />

                </div>

                {this.props.loginLink ?
                    <div className="ui bottom attached info message">
                        <i className="user icon"></i>
                        <T>already_have_an_account</T>
                        <a href={this.props.loginLink}><T>click_to_login</T></a>
                    </div>
                    : ''}

            </div>
        );
    }
});