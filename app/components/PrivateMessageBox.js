import React from 'react';
import axios from 'axios';
import moment from 'moment';
import FaveResultItem from './FaveResultItem';
import PrivateChatMSG from './PrivateChatMSG';

export default class PrivateMessageBox extends React.Component {

  constructor(props) {
    super(props);
    this.state={
    	myfaves:[],
    	selectedFriend:'',
    	socket: window.io(),
    	messages: [],
    	userMsg: '',
    	status:''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getMessage = this.getMessage.bind(this);
    this.getImage = this.getImage.bind(this);
    this.renderPrivate = this.renderPrivate.bind(this);
    this.selectThis = this.selectThis.bind(this);
  }

  getMessage(e){
  	this.setState({
  		userMsg: e.target.value.trim()
  	});
  }

  handleChange(e){

  	this.setState({
  		selectedFriend: e.target.value,
  		status: 'private conn with @'+e.target.value
  	});
  }

  selectThis(friendUsername){
  	document.getElementById('myprivates').innerHTML = '';
  	this.setState({
  		selectedFriend: friendUsername,
  		status: 'private conn with @'+friendUsername
  	});
  }

  handleSubmit(e){
  	e.preventDefault();

  	 if(this.state.userMsg && this.state.selectedFriend){
  	 	var newMSG= {
		    to: this.state.selectedFriend,
		    from: this.props.user.username,
		    message: this.state.userMsg,
		    sent: moment().format('h:mm:ss a')
	   }
	   	document.getElementById('privInput').value='';

	   	let msgArray = this.state.messages;
    		msgArray.push(newMSG);
		   	this.setState({
		   		messages: msgArray
		   	});

  		this.state.socket.emit('private', newMSG);
  	 }else{
  	 	this.setState({
  	 		status: 'you must select a friend'
  	 	})
  	 }

  }

  componentDidMount(){
  	var self = this;

    self.state.socket.on('p message', function(data){
    	console.log('receiving private!', data);
    		let msgArray = self.state.messages;
    		msgArray.push(data);

      self.setState({
      	messages: msgArray
      });

    });

  }

    getImage(e){
    e.preventDefault();

    var self = this;

    if(self.state.selectedFriend){
    	var file = e.target.files[0];
	    var reader = new FileReader();
	    reader.onload = function(evt){

	    	var newMSG= {
			    to: self.state.selectedFriend,
			    from: self.props.user.username,
			    message: self.state.userMsg,
			    file: evt.target.result,
			    sent: moment().format('h:mm:ss a')
		   }

		   // let msgArray = self.state.messages;
    	// 	msgArray.push(newMSG);
		   // 	self.setState({
		   // 		messages: msgArray
		   // 	});

	        self.state.socket.emit('private', newMSG);
	    };
	    reader.readAsDataURL(file);
    }else{
    	self.setState({
  	 		status: 'you must select a friend'
  	 	})
    }

  }


  renderPrivate(){
  	return(
  		  <div>
      	  {this.props.user.name && <h4 className="whiteText">Private Chat</h4>}
      	  <div className='col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 privateList'>
      	  	{this.props.user.name && this.props.user.friends.map( (friend, index)=>{
      	  		return <button className='faveButton' key={index} value={friend}><FaveResultItem selectThis={this.selectThis} title={friend}  username={friend} /></button>
		    })}
      	  </div>
      	  <div className='col-xs-10 col-sm-10 col-md-10 col-lg-10 col-xl-10'>
      	  <form onSubmit={this.handleSubmit}>
	      	  {/*<select onChange={this.handleChange}>
	      	  <option value="">Choose Friend</option>
		      	  {this.props.user.name && this.props.user.friends.map( (friend, index)=>{
		      	  	return <option key={index} value={friend}>{friend}</option>
		      	  })}
	      	  </select>
	      	  <br/>
	      	  <br/>*/}
	      	  <input id="privInput" autoComplete='off' placeholder="Type here..." className="themeInput" type='text' onChange={this.getMessage}/>
	      	  <button type='submit' className="btn connButton">Send Private</button>
		  </form>
			 <form>
	          <label className='btn connButton' htmlFor="chatIMG"><span  className="glyphicon glyphicon-camera" aria-hidden="true"></span> Send Pics</label>
	          <input id="chatIMG" className="inputfile pinkBack whiteText" type="file" accept="image/*" onChange={this.getImage}/>
	        </form>
		  
		  	<h5 className="purpleText">{this.state.status}</h5>
	      <div id="myprivates" className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 well text-center privateMessageHeight" style={{borderRadius:'20px', backgroundColor:'#f2f2f2'}}>
	      	{this.state.messages && this.state.messages.map( (msg,index)=>{
	      		return <PrivateChatMSG key={index} photo={msg.file} user={this.props.user} sent={msg.sent} from={msg.from} message={msg.message} />
	      	})}
	      </div>
	     </div>
      	</div>
  		)
  }



  render() {
    return (
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 backBlue clearBoth privateContainer">
      	{this.props.user.name && this.renderPrivate()}
      </div>
    );
  }
}
