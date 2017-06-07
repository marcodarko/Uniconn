// Include React
var React = require("react");
var CreateReactClass = require('create-react-class');

// Components
var RegisterForm = require('RegisterForm');


var Main = CreateReactClass({

  // Here we render the function
  render: function() {

    return (
    	<div className="container">
    		<RegisterForm/>
		</div>
    );
  }

});

// Export the component back for use in other files
module.exports = Main;