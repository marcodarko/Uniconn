import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import axios from 'axios';
import RegisterForm from './RegisterForm';

export default class LoginForm extends React.Component{


constructor(props) {
  super(props);
    this.state = {
     username: "",
     password: "",
     action:'',
     loginMSG:''
    };
  this.getPassword = this.getPassword.bind(this);
  this.getUsername = this.getUsername.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  this.renderLogin = this.renderLogin.bind(this);
  this.renderRegistration = this.renderRegistration.bind(this);
  this.actionLogin = this.actionLogin.bind(this);
  this.actionRegister = this.actionRegister.bind(this);
}

getUsername(event){

	this.setState({
		username: event.target.value
	})
}

getPassword(event){

	this.setState({
		password: event.target.value
	})
}

handleSubmit(){

	var U= this.state.username;
	var P= this.state.password;
  let loginInfo ={
    username: U,
    password: P
  }

	axios.post('/login', loginInfo).then(res=>{
    console.log("login successful", res.data);
    this.setState({
      loginMSG: "Logged In",
      action: "loggedin"
    })
     this.props.sendUserToHome(res.data);

  }).catch(err=>{
    this.setState({
      loginMSG: "Invalid Credentials"
    })
  });

}

renderLogin(){
	return(<div>
    		<img className="heroImg" src="./images/hero.jpg" alt="hero uniconn"/>
    		<br/>
			<form >
			  <div className="form-group">
			    <label className="purpleText">Username</label>
			    <input style={{width:'70%', margin:'auto'}} type="text" className="form-control inputBack" name="username" placeholder="Username" required onChange={this.getUsername}></input>
			  </div>
			  <div className="form-group">
			    <label className="purpleText">Password</label>
			    <input style={{width:'70%', margin:'auto'}} type="password" className="form-control inputBack" name="password" placeholder="Password" required onChange={this.getPassword}></input>
			  </div>
			  <button type="button" className="btn themeButton" onClick={this.handleSubmit} >Submit</button>
        <br/>
        <h4 style={{color: this.state.loginMSG === "Logged In" ? 'white' : 'red'}}><span>{this.state.loginMSG}</span></h4>
			</form>
		</div>)
}

renderRegistration(){
	return <RegisterForm/>
}

actionLogin(){
	this.setState({
		action:'login'
	})
}

actionRegister(){
	this.setState({
		action:'register'
	})
}
  // Here we render the function
  render() {


    return (

    	<div className="jumbotron col-sm-12 col-m-12 col-lg-12 row backOrange text-center">
    		{!this.props.user.name &&<div className="col-sm-6 col-md-6 col-lg-6 col-xs-6 col-xl-6">
          <button type="button" className="btn connButton" onClick={this.actionLogin}>Log In</button>
        </div>}
    		{!this.props.user.name &&<div className="col-sm-6 col-md-6 col-lg-6 col-xs-6 col-xl-6">
    			<button type="button" className="btn connButton" onClick={this.actionRegister}>New User</button>
    		</div>}
        <hr/>
    		{this.state.action ==="login" && this.renderLogin()}
    		{this.state.action ==="register" && this.renderRegistration()}
        {this.state.action === 'loggedin' && <h5 className="whiteText">Welcome!</h5>}
		</div>
    );
  }

};





