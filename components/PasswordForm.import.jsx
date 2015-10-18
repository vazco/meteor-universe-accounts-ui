import utils from '../utils';
import i18n from '{universe:i18n}';

//instance of translate component in "accounts-ui" namespace
const T = i18n.createComponent(i18n.createTranslator('accounts-ui'));

export default React.createClass({
    displayName: 'PasswordForm',
    propTypes: {
        clearErrors: React.PropTypes.func.isRequired,
        onError: React.PropTypes.func.isRequired,
        type: React.PropTypes.oneOf(['login', 'register']).isRequired
    },
    getInitialState () {
        return {
            loading: false
        };
    },
    handleSubmit (e) {
        e.preventDefault();

        const { clearErrors, onError } = this.props;

        if (this.props.type === 'login') {
            // log in / sign in

            this.setState({loading: true});

            Meteor.loginWithPassword(
                this.refs.email.getDOMNode().value,
                this.refs.password.getDOMNode().value,
                (err) => {
                    // let errors = this.state.errors;
                    this.setState({loading: false});

                    if (err && err.error === 400) {
                        onError(i18n.__('accounts-ui', 'invalid_usename_or_password'));
                    } else if (err) {
                        onError(err.reason || i18n.__('accounts-ui', 'unknown_error'));
                    } else {
                        clearErrors();
                    }
                }
            );
        } else {
            // register / sign up

            if (this.refs.password.getDOMNode().value !== this.refs.password2.getDOMNode().value) {
                onError(i18n.__('accounts-ui', 'passwords_dont_match'));

                return;
            }

            this.setState({loading: true});

            Accounts.createUser({
                email: this.refs.email.getDOMNode().value,
                password: this.refs.password.getDOMNode().value
            }, (err) => {
                this.setState({loading: false});
                if (err) {
                    onError(err.reason || i18n.__('accounts-ui', 'unknown_error'));
                } else {
                    clearErrors();
                    // this.refs.form.getDOMNode().reset();
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
                  className={'ui large form' + (this.state.loading ? ' loading' : '')}
                  ref="form">

                <div className="required field">
                    <label><T>email</T></label>
                    <input type="email"
                           placeholder={ i18n.__('accounts-ui', 'email') }
                           ref="email"
                        />
                </div>

                <div className="required field">
                    <label><T>password</T></label>
                    <input
                        type="password"
                        placeholder={ i18n.__('accounts-ui', 'password') }
                        ref="password"/>
                </div>

                {isRegistration ?
                    <div className="required field">
                        <label><T>repeat_password</T></label>
                        <input
                            type="password"
                            placeholder={ i18n.__('accounts-ui', 'repeat_password') }
                            ref="password2"/>
                    </div>
                    : ''}

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