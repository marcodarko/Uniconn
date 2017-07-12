import React from 'react';
import Header from '../components/Header';

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
      <div className="container-fuild row">
      	<Header sendLocationToHome={this.sendLocationToHome}/>    	
      </div>
    );
  }
}
