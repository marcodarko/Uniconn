import React from 'react';

export default class PrivateChatMSG extends React.Component {


  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="privateMSG text-left" style={{backgroundColor: this.props.user.username === this.props.from ? '#2087d8': '#e43e5f',float: this.props.user.username === this.props.from ? 'left': 'right'}}>
      	<span className="privateMSGsent">{this.props.sent}</span>
		<p>
			<b>{this.props.from}:</b> {this.props.message}
		</p>
		{this.props.photo && <img src={this.props.photo} alt="sent image"/>}
	</div>
    );
  }
}
