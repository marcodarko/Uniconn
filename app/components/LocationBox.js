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
     <div className="panel panel-default col-sm-12 col-m-12 col-lg-12">
	  <div className="panel-body text-center">
	    UserLat: {this.props.userLat}
	    <br/>
	    UserLong: {this.props.userLong}
	  </div>
	</div>
    );
  }
}
