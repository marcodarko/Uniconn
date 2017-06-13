import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

export default class Main extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      errmsg: "",
      USER: ""
    };
  }

  componentWillMount(){


  }


  renderLogin(){

    return <LoginForm submitLoginInfo ={this.submitLoginInfo} />

  }

  renderRegister(){

    return <RegisterForm registerNewUser={this.registerNewUser}/>

  }

 

  loggedIn(currentState){

    if(currentState == "true"){
        this.setState({
      loggedIn: true
      });
    }
     else if(currentState == "false"){
        this.setState({
      loggedIn: false
      });
    }

  }

  submitLoginInfo(SentUsername, SentPassword){

  var LoginInfo= {
    username: SentUsername.trim(),
    password: SentPassword.trim()
  }

  axios.post('/login', LoginInfo).then( USER=>{

  if(USER.data){
    var test = JSON.stringify(USER.data);

      console.log("axios response");
      console.log(test);

      this.setState({

        USER: USER.data,
        errmsg: "YOU'RE LOGGED IN"

      });

      console.log(this.state.USER);
  }
  else{
    this.setState({
        errmsg: "Try Again"
      });
  }
    

  }).catch( err =>{

  console.log(err);

  });

  }

  registerNewUser(newN, newE, newU, newP){

    var userInfo= {
      name: newN.trim(),
      email: newE.trim(),
      username: newU.trim(),
      password: newP.trim()
    }

      axios.post('/register', userInfo).then(USER=>{

      console.log("USER: "+USER);

      this.setState({

        USER: USER

      });


    });

  }

  // Here we render the function
  render() {

        if(this.state.loggedIn == false){
            var child = this.renderLogin()
          }


        if (this.state.errmsg){
          var alert = <div className="alert alert-primary"><b>{this.state.errmsg}</b></div>;
        }

    return (
    	<div className="container mainHero">
        <img className="heroImage fade-in-fwd" src="images/uniconn.svg" alt="uniconn logo"/>

          {alert}
        <Link to="/login" className="btn  btn-lg themeButton">Login</Link>
        <Link to="/register" className="btn  btn-lg themeButton">Register</Link>
          {child}
          {this.props.children}
		  </div>


      
    );
  }

};




