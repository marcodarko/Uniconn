import React from 'react';
import Header from '../components/Header';
import LocationBox from '../components/LocationBox';
import Results from '../components/Results';

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state={
    	userLat: '',
  		userLong: ''
    }
    this.sendLocationToHome = this.sendLocationToHome.bind(this);
  }

  sendLocationToHome(Lat, Long){
  	this.setState({
  		userLat: Lat,
  		userLong: Long
  	});
  	console.log('USER LOCATION', this.state);
  }

  render() {
    return (
      <div className="container col-sm-12 col-md-12 col-lg-12 row">
      	<Header sendLocationToHome={this.sendLocationToHome}/> 
      	<LocationBox userLat={this.state.userLat} userLong={this.state.userLong}/> 
      	<Results userLat={this.state.userLat} userLong={this.state.userLong}/>	
      </div>
    );
  }
}
