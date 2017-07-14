import React from 'react';
import geolib from 'geolib';

export default class LocationBox extends React.Component {

  constructor(props) {
    super(props);
  }

 //  componentDidUpdate(){
 //  	if(this.props.userLat && this.props.userLong){
 //  		console.log("geolib is happening");
	//   	let res= geolib.getDistance(
	//     {latitude: parseFloat(this.props.userLat), longitude: parseFloat(this.props.userLong)},
	//     {latitude: "51° 31' N", longitude: "7° 28' E"}
	// 	);
	//   	//result is in meters
	// 	console.log("GeoLib Results",res);
	// }

 //  }


  render() {
    return (
     <div className="panel panel-default col-sm-12 col-m-12 col-lg-12 backBlue noBorder whiteText">
	    <div className="panel-body text-center row">
	    	{!this.props.userLong && <h3>Log in to start</h3>}
	  		{this.props.userLong && 
	  		<div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 text-center">
	  			<img id="profilePhoto" src='./images/default.png' alt="user photo"/>
	  			<div className="progress">
				  <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width: "40%"}}>
				  </div>
				</div>
				<p>4 CONNs more for next frame</p>
	  			<h4 className="textWhite">Name</h4>
	  			<a href='#' target='_blank'> @Username</a>
	  		</div>}

	  		{this.props.userLong && 
	  		<table className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 userTable">
	  			<tbody>
	  			<tr>
	  				<td className='text-right purpleText'>
	  					 CONNs
	  				</td>
	  				<td className="text-left">
	  					<strong>54</strong>
	  				</td>
	  			</tr>
	  			<tr>
	  				<td className='text-right purpleText'>
	  					 Age
	  				</td>
	  				<td className="text-left">
	  					32
	  				</td>
	  			</tr>
	  			<tr>
	  				<td className='text-right purpleText'>
	  					Location
	  				</td>
	  				<td className="text-left">
	  					Lat: {this.props.userLat}, Long: {this.props.userLong}
	  				</td>
	  			</tr>
	  			<tr>
	  				<td className='text-right purpleText'>
	  					E-mail
	  				</td>
	  				<td className="text-left">
	  					me@email.com
	  				</td>
	  			</tr>
	  			<tr>
	  				<td className='text-right purpleText'>
	  					 Here For
	  				</td>
	  				<td className="text-left">
	  					friends
	  				</td>
	  			</tr>
	  			</tbody>
	  		</table>}	
		</div>
	</div>
    );
  }
}
