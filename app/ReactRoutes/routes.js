// Inclue the React library
var React = require("react");

// Include the react-router module
var router = require("react-router");

// Include the hashHistory prop to handle routing client side without a server
// https://github.com/ReactTraining/react-router/blob/master/docs/guides/Histories.md#hashhistory
var hashHistory = router.hashHistory;

// Include the IndexRoute (catch-all route)
// var IndexRoute = router.IndexRoute;

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

// Include the Main Component
var Main = require("../components/Main");
// Components
var RegisterForm = require('../components/RegisterForm');
var LoginForm = require('../components/LoginForm');
var App = require('../components/MainApp');

// Export the Routes
module.exports = (

  // The high level component is the Router component
  <Router history={browserHistory}>
    <div className="container">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/register">About</Link></li>
        <li><Link to="/login">Topics</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={Main}/>
      <Route path="/about" component={LoginForm}/>
      <Route path="/topics" component={RegisterForm}/>
      <Route component={App}/>
    </div>
  </Router>
);

