System.config({
    packages: {
        '{universe:accounts-ui}': {
            main: 'main',
            format: 'register',
            map: {
                '.': System.normalizeSync('{universe:accounts-ui}')
            }
        }
    }
});
