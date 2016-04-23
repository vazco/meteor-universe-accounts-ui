import React from 'react';
import i18n from 'meteor/universe:i18n';
//instance of translate component in "accounts-ui" namespace
const T = i18n.createComponent(i18n.createTranslator('accounts-ui'));

export default React.createClass({
    displayName: 'LoggedIn',
    render () {
        return (
            <div className="ui large form segment">

                <h2 className="ui center aligned dividing header"><T>youre_logged_in</T></h2>

                <button onClick={() => Meteor.logout()}
                        className="ui fluid large primary button">
                    <T>click_to_log_out</T>
                </button>

            </div>
        );
    }
});