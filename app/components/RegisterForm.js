
var axios = require("axios");
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

export default class RegisterForm extends React.Component{

getName(event){

  	this.setState({
  		name: event.target.value
  	})
}
getUsername(event){

  	this.setState({
  		username: event.target.value
  	})
}
getEmail(event){

  	this.setState({
  		email: event.target.value
  	})
}
getPassword1(event){

  	this.setState({
  		password1: event.target.value
  	})
}
getPassword2(event){

  	this.setState({
  		password2: event.target.value
  	})
}
handleSubmit(){

	if(this.state.password1 === this.state.password2){

	let Rnew_name = this.state.name;
	let Rnew_email = this.state.email;
	let Rnew_username = this.state.username;
	let Rnew_password = this.state.password1;

	this.props.registerNewUser(Rnew_name, Rnew_email, Rnew_username, Rnew_password);

	}
	else{
		alert("passwords must match");
	}

}

  // Here we render the function
  render() {

    return (

    	<div className="container">
    	<Link to="/" className="btn  btn-lg themeButton">Back</Link>
			<form>
			   <div className="form-group">
			    <label>Name</label>
			    <input type="text" className="form-control inputBack" placeholder="Name" name="name" required onChange={this.getName}></input>
			  </div>
			  <div className="form-group">
			    <label>Username</label>
			    <input type="text" className="form-control inputBack" placeholder="Username" name="username" required onChange={this.getUsername}></input>
			  </div>
			   <div className="form-group">
			    <label>Email</label>
			    <input type="email" className="form-control inputBack" placeholder="Email" name="email" required onChange={this.getEmail}></input>
			  </div>
			  <div className="form-group">
			    <label>Password</label>
			    <input type="password" className="form-control inputBack" placeholder="Password" name="password" required onChange={this.getPassword1}></input>
			  </div>
			  <div className="form-group">
			    <label>Confirm Password</label>
			    <input type="password" className="form-control inputBack" placeholder="Password" name="password2" required onChange={this.getPassword2}></input>
			  </div>
			  <button type="button" onClick={this.handleSubmit} className="btn btn-lg themeButton">Submit</button>
			</form>
		</div>
    );
  }

};




