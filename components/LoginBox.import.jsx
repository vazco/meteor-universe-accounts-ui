/*global ReactMeteorData */

import LoginForm from './LoginForm';
import LoggedIn from './LoggedIn';
import i18n from '{universe:i18n}';

//instance of translate component in "accounts-ui" namespace
const T = i18n.createComponent(i18n.createTranslator('accounts-ui'));

export default React.createClass({
    displayName: 'LoginBox',
    mixins: [ReactMeteorData],
    getMeteorData () {
        return {
            user: Meteor.user()
        };
    },
    propTypes: {
        registerLink: React.PropTypes.string,
        resetLink: React.PropTypes.string
    },
    render () {
        if (this.data.user) {
            return <LoggedIn />;
        }

        return (
            <div>
                <div className="ui large top attached segment">

                    <h2 className="ui center aligned dividing header"><T>sign_in</T></h2>

                    <LoginForm />
                </div>

                {(this.props.registerLink || this.props.resetLink) ?
                    <div className="ui bottom attached info icon message">
                        <i className="user icon"></i>

                        <div className="content">
                            <ul className="list">
                                {this.props.registerLink ?
                                    <li><T>dont_have_an_account</T><a href={this.props.registerLink}><T>register_here</T></a></li>
                                    : ''}
                                {this.props.resetLink ?
                                    <li><T>forgot_your_password</T><a href={this.props.resetLink}><T>click_to_reset</T></a></li>
                                    : ''}
                            </ul>
                        </div>
                    </div>
                    : ''}
            </div>
        );
    }
});