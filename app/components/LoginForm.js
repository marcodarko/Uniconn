import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

export default class LoginForm extends React.Component{


constructor(props) {
  super(props);
    this.state = {
     username: "",
     password: ""
    };
  this.getPassword = this.getPassword.bind(this);
  this.getUsername = this.getUsername.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
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

	//this.props.submitLoginInfo(U, P);

}

  // Here we render the function
  render() {


    return (

    	<div className="jumbotron col-sm-12 col-m-12 col-lg-12 backGreen text-center">
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
			</form>
		</div>
    );
  }

};





