import React from 'react';
import Header from '../components/Header';
import LocationBox from '../components/LocationBox';
import Results from '../components/Results';
import Divider from '../components/Divider';
import LoginForm from '../components/LoginForm';

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      user:{}
    }
    this.sendUserToHome = this.sendUserToHome.bind(this);
  }

  sendUserToHome(newuser){
  	this.setState({
  		user: newuser
  	});
  	console.log('HOME USER INFO', this.state);
  }

  render() {
    return (
      <div className="container col-sm-12 col-md-12 col-lg-12 row">
      	<Header/> 
      	<Divider/>
      	<LocationBox user={this.state.user}/> 
      	<Results user={this.state.user}/>
      	<Divider/>
      	<LoginForm user={this.state.user} sendUserToHome={this.sendUserToHome}/>	
      </div>
    );
  }
}
