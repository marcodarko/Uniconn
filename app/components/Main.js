// Include React
var React = require("react");
var CreateReactClass = require('create-react-class');
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch, Match, Miss
} from 'react-router-dom'



var Main = CreateReactClass({

  // Here we render the function
  render: function() {

    return (
    	<div className="jumbotron mainHero">
        <img className="heroImage fade-in-fwd" src="images/uniconn.png" alt="uniconn logo"/>
    		<Link to="/login" className="btn  btn-lg themeButton">Login</Link>
        <Link to="/register" className="btn  btn-lg themeButton">Register</Link>
        
		</div>
    );
  }

});

// Export the component back for use in other files
module.exports = Main;