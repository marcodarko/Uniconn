import React from 'react';
import { NavLink } from 'react-router-dom';
import MainIcon1 from '../components/MainIcon1';

export default class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state={
    	locationLatitude:'',
    	locationLongitude: '',
    	locationMSG: "Get Location"
    }
    this.getLocation = this.getLocation.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();
  }

  getLocation(){
    	//console.log("this is happening");
  	 	navigator.geolocation.getCurrentPosition( (location,err) =>{

  	 		if(location){
  	 			let locationLatitude= location.coords.latitude;
		  		let locationLongitude= location.coords.longitude;
		  		this.setState({
		  			locationLatitude: locationLatitude,
		  			locationLongitude: locationLongitude,
		  			locationMSG: "Location Found"
		  		});

		  		this.props.sendLocationToHome(this.state.locationLatitude,  this.state.locationLongitude);
  	 		}
  	 		else{
  	 			this.setState({
  	 				locationMSG:"Location Not Found"
  	 			})
  	 		}

  	});

  	//console.log(this.state);
  }

  render() {
    return (
	      <nav className="navbar navbar-inverse backPurple noBorder">
		  	  <div className="container-fluid">
			    <div className="navbar-header">
			      <NavLink className="navbar-brand" to="/">
			        <img src='./images/uniconn.png' alt="logo home" width="110px"/>
			      </NavLink>
			    </div>	
			    <form className="navbar-form navbar-right noBorder" onSubmit={this.handleSubmit}>		   
			     <MainIcon1 getLocation={this.getLocation} locationMSG={this.state.locationMSG}/>
			    </form>		   
			  </div>
		  </nav>    	
    );
  }
}
