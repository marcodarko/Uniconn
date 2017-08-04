import React from 'react';
import axios from 'axios';
import FaveResultItem from './FaveResultItem';
import MessagesBox from './MessagesBox';
import PrivateMessageBox from './PrivateMessageBox';

export default class FaveBox extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      renderThis:'general'
    }
    this.renderPrivate = this.renderPrivate.bind(this);
    this.renderGeneral = this.renderGeneral.bind(this);
  }

  renderPrivate(){
    this.setState({
      renderThis:'private'
    })
  }

  renderGeneral(){
    this.setState({
      renderThis:'general'
    })
  }

  render() {
    return (
      <div className="col-xs-12 col-sm-8 col-md-8 col-lg-8 col-xl-8 text-center">
        <h4>Chat Rooms</h4>
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
          <button className="btn connButton " type="button" onClick={this.renderPrivate}>Matches Chat</button>
        </div>
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
          <button className="btn connButton " type="button" onClick={this.renderGeneral}>General Chat</button>
        </div>
        <br/>	  			
	  		{this.state.renderThis === 'general' && <MessagesBox user={this.props.user} updateUser={this.props.updateUser}/>}
        {this.state.renderThis === 'private' && <PrivateMessageBox user={this.props.user} updateUser={this.props.updateUser}/>}
	  </div>	
    );
  }
}
