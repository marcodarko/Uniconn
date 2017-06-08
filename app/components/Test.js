// Include React
var React = require("react");
var CreateReactClass = require('create-react-class');


var Test = CreateReactClass({


  // Here we render the function
  render: function() {

    return (

    	<div className="container">
			<h2>TEST HOME</h2>
		</div>
    );
  }

});

// Export the component back for use in other files
module.exports = Test;



