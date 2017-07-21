import React from 'react';
import axios from 'axios';

export default class UpdateLocationButton extends React.Component {


  constructor(props) {
    super(props);
    this.state={
    	status: 'Update Location'
    }
    this.getLocation = this.getLocation.bind(this);
  }



   getLocation(){
      //console.log("this is happening");
      navigator.geolocation.getCurrentPosition( (location,err) =>{

        if(location){
          let locationLatitude= location.coords.latitude;
          let locationLongitude= location.coords.longitude;
          axios.put('/api/update-location/'+this.props.ID, {lat: locationLatitude, long: locationLongitude}).then(res=>{

          	this.setState({
		    status:"LOCATION UPDATED"
		    });

          }).catch(err=>{
		    this.setState({
		    status:"Update Failed"
		    });
		  })

        }
        else{
          	this.setState({
		    status:"Location Not Found"
		    });
        }

    });

    //console.log(this.state);
  }

  render() {
    return (
      <button className="btn themeButton" onClick={this.getLocation}>
      	{this.state.status}
      </button>
    );
  }
}
