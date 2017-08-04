import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import axios from 'axios';
import RegisterForm from './RegisterForm';
import ReactHowler from 'react-howler';

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
		username: event.target.value.toLowerCase()
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
    
   
    this.props.logged();
    this.props.sendUserToHome(res.data);
    axios.put('/online/'+this.props.user._id);
    this.setState({
      loginMSG: "Logged In"
    })
    //console.log("login successful", res.data);

  }).catch(err=>{
    this.setState({
      loginMSG: "Invalid Credentials"
    })
  });

}

renderLogin(){
	return(<div>
          <h5 className="whiteText">Welcome Back</h5>
          <img className="regImg" src="./images/loginbanner.jpg" alt='login banner uniconn'/>
			<form >
			  <div className="form-group">
			    <label className="purpleText">Username</label>
			    <input style={{width:'70%', margin:'auto'}} type="text" className="form-control themeInput" name="username" placeholder="Username" required onChange={this.getUsername}></input>
			  </div>
			  <div className="form-group">
			    <label className="purpleText">Password</label>
			    <input style={{width:'70%', margin:'auto'}} type="password" className="form-control themeInput" name="password" placeholder="Password" required onChange={this.getPassword}></input>
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

    	<div className=" col-xs-12 col-sm-12 col-md-12 col-lg-12  col-xl-12 backOrange text-center clearBoth" >
      {/*<ReactHowler
            src='https://freesound.org/people/udoxas/sounds/265115/download/265115__udoxas__popping.wav'
            playing={this.state.playing}
            loop={false}
            html5={true}
         />*/}
    		{this.props.action ==="login" && this.renderLogin()}
    		{this.props.action ==="register" && this.renderRegistration()}
        {this.props.action === 'logged' && this.props.user.name && <p style={{margin:'8px'}} className="purpleText">Hello, <strong>{this.props.user.username}</strong></p>}
		</div>
    );
  }

};





