import React from 'react';

export default class InboxMessage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="InboxMessage purpleText">
      	<span className='InboxSpan'>{this.props.sent}</span>
      	<p>{this.props.number} <span className="glyphicon glyphicon-envelope" aria-hidden="true"></span> from: <b>{this.props.author}</b></p>
      	<p><strong>{this.props.message}</strong></p>
      </div>
    );
  }
}
