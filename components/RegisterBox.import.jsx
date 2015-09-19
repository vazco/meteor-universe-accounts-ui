/*global ReactMeteorData */

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

                    <h2 className="ui center aligned dividing header">Sign Up</h2>

                    <RegisterForm />

                </div>

                {this.props.loginLink ?
                    <div className="ui bottom attached info message">
                        <i className="user icon"></i>
                        Already have an account? <a href={this.props.loginLink}>Click to login.</a>
                    </div>
                    : ''}

            </div>
        );
    }
});