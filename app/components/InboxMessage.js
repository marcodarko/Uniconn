import React from 'react';
import axios from 'axios';

export default class InboxMessage extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="InboxMessage whiteText" style={{backgroundColor: this.props.user.username === this.props.author ? '#46637a': '#4c4377'}}>
      	<span className='InboxSpan'>{this.props.sent}</span>
      	<span>{this.props.number} <span className="glyphicon glyphicon-envelope" aria-hidden="true"></span> from: <b style={{color: this.props.user.username === this.props.author ? 'lightpink': 'lightblue'}}>{this.props.author}</b></span><br/>
      	<p><strong>{this.props.message}</strong></p>
      	{this.props.author === this.props.user.username && <button className="btn trashButton" type="button" onClick={ ()=>{this.props.deleteThis(this.props.message)} }><span className="glyphicon glyphicon-trash" aria-hidden="true"></span></button>}
      </div>
    );
  }
}
