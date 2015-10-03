Package.describe({
    name: 'universe:accounts-ui',
    version: '0.1.0',
    summary: 'Accounts UI replacement for Universe using React and Semantic UI',
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.2.0.2');

    api.use([
        'universe:modules',
        'universe:i18n',
        'react-meteor-data',
        'service-configuration',
        'accounts-base'
    ]);

    // Export Accounts (etc) to packages using this one.
    api.imply('accounts-base');

    // Allow us to call Accounts.oauth.serviceNames, if there are any OAuth services.
    // Allow us to directly test if accounts-password (which doesn't use Accounts.oauth.registerService) exists.
    api.use([
        'accounts-oauth',
        'accounts-password'
    ], {weak: true});

    api.addFiles([
        'utils.import.js',
        'components/ComboBox.import.jsx',
        'components/LoggedIn.import.jsx',
        'components/LoginBox.import.jsx',
        'components/LoginForm.import.jsx',
        'components/OAuthButton.import.jsx',
        'components/PasswordForm.import.jsx',
        'components/RegisterBox.import.jsx',
        'components/RegisterForm.import.jsx',
        'components/ResetPasswordBox.import.jsx',
        'i18n/en.i18n.json',
        'i18n/ru.i18n.json',
        'index.import.jsx'
    ]);
});
