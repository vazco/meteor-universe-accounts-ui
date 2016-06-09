import utils from '../utils';
import OAuthButton from './OAuthButton';
import PasswordForm from './PasswordForm';
import i18n from '{universe:i18n}';

//instance of translate component in "accounts-ui" namespace
const T = i18n.createComponent(i18n.createTranslator('accounts-ui'));

export default React.createClass({
    displayName: 'RegisterForm',
    propTypes: {
        clearErrors: React.PropTypes.func.isRequired,
        onError: React.PropTypes.func.isRequired,
        passwordStrengthCheck: React.PropTypes.bool,
        termsLink: React.PropTypes.string
    },
    render () {
        let services = utils.getServiceNames();
        const { clearErrors, onError } = this.props;
        return (
            <div className="ui form">
                <div>
                    {services.map(service => {
                        return (
                            <OAuthButton
                                service={service}
                                text={`${i18n.__('accounts-ui', 'sign_up_with')} ${utils.capitalize(service)}`}
                                key={service}
                                />
                        );
                    })}
                </div>

                {services.length > 0 && utils.hasPasswordService() ?
                    <div className="ui horizontal divider"><T>sign_up_with_email</T></div> : ''
                }

                {utils.hasPasswordService() ?
                    <PasswordForm
                        type="register"
                        onError={ onError }
                        clearErrors={ clearErrors }
                        passwordStrengthCheck={this.props.passwordStrengthCheck}
                        termsCheckbox={this.props.termsCheckbox}
                        termsLink={this.props.termsLink}
                      /> : ''
                }
            </div>
        );
    }
});