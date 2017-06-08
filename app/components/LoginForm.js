// Include React
var React = require("react");
var CreateReactClass = require('create-react-class');
var axios = require("axios");
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch, Match, Miss
} from 'react-router-dom'

var LoginForm = CreateReactClass({

getInitialState: function(){
	return {
		errmsg: " "
	}
},

getUsername: function(event){

  	this.setState({
  		username: event.target.value
  	})
},
getPassword: function(event){

  	this.setState({
  		password: event.target.value
  	})
},

submitLoginInfo: function(event){

	var LoginInfo= {
		username: this.state.username,
		password: this.state.password
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

  	if (this.state.errmsg){
	    		var alert = <div className="alert alert-primary"><b>{this.state.errmsg}</b></div>;
	    	}

    return (

    	<div className="container">
    			{alert}
    			<Link to="/" className="btn  btn-lg themeButton">Back</Link>
			<form >
			  <div className="form-group">
			    <label>Username</label>
			    <input type="text" className="form-control inputBack" name="username" placeholder="Username" required onChange={this.getUsername}></input>
			  </div>
			  <div className="form-group">
			    <label>Password</label>
			    <input type="password" className="form-control inputBack" name="password" placeholder="Password" required onChange={this.getPassword}></input>
			  </div>
			  <button type="button" className="btn btn-lg themeButton" onClick={this.submitLoginInfo} >Submit</button>
			</form>
		</div>
    );
  }

});

// Export the component back for use in other files
module.exports = LoginForm;



