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

      this.state.socket.emit('typing', this.props.user.username);

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

      document.getElementById('typingStatus').innerHTML= " ";

  		self.setState({
  			messages: newMsgArray
  		});

  	})

    self.state.socket.on('typing', function(data){
      document.getElementById('typingStatus').innerHTML= "<p><em>"+data+" is typing...</em></p>";
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
    document.getElementById('chatMSG').value= " " ;
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
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 rainOrange messageBox">
      {this.props.user.name && <h4 className="whiteText">General Chat</h4>}
	  	<div id="messages" className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 well">
	  		{/*<div className="myMSG"><strong>Me: </strong> message</div>
	  		<div className="otherMSG"><strong>User: </strong> message</div>*/}
	  		
  			{self.state.messages && self.state.messages.map( (doc,index)=>{
  				return <ChatMSG file={doc.file} userID={this.props.user._id} docID={doc.fromID} key={index} from={doc.from} message={doc.message} photo={doc.photo} sent={doc.sent}/>
  			})}
        <div id="typingStatus" className='purpleText col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'></div>
	  		
	  	</div>
	  	<div className="input-group" className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
         <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center">
            <form onSubmit={this.handleSubmit} className="" >
              <input autoComplete='off' id="chatMSG" type="text" className="themeInput" placeholder="Type here..." onChange={self.getMessageValue}/>
              <button style={{backgroundColor: 'hotpink', color:'white'}} className="btn connButton" type="submit">Send</button>
            </form>
          </div>
          <hr/>
        <form>
          <label className="btn connButton" htmlFor="chatIMG"><span  className="glyphicon glyphicon-camera " aria-hidden="true"></span> Send Pics</label>
          <input id="chatIMG" className="inputfile pinkBack whiteText" type="file" accept="image/*" onChange={this.getImage}/>
        </form>
	  	</div>
      </div>
    );
  }
}
