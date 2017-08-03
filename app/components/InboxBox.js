import React from 'react';
import axios from 'axios';
import moment from 'moment';
import InboxMessage from './InboxMessage';


export default class InboxBox extends React.Component {

  constructor(props) {
    super(props);
    this.state={
    	results:{},
    	message:'',
    	yourMSG:'',
    	connID:'',
    	playing: false
    }
    //this.getFriend = this.getFriend.bind(this);
    this.renderInbox = this.renderInbox.bind(this);
    this.getConn = this.getConn.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deleteThis = this.deleteThis.bind(this);
  }

  deleteThis(msg){
  	let info={
  		message: msg
  	}
  	axios.put('/delete-comment/'+this.state.connID, info).then(res=>{
  		this.setState({
  			message: 'message deleted'
  		})
  		this.getConn();

  	}).catch( err=>{
  		this.setState({
  			message: 'messsage delete failed'
  		})
  	});
  }


  getConn(){

  	this.setState({
  		results: {}
  	});

  	let info = { user1: this.props.user.username,
  				user2: this.props.favoriteInfo.username}
  	//console.log('info', info);

  	axios.post('/getconn', info ).then( res=>{
  		//console.log('getConn results', res.data);
  		this.setState({
  			results: res.data,
  			connID: res.data._id
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

  	if(self.state.results){

  		  	let newMSG={
		  		author:self.props.user.username,
		  		message: self.state.yourMSG,
		  		sent: moment().format('h:mm:ss a'),
		  		read: false
		  	}
		  	axios.put('/conn/'+self.state.connID, newMSG).then(res =>{
		  		self.setState({
		  			message: 'message sent!'
		  		})
		  		self.getConn();

		  	}).catch(err=>{
		  		self.setState({
		  			message: 'message failed'
		  		})
		  	});

		  	self.getConn(e.target.value);

		  }else{
		  	var newConn={
					conn: [self.props.user.username, self.props.favoriteInfo.username],
					messages:[{
							author:self.props.user.username,
					  		message: self.state.yourMSG,
					  		sent: moment().format('h:mm:ss a'),
					  		read: false
					  		}]
					  	}

		  	axios.post('/conn/'+self.props.user._id, newConn).then(res=>{
		  		self.getConn();
		  		self.setState({
		  			message: 'message sent!'
		  		});
		  		self.getConn();
		  	}).catch(err=>{
		  		self.setState({
		  			message: 'message failed'
		  		})
		  	});
		  }

  }

  componentDidMount(){

  	var self = this;

  	setInterval(function(){ 
  		if(self.props.favoriteInfo.username){
  			self.getConn();
  		}
  	 }, 60000);
  }

  renderInbox(){
  	return(
  		<div>
  			
	  		<h4 className="purpleText"><span className="glyphicon glyphicon-envelope" aria-hidden="true"></span> Inbox</h4>
	      	
	      	{this.props.favoriteInfo.username && <h3 className="whiteText">{this.props.favoriteInfo.username}'s messages</h3>}
	      	{this.props.favoriteInfo.username && <button type="button" onClick={()=>{this.getConn()}} className="btn connButton"><span className="glyphicon glyphicon-refresh" aria-hidden="true"></span></button>}

	      	<div id='inboxContainer' className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 well InboxCont">
	      		{this.props.user.name && this.state.results.messages && this.state.results.messages.map( (doc,index)=>{
	      			return <InboxMessage key={index} number={index+1} deleteThis={this.deleteThis} user={this.props.user} read={doc.read} author={doc.author} message={doc.message} sent={doc.sent}/>
	      		})}
	      	</div>
	      	<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
	      		{this.props.favoriteInfo.username && <h5 className="purpleText">Send a message to @{this.props.favoriteInfo.username}</h5>}
	      		{this.props.favoriteInfo.username && 
	      			<form onSubmit={(e)=>{this.handleSubmit(e)} }>
		      			<textarea rows="4" id='inboxInput' className="themeInput" type='text' placeholder="type here..." onChange={this.handleChange}/>
		      			<button className="btn connButton" type="submit"><span className="glyphicon glyphicon-pencil" aria-hidden="true"></span> Send</button>
		      			<p className="purpleText">{this.state.message}</p>
	      			</form>}
	      	</div>
      	</div>
  		)
  }

  render() {
    return (
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 rainYellow clearBoth" style={{borderRadius:'10px'}}>
      	{this.props.user.name && this.renderInbox()}
      </div>
    );
  }
}
