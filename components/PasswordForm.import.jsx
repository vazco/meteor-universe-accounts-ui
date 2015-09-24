import utils from '../utils';
import i18n from '{universe:i18n}';

//instance of translate component in "accounts-ui" namespace
const T = i18n.createComponent(i18n.createTranslator('accounts-ui'));

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
                        this.setState({error: i18n.__('accounts-ui', 'invalid_usename_or_password')});
                    } else if (err) {
                        this.setState({error: (err.reason || i18n.__('accounts-ui', 'unknown_error'))});
                    } else {
                        this.setState({error: null});
                    }
                }
            );
        } else {
            // register / sign up

            if (this.refs.password.getDOMNode().value !== this.refs.password2.getDOMNode().value) {
                this.setState({error: i18n.__('accounts-ui', 'passwords_dont_match')});
                return;
            }

            this.setState({loading: true});

            Accounts.createUser({
                email: this.refs.email.getDOMNode().value,
                password: this.refs.password.getDOMNode().value
            }, (err) => {
                this.setState({loading: false});
                if (err) {
                    this.setState({error: (err.reason || i18n.__('accounts-ui', 'unknown_error'))});
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
                    <label><T>email</T></label>

                    <div className="ui fluid input">
                        <input type="email"
                               placeholder={ i18n.__('accounts-ui', 'email') }
                               ref="email"
                            />
                    </div>
                </div>

                <div className="required field">
                    <label><T>password</T></label>

                    <div className="ui fluid input">
                        <input
                            type="password"
                            placeholder={ i18n.__('accounts-ui', 'password') }
                            ref="password"/>
                    </div>
                </div>

                {isRegistration ?
                    <div className="required field">
                        <label><T>repeat_password</T></label>

                        <div className="ui fluid input">
                            <input
                                type="password"
                                placeholder={ i18n.__('accounts-ui', 'repeat_password') }
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
                    { isRegistration ?
                      i18n.__('accounts-ui', 'sign_up') :
                      i18n.__('accounts-ui', 'sign_in') }
                </button>
            </form>
        );
    }
});