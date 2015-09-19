import utils from '../utils';
import OAuthButton from './OAuthButton';
import PasswordForm from './PasswordForm';

export default React.createClass({
    displayName: 'LoginForm',
    render () {
        let services = utils.getServiceNames();
        return (
            <div className="ui form">
                <div>
                    {services.map(service => {
                        return (
                            <OAuthButton
                                service={service}
                                text={`Sign in with ${utils.capitalize(service)}`}
                                key={service}
                                />
                        );
                    })}
                </div>

                {services.length > 0 && utils.hasPasswordService() ?
                    <div className="ui horizontal divider">Sign in with Email</div> : ''
                }

                {utils.hasPasswordService() ?
                    <PasswordForm type="login"/> : ''
                }

            </div>
        );
    }
});