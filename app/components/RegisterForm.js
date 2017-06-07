// Include React
var React = require("react");
var CreateReactClass = require('create-react-class');


var RegisterForm = CreateReactClass({

  // Here we render the function
  render: function() {

    return (

    	<div className="container">
			<form method="post" action="/register">
			   <div className="form-group">
			    <label>Name</label>
			    <input type="text" className="form-control" placeholder="Name" name="name" required></input>
			  </div>
			  <div className="form-group">
			    <label>Username</label>
			    <input type="text" className="form-control" placeholder="Username" name="username" required></input>
			  </div>
			   <div className="form-group">
			    <label>Email</label>
			    <input type="email" className="form-control" placeholder="Email" name="email" required></input>
			  </div>
			  <div className="form-group">
			    <label>Password</label>
			    <input type="password" className="form-control" placeholder="Password" name="password" required></input>
			  </div>
			  <div className="form-group">
			    <label>Confirm Password</label>
			    <input type="password" className="form-control" placeholder="Password" name="password2" required></input>
			  </div>
			  <button type="submit" className="btn btn-default">Submit</button>
			</form>
		</div>
    );
  }

});

// Export the component back for use in other files
module.exports = RegisterForm;



