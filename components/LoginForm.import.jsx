import utils from '../utils';
import OAuthButton from './OAuthButton';
import PasswordForm from './PasswordForm';
import i18n from '{universe:i18n}';

//instance of translate component in "accounts-ui" namespace
const T = i18n.createComponent(i18n.createTranslator('accounts-ui'));

export default React.createClass({
    displayName: 'LoginForm',
    render () {
        let services = utils.getServiceNames();
        //`Sign in with ${utils.capitalize(service)}`
        return (
            <div className="ui form">
                <div>
                    {services.map(service => {
                        return (
                            <OAuthButton
                                service={service}
                                text={`${i18n.__('accounts-ui', 'sign_in_with')} ${utils.capitalize(service)}`}
                                key={service}
                                />
                        );
                    })}
                </div>

                {services.length > 0 && utils.hasPasswordService() ?
                    <div className="ui horizontal divider"><T>sign_in_with_email</T></div> : ''
                }

                {utils.hasPasswordService() ?
                    <PasswordForm type="login"/> : ''
                }

            </div>
        );
    }
});