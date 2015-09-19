export default {
    capitalize (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    getServiceNames () {
        if (!Package['accounts-oauth']) {
            // no oauth package so no services
            return [];
        }
        return Accounts.oauth.serviceNames().sort();
    },
    hasPasswordService () {
        return !!Package['accounts-password'];
    },
    performOAuthLogin (service, cb) {
        try {
            // @todo this can be done better, multi word services may not work
            // @todo options need to passed from Accounts.ui.config
            Meteor[`loginWith${this.capitalize(service)}`]({}, cb);
        } catch (e) {
            cb(e);
        }
    }
};