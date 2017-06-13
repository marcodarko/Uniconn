// Include React
var React = require("react");
var CreateReactClass = require('create-react-class');
var axios = require("axios");
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch, Match, Miss
} from 'react-router'

var RegisterForm = CreateReactClass({

getName: function(event){

  	this.setState({
  		name: event.target.value
  	})
},
getUsername: function(event){

  	this.setState({
  		username: event.target.value
  	})
},
getEmail: function(event){

  	this.setState({
  		email: event.target.value
  	})
},
getPassword1: function(event){

  	this.setState({
  		password1: event.target.value
  	})
},
getPassword2: function(event){

  	this.setState({
  		password2: event.target.value
  	})
},
submitUser: function(event){



	var userInfo= {
		name: this.state.name,
		email: this.state.email,
		username: this.state.username,
		password: this.state.password1
	}

 	axios.post('/register', userInfo).then(USER=>{

 		console.log("USER: "+USER);

 		this.setState({

 			USER: USER

 		});


 	});

},

  // Here we render the function
  render: function() {

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
			  <button type="button" onClick={this.submitUser} className="btn btn-lg themeButton">Submit</button>
			</form>
		</div>
    );
  }

});

// Export the component back for use in other files
module.exports = RegisterForm;



