import React from 'react';
import axios from 'axios';
import moment from 'moment';
import InboxMessage from './InboxMessage';

export default class InboxBox extends React.Component {

  constructor(props) {
    super(props);
    this.state={
    	selectedFriend:'',
    	results:[],
    	message:'',
    	yourMSG:'',
    	connID:''
    }
    this.getFriend = this.getFriend.bind(this);
    this.renderInbox = this.renderInbox.bind(this);
    this.getConn = this.getConn.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getFriend(e){
  	document.getElementById('inboxContainer').innerHTML = '';
  	this.setState({
  		selectedFriend: e.target.value
  	});
  	this.getConn(e.target.value);

  }

  getConn(friendUsername){
  	let info = { user1: this.props.user.username,
  				user2: friendUsername}
  	console.log('info', info);

  	axios.post('/getconn', info ).then( res=>{
  		console.log('getConn results', res.data);
  		this.setState({
  			results: res.data[0],
  			connID: res.data[0]._id
  		});
  		
  	}).catch(err=>{
  		console.log(err);
  	});

  }

  handleChange(e){

  	this.setState({
  		message:'',
  		yourMSG: e.target.value.trim()
  	});

  }



  handleSubmit(e){
  	e.preventDefault();
  	var self = this;
  	document.getElementById('inboxInput').value = '';
  	//console.log('this', self);
  	//var check = self.getConn(self.state.selectedFriend);
  	console.log('check results',self.state.results );
  	if(self.state.results){

  		  	let newMSG={
		  		author:self.props.user.username,
		  		message: self.state.yourMSG,
		  		sent: moment().format('h:mm:ss a')
		  	}
		  	axios.put('/conn/'+self.state.connID, newMSG).then(res =>{
		  		self.setState({
		  			message: 'message sent!'
		  		})
		  	}).catch(err=>{
		  		self.setState({
		  			message: 'message failed'
		  		})
		  	});

		  	this.getConn(e.target.value);

		  }else{
		  	var newConn={
					conn: [self.props.user.username, self.state.selectedFriend],
					messages:[{
							author:self.props.user.username,
					  		message: self.state.yourMSG,
					  		sent: moment().format('h:mm:ss a')
					  		}]
					  	}

		  	axios.post('/conn/'+self.props.user._id, newConn).then(res=>{
		  		self.getConn();
		  		self.setState({
		  			message: 'message sent!'
		  		})
		  	}).catch(err=>{
		  		self.setState({
		  			message: 'message failed'
		  		})
		  	});
		  }

  }

  renderInbox(){
  	return(
  		<div>
	  		<h4 className="purpleText"><span className="glyphicon glyphicon-envelope" aria-hidden="true"></span> Inbox</h4>
	      	<select onChange={this.getFriend}>
	      		<option disabled value=''>select a friend</option>
	      		{this.props.user.name && this.props.user.friends.map( (doc,index)=>{
	      			return <option key={index} value={doc}>{doc}</option>
	      		})}
	      	</select>
	      	<br/>
	      	<br/>
	      	<div id='inboxContainer' className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 well InboxCont">
	      		{this.props.user.name && this.state.results.messages && this.state.results.messages.map( (doc,index)=>{
	      			return <InboxMessage key={index} number={index+1} user={this.props.user} author={doc.author} message={doc.message} sent={doc.sent}/>
	      		})}
	      	</div>
	      	<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
	      		{this.state.selectedFriend && <h5 className="purpleText">Send a message to @{this.state.selectedFriend}</h5>}
	      		{this.state.selectedFriend && 
	      			<form onSubmit={(e)=>{this.handleSubmit(e)} }>
		      			<input id='inboxInput' className="themeInput" type='text' placeholder="type here..." onChange={this.handleChange}/>
		      			<button className="btn connButton" type="submit"><span className="glyphicon glyphicon-pencil" aria-hidden="true"></span> Send</button>
		      			<p className="whiteText">{this.state.message}</p>
	      			</form>}
	      	</div>
      	</div>
  		)
  }

  render() {
    return (
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 backYellow clearBoth">
      	{this.props.user.name && this.renderInbox()}
      </div>
    );
  }
}
