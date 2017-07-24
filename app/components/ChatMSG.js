import React from 'react';

export default class ChatMSG extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="messageComp" style={{float: this.props.userID === this.props.docID ? 'left': 'right', backgroundColor: this.props.userID === this.props.docID ? '#7044af': '#0076ad' }}>
      	  <span className="sent">{this.props.sent}</span>
	      <img className="chatPhoto" src={this.props.photo || './images/default.png'}/>
	      <span className="from">{this.props.from}</span>
	      <br/> 
	      {this.props.message}
        {this.props.file && <img className="chatImg" src={this.props.file} alt="sent image"/>}
      </div>
    );
  }
}
