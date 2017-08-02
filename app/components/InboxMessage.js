import React from 'react';
import axios from 'axios';

export default class InboxMessage extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="InboxMessage purpleText" style={{backgroundColor: this.props.user.username === this.props.author ? 'lightyellow': '#ffcceb'}}>
      	<span className='InboxSpan'>{this.props.sent}</span>
      	<p>{this.props.number} <span className="glyphicon glyphicon-envelope" aria-hidden="true"></span> from: <b style={{color: this.props.user.username === this.props.author ? '#323232': 'hotpink'}}>{this.props.author}</b></p>
      	<hr style={{border: 'solid 1px #63d5eb'}}/>
      	<p><strong>{this.props.message}</strong></p>
      	{this.props.author === this.props.user.username && <button className="btn trashButton" type="button" onClick={ ()=>{this.props.deleteThis(this.props.message)} }><span className="glyphicon glyphicon-trash" aria-hidden="true"></span></button>}
      </div>
    );
  }
}
