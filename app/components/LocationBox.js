import React from 'react';
import geolib from 'geolib';
import FaveBox from './FaveBox';

export default class LocationBox extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
     <div className="panel panel-default col-sm-12 col-m-12 col-lg-12 backBlue noBorder whiteText">
	    <div className="panel-body text-center row">
	    	{!this.props.user.name && <h4 className="heartbeat whiteText">Log in to start</h4>}
	  		{this.props.user.name && 
	  		<div className="col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 backGreen  text-center purpleText" style={{borderRadius:'10px', padding:'10px'}}>
	  			<img className="slide-in-fwd-center" id="profilePhoto" src='./images/default.png' alt="user photo"/> 
	  			<p><span className="glyphicon glyphicon-user" aria-hidden="true"></span> <strong><span className="textWhite">{this.props.user.name}, </span></strong><span>{this.props.user.identity}, </span><span>{this.props.user.age}</span></p>
	  			<span> @{this.props.user.username}</span> <br/>
  				<span><span className="glyphicon glyphicon-envelope" aria-hidden="true"></span> {this.props.user.email}</span><br/>
  				<span><span className="glyphicon glyphicon-record" aria-hidden="true"></span> {this.props.user.latitude}, {this.props.user.longitude}</span>			
	  		</div>}

	  		{this.props.user.name && <FaveBox user={this.props.user}/>}	
		</div>
	</div>
    );
  }
}
