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
	  <div className="panel-body text-center">
	    <span style={{color:'#087dca'}}>UserLat:</span> {this.props.userLat}
	    <br/>
	    <span style={{color:'#087dca'}}>UserLong:</span> {this.props.userLong}
	  </div>
	</div>
    );
  }
}
