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
     loginMSG:''
    };
  this.getPassword = this.getPassword.bind(this);
  this.getUsername = this.getUsername.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  this.renderLogin = this.renderLogin.bind(this);
  this.renderRegistration = this.renderRegistration.bind(this);

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
      loginMSG: "Logged In"
    })
     this.props.logged();
     this.props.sendUserToHome(res.data);

  }).catch(err=>{
    this.setState({
      loginMSG: "Invalid Credentials"
    })
  });

}

renderLogin(){
	return(<div>
          <h3 className="whiteText">Welcome Back</h3>
			<form >
			  <div className="form-group">
			    <label className="purpleText">Username</label>
			    <input style={{width:'70%', margin:'auto'}} type="text" className="form-control inputBack" name="username" placeholder="Username" required onChange={this.getUsername}></input>
			  </div>
			  <div className="form-group">
			    <label className="purpleText">Password</label>
			    <input style={{width:'70%', margin:'auto'}} type="password" className="form-control inputBack" name="password" placeholder="Password" required onChange={this.getPassword}></input>
			  </div>
			  <button type="button" className="btn loginButton" onClick={this.handleSubmit} >Submit</button>
        <br/>
        <h4 style={{color: this.state.loginMSG === "Logged In" ? 'white' : 'red'}}><span>{this.state.loginMSG}</span></h4>
			</form>
		</div>)
}

renderRegistration(){
	return <RegisterForm/>
}

  // Here we render the function
  render() {


    return (

    	<div className=" col-xs-12 col-sm-12 col-md-12 col-lg-12  col-xl-12 backOrange text-center" style={{padding:'5px'}}>
    		{this.props.action ==="login" && this.renderLogin()}
    		{this.props.action ==="register" && this.renderRegistration()}
        {this.props.action === 'logged' && <p className="purpleText">Hello, <strong>{this.props.user.username}</strong></p>}
		</div>
    );
  }

};





