export default React.createClass({
    displayName: 'LoggedIn',
    render () {
        return (
            <div className="ui large form segment">

                <h2 className="ui center aligned dividing header">You're logged in</h2>

                <button onClick={() => Meteor.logout()}
                        className="ui fluid large primary button">
                    Click to log out!
                </button>

            </div>
        );
    }
});