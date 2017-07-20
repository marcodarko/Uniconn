import React from 'react';
import ChatMSG from './ChatMSG';
import moment from 'moment';

export default class MessagesBox extends React.Component {

  constructor(props) {
    super(props);
    this.state={
    	socket: window.io(),
    	messages:[],
    	userMSG:'',
      decodedImage: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getMessageValue = this.getMessageValue.bind(this);
    this.getImage = this.getImage.bind(this);
  }

  getMessageValue(e){
  		this.setState({
  			userMSG: e.target.value.trim()
  		})
  }

  componentDidMount(){
  	var self = this;
  	self.state.socket.on('get message', function(msg){

  		//console.log("got msg back", msg);

  		let newMsgArray = self.state.messages;
  		newMsgArray.push(msg);

  		self.setState({
  			messages: newMsgArray
  		})
  	})


  }

  handleSubmit(e){
  	e.preventDefault();
  	let newMessage={
  		from: this.props.user.username,
  		message: this.state.userMSG,
  		sent: moment().format('h:mm:ss a'),
  		fromID: this.props.user._id,
  		photo: this.props.user.photo
  	}
  	//console.log('msg', newMessage);
  	this.state.socket.emit('chat message', newMessage);
  }

  getImage(e){
    e.preventDefault();

    var self = this;

    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function(evt){
        var msg={};
        msg.file = evt.target.result;
        msg.image = true;
        msg.from = self.props.user.username;
        msg.fromID = self.props.user._id;
        msg.photo = self.props.user.photo;
        msg.sent = moment().format('h:mm:ss a');

        self.state.socket.emit('chat message', msg);
    };
    reader.readAsDataURL(file);
  }



  render() {
  	var self =this;
    return (
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 backOrange messageBox">
	  	<div id="messages" className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 well">
	  		{/*<div className="myMSG"><strong>Me: </strong> message</div>
	  		<div className="otherMSG"><strong>User: </strong> message</div>*/}
	  		
  			{self.state.messages && self.state.messages.map( (doc,index)=>{
  				return <ChatMSG file={doc.file} userID={this.props.user._id} docID={doc.fromID} key={index} from={doc.from} message={doc.message} photo={doc.photo} sent={doc.sent}/>
  			})}
	  		
	  	</div>
	  	<div className="input-group" className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
	  		<form id='chat' onSubmit={self.handleSubmit}>
	  			<input autoComplete='off' type="text" id="chatMSG" className="form-control" onChange={self.getMessageValue}></input>
	  			<button className="connButton"><span className="glyphicon glyphicon-pencil" aria-hidden="true"></span> Send</button>
	  		</form>
        <form >
          <input className="form-control" type="file" accept="image/*" onChange={this.getImage}/>
        </form>
	  	</div>
      </div>
    );
  }
}
