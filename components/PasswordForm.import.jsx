import utils from '../utils';

export default React.createClass({
    displayName: 'PasswordForm',
    propTypes: {
        type: React.PropTypes.oneOf(['login', 'register']).isRequired
    },
    getInitialState () {
        return {
            loading: false,
            error: null
        };
    },
    handleSubmit (e) {
        e.preventDefault();

        if (this.props.type === 'login') {
            // log in / sign in

            this.setState({loading: true});

            Meteor.loginWithPassword(
                this.refs.email.getDOMNode().value,
                this.refs.password.getDOMNode().value,
                (err) => {
                    this.setState({loading: false});

                    if (err && err.error === 400) {
                        this.setState({error: 'Invalid username or password'});
                    } else if (err) {
                        this.setState({error: (err.reason || 'Unknown error')});
                    } else {
                        this.setState({error: null});
                    }
                }
            );
        } else {
            // register / sign up

            if (this.refs.password.getDOMNode().value !== this.refs.password2.getDOMNode().value) {
                this.setState({error: `Passwords don't match`});
                return;
            }

            this.setState({loading: true});

            Accounts.createUser({
                email: this.refs.email.getDOMNode().value,
                password: this.refs.password.getDOMNode().value
            }, (err) => {
                this.setState({loading: false});
                if (err) {
                    this.setState({error: (err.reason || 'Unknown error')});
                } else {
                    this.setState({error: null});
                    this.refs.form.getDOMNode().reset();
                }
            });
        }
    },
    render () {
        if (!utils.hasPasswordService()) {
            return <div></div>;
        }
        let isRegistration = (this.props.type === 'register');

        return (
            <form onSubmit={this.handleSubmit}
                  className={'ui form' + (this.state.loading ? ' loading' : '')}
                  ref="form">

                <div className="required field">
                    <label>Email</label>

                    <div className="ui fluid input">
                        <input type="email"
                               placeholder="Email"
                               ref="email"
                            />
                    </div>
                </div>

                <div className="required field">
                    <label>Password</label>

                    <div className="ui fluid input">
                        <input
                            type="password"
                            placeholder="Password"
                            ref="password"/>
                    </div>
                </div>

                {isRegistration ?
                    <div className="required field">
                        <label>Repeat password</label>

                        <div className="ui fluid input">
                            <input
                                type="password"
                                placeholder="Repeat password"
                                ref="password2"/>
                        </div>
                    </div>
                    : ''}

                {this.state.error ?
                    <div className="ui negative message">
                        <p>{this.state.error}</p>
                    </div> : ''}

                <button type="submit"
                        className="ui fluid large primary button">
                    {isRegistration ? 'Sign up' : 'Sign in'}
                </button>
            </form>
        );
    }
});