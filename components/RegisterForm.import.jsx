import utils from '../utils';
import OAuthButton from './OAuthButton';
import PasswordForm from './PasswordForm';

export default React.createClass({
    displayName: 'RegisterForm',
    render () {
        let services = utils.getServiceNames();

        return (
            <div className="ui form">
                <div>
                    {services.map(service => {
                        return (
                            <OAuthButton
                                service={service}
                                text={`Sign up with ${utils.capitalize(service)}`}
                                key={service}
                                />
                        );
                    })}
                </div>

                {services.length > 0 && utils.hasPasswordService() ?
                    <div className="ui horizontal divider">Sign up with Email</div> : ''
                }

                {utils.hasPasswordService() ?
                    <PasswordForm type="register"/> : ''
                }
            </div>
        );
    }
});