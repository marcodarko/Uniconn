import React from 'react';
import geolib from 'geolib';

export default class LocationBox extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
     <div className="panel panel-default col-sm-12 col-m-12 col-lg-12 backBlue noBorder whiteText">
	    <div className="panel-body text-center row">
	    	{!this.props.user.name && <h3 className="heartbeat">Log in to start</h3>}
	  		{this.props.user.name && 
	  		<div className="col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 text-center">
	  			<img id="profilePhoto" src='./images/default.png' alt="user photo"/>
				<p>4 CONNs more for next frame</p>	  			
	  		</div>}

	  		{this.props.user.name &&<div className="col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 text-center">
	  			<h4 className="textWhite">{this.props.user.name}</h4>
	  			<p>{this.props.user.identity}</p>
	  			<a href='#' target='_blank'> @{this.props.user.username}</a>
	  		</div>}

	  		{this.props.user.name && 
	  		<table className="col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 userTable">
	  			<tbody>
	  			<tr>
	  				<td className='text-center purpleText'>
	  					 CONNs
	  				</td>
	  				<td className="text-center">
	  					<strong>{this.props.user.conns}</strong>
	  				</td>
	  			</tr>
	  			<tr>
	  				<td className='text-center purpleText'>
	  					 Age
	  				</td>
	  				<td className="text-center">
	  					{this.props.user.age}
	  				</td>
	  			</tr>
	  			<tr>
	  				<td className='text-center purpleText'>
	  					Location
	  				</td>
	  				<td className="text-center">
	  					Lat: {this.props.user.latitude}, Long: {this.props.user.longitude}
	  				</td>
	  			</tr>
	  			<tr>
	  				<td className='text-center purpleText'>
	  					E-mail
	  				</td>
	  				<td className="text-center">
	  					{this.props.user.email}
	  				</td>
	  			</tr>
	  			<tr>
	  				<td className='text-center purpleText'>
	  					 Here For
	  				</td>
	  				<td className="text-center">
	  					{this.props.user.herefor}
	  				</td>
	  			</tr>
	  			</tbody>
	  		</table>}	
		</div>
	</div>
    );
  }
}
