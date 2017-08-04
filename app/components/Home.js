import React from 'react';
import Header from '../components/Header';
import LocationBox from '../components/LocationBox';
import Results from '../components/Results';
import Divider from '../components/Divider';
import LoginForm from '../components/LoginForm';
import Footer from '../components/Footer';
import PrivateMessageBox from '../components/PrivateMessageBox';
import InboxBox from '../components/InboxBox';
import FavoritesSlider from '../components/FavoritesSlider';
import axios from 'axios';

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      user:{},
      action:'',
      status:"",
      socket: window.io()
    }
    this.sendUserToHome = this.sendUserToHome.bind(this);
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.logged = this.logged.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }



  sendUserToHome(newuser){

  	this.setState({
  		user: newuser
  	});
    this.state.socket.emit('user joined',this.state.user);
  	//console.log('HOME USER INFO', this.state);
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

  updateUser(){

    axios.get('/user/'+this.state.user._id).then(res=>{
      this.setState({
      user: res.data
      })
    }).catch(err=>{
      console.log(err);
    });
    
  }

  render() {
    return (
      <div className="container col-sm-12 col-md-12 col-lg-12 ">
      	<Header sendUserToHome={this.sendUserToHome} user={this.state.user} login={this.login} register={this.register}/> 
        <LoginForm logged={this.logged} action={this.state.action} user={this.state.user} sendUserToHome={this.sendUserToHome}/>  
      	<Divider/>
      	<LocationBox user={this.state.user} updateUser={this.updateUser}/>         
        <FavoritesSlider user={this.state.user} updateUser={this.updateUser} />
        <Divider/>
      	<Results user={this.state.user} updateUser={this.updateUser}/>
        <Footer/> 
      </div>
    );
  }
}
