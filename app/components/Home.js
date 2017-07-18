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
      user:{},
      action:''
    }
    this.sendUserToHome = this.sendUserToHome.bind(this);
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.logged = this.logged.bind(this);
  }

  sendUserToHome(newuser){
  	this.setState({
  		user: newuser
  	});
  	console.log('HOME USER INFO', this.state);
  }

  login(){
    this.setState({
      action: 'login'
    })
  }

  register(){
    this.setState({
      action: 'register'
    })
  }

  logged(){
    this.setState({
      action: 'logged'
    })
  }

  render() {
    return (
      <div className="container col-sm-12 col-md-12 col-lg-12 row">
      	<Header user={this.state.user} login={this.login} register={this.register}/> 
        <LoginForm logged={this.logged} action={this.state.action} user={this.state.user} sendUserToHome={this.sendUserToHome}/>  
      	<Divider/>
      	<LocationBox user={this.state.user}/> 
      	<Results user={this.state.user}/>
      	<Divider/>
      </div>
    );
  }
}
