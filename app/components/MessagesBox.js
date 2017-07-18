import React from 'react';

export default class MessagesBox extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 backOrange messageBox">
	  	<div id="messages" className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 well">
	  		<div className="myMSG"><strong>Me: </strong> message</div>
	  		<div className="otherMSG"><strong>User: </strong> message</div>
	  		<div className="myMSG"><strong>Me: </strong> message</div>
	  		<div className="otherMSG"><strong>User: </strong> message</div>
	  		<div className="myMSG"><strong>Me: </strong> message</div>
	  		<div className="otherMSG"><strong>User: </strong> message</div>
	  		<div className="myMSG"><strong>Me: </strong> message</div>
	  		<div className="otherMSG"><strong>User: </strong> message</div>
	  		<div className="myMSG"><strong>Me: </strong> message</div>
	  		<div className="otherMSG"><strong>User: </strong> message</div>
	  	</div>
	  	<div className="input-group" className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
	  		<form>
	  			<input type="text" className="form-control"></input>
	  			<button type="button" className="connButton">Send</button>
	  		</form>
	  	</div>
      </div>
    );
  }
}
