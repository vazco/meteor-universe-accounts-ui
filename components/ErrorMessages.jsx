import React from 'react';
export default React.createClass({  displayName: 'ErrorMessages',
  propTypes: {
    errors: React.PropTypes.array.isRequired
  },
  render() {
    return (
      <div className="ui large negative icon message">
        <i className="warning circle icon"/>
        <div className="content">
          <ui className="list">
            { this.props.errors.map((error, index) => {
              return <li key={ index }>{ error }</li>
            }) }
          </ui>
        </div>
      </div>
    );
  }
});
