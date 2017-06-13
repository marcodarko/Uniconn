// Include React
var React = require("react");
var CreateReactClass = require('create-react-class');
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch, Match, Miss
} from 'react-router'

var RegisterForm = require('./RegisterForm');
var LoginForm = require('./LoginForm');
var App = require('./MainApp');



var Main = CreateReactClass({

  getInitialState: function(){

    return {

      loggedIn: false,
      userInfo: ""

    }

  },

  loggedIn: function(currentState){

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

  },

  submitLoginInfo: function(SentUsername, SentPassword){

  var LoginInfo= {
    username: SentUsername,
    password: SentPassword
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

  },

  // Here we render the function
  render: function() {

    return (
    	<div className="container mainHero">
      <Link to="/login" className="btn  btn-lg themeButton">Login</Link>
      <Link to="/register" className="btn  btn-lg themeButton">Register</Link>

      {this.props.children}
      <App/>
        
		  </div>
      
    );
  }

});

// Export the component back for use in other files
module.exports = Main;