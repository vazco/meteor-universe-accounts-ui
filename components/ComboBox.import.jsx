/*global ReactMeteorData */

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import LoggedIn from './LoggedIn';

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
                            <h2 className="ui center aligned dividing header">Sign In</h2>

                            <LoginForm />
                        </div>
                        <div className="ui vertical divider">
                            Or
                        </div>
                        <div className="column">
                            <h2 className="ui center aligned dividing header">Sign Up</h2>

                            <RegisterForm />
                        </div>
                    </div>
                </div>

                {this.props.resetLink ?
                    <div className="ui bottom attached info message">
                        <i className="user icon"></i>
                        Forgot your password? <a href={this.props.resetLink}>Click to reset.</a>
                    </div>
                    : ''}
            </div>
        );
    }
});