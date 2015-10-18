Package.describe({
    name: 'universe:accounts-ui',
    version: '0.1.0',
    summary: 'Accounts UI replacement for Universe using React and Semantic UI',
    documentation: 'README.md',
    git: 'https://github.com/vazco/meteor-universe-accounts-ui'
});

Package.onUse(function (api) {
    api.versionsFrom('1.2.0.2');

    api.use([
        'universe:modules@0.5.0',
        'universe:i18n@1.1.0',
        'react-meteor-data@0.1.9',
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
        'components/ErrorMessages.import.jsx',
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
