
var axios = require("axios");
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

export default class RegisterForm extends React.Component{

constructor(props) {
  super(props);
   this.state = {
     username: "",
     password1: "",
     password2: "",
     name: "",
     email:""
    };
  this.getPassword1 = this.getPassword1.bind(this);
  this.getPassword2 = this.getPassword2.bind(this);
  this.getEmail = this.getEmail.bind(this);
  this.getName = this.getName.bind(this);
  this.getUsername = this.getUsername.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}

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

    	<div className="container registerContainer row">
      <h3 className="whiteText">New User Registration</h3>
      <hr/>
			<form>
        <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <label>photo</label>
          <input type="file" className="form-control inputBack" placeholder="Username" name="username" required onChange={this.getUsername}></input>
        </div>
			   <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
			    <label>Name</label>
			    <input type="text" className="form-control inputBack" placeholder="Name" name="name" required onChange={this.getName}></input>
			  </div>
        <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <label>Age</label>
          <input type="text" className="form-control inputBack" placeholder="Age" name="age" required onChange={this.getAge}></input>
        </div>
        <div className="form-group col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 text-center">
          <label htmlFor="male">Male</label>
          <input id="male" type="radio" className="form-control inputBack" name="gender" required onChange={this.getGenderM}></input> 
        </div>
        <div className="form-group col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 text-center">
          <label htmlFor="female">Female</label>
          <input id="female" type="radio" className="form-control inputBack" name="gender" required onChange={this.getGenderF}></input>
        </div>
         <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <label>Here For</label>
          <br/>
          <select>
            <option>Friends</option>
            <option>Dating</option>
            <option>Whatever</option>
          </select>
        </div>
        <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <label>Sexual Identity</label>
          <br/>
          <select>
            <option>Gay</option>
            <option>Bi</option>
            <option>Lesbian</option>
            <option>Trans</option>
            <option>GenderQueer</option>
            <option>Non-Binary</option>
            <option>Androgenous</option>
            <option>Fluid</option>
            <option>Unicorn</option>
          </select>
        </div>
			  <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
			    <label>Username</label>
			    <input type="text" className="form-control inputBack" placeholder="Username" name="username" required onChange={this.getUsername}></input>
			  </div>
			   <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
			    <label>Email</label>
			    <input type="email" className="form-control inputBack" placeholder="Email" name="email" required onChange={this.getEmail}></input>
			  </div>
			  <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
			    <label>Password</label>
			    <input type="password" className="form-control inputBack" placeholder="Password" name="password" required onChange={this.getPassword1}></input>
			  </div>
			  <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
			    <label>Confirm Password</label>
			    <input type="password" className="form-control inputBack" placeholder="Password" name="password2" required onChange={this.getPassword2}></input>
			  </div>
			  <button type="button" onClick={this.handleSubmit} className="btn btn-lg themeButton">Submit</button>
			</form>
		</div>
    );
  }

};




