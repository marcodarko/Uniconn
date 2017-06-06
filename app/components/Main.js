// Include React
var React = require("react");


var CreateReactClass = require('create-react-class');


var Main = CreateReactClass({

  // Here we render the function
  render: function() {

    return (
      <div className="container">
        <h1> Hello World</h1>
      </div>

    );
  }

});

// Export the component back for use in other files
module.exports = Main;