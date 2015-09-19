/*global ReactMeteorData */

import LoggedIn from './LoggedIn';

export default React.createClass({
    displayName: 'ResetPasswordBox',
    mixins: [ReactMeteorData],
    propTypes: {
        registerLink: React.PropTypes.string
    },
    getMeteorData () {
        return {
            user: Meteor.user()
        };
    },
    getInitialState () {
        return {
            loading: false,
            error: null,
            emailSent: false,
        };
    },
    handleSubmit (e) {
        e.preventDefault();

        let email = this.refs.email.getDOMNode().value;

        if (!email) {
            this.setState({error: 'You need to provide email'});
            return;
        }

        this.setState({
            loading: true,
            error: null
        });

        Accounts.forgotPassword({email}, err => {
            if (err) {
                this.setState({
                    error: err.reason || err.message,
                    loading: false
                });
                return;
            }

            this.setState({
                error: null,
                loading: false,
                emailSent: true
            });
        });
    },
    render () {
        if (this.data.user) {
            return <LoggedIn />;
        }

        if (this.state.emailSent) {
            return (
                <div className="ui large top attached segment">
                    <h2 className="ui center aligned dividing header">Email sent</h2>

                    <p>Check your inbox for further instructions</p>
                </div>
            );
        }

        return (
            <div>
                <div className="ui large top attached segment">

                    <h2 className="ui center aligned dividing header">Reset password</h2>

                    <form onSubmit={this.handleSubmit}
                          className={'ui form' + (this.state.loading ? ' loading' : '')}
                          ref="form">

                        <div className="required field">
                            <label>Your Email</label>

                            <div className="ui fluid input">
                                <input type="email"
                                       placeholder="Email"
                                       ref="email"
                                    />
                            </div>
                        </div>

                        {this.state.error ?
                            <div className="ui negative message">
                                <p>{this.state.error}</p>
                            </div> : ''}

                        <button type="submit"
                                className="ui fluid large primary button">
                            Send reset link
                        </button>
                    </form>
                </div>

                {this.props.registerLink ?
                    <div className="ui bottom attached info message">
                        <i className="user icon"></i>
                        Don't have an account? <a href={this.props.registerLink}>Register here.</a>
                    </div>
                    : ''}
            </div>
        );
    }
});