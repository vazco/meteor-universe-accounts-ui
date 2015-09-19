/*global ReactMeteorData */

import LoginForm from './LoginForm';
import LoggedIn from './LoggedIn';

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

                    <h2 className="ui center aligned dividing header">Sign In</h2>

                    <LoginForm />
                </div>

                {(this.props.registerLink || this.props.resetLink) ?
                    <div className="ui bottom attached info icon message">
                        <i className="user icon"></i>

                        <div className="content">
                            <ul className="list">
                                {this.props.registerLink ?
                                    <li>Don't have an account? <a href={this.props.registerLink}>Register here.</a></li>
                                    : ''}
                                {this.props.resetLink ?
                                    <li>Forgot your password? <a href={this.props.resetLink}>Click to reset.</a></li>
                                    : ''}
                            </ul>
                        </div>
                    </div>
                    : ''}
            </div>
        );
    }
});