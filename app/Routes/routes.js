// Inclue the React library
var React = require("react");

// Include the react-router module
var router = require("react-router");

// Include the hashHistory prop to handle routing client side without a server
// https://github.com/ReactTraining/react-router/blob/master/docs/guides/Histories.md#hashhistory
var hashHistory = router.hashHistory;

// Include the IndexRoute (catch-all route)
var IndexRoute = router.IndexRoute;

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch, Match, Miss
} from 'react-router-dom'

// Include the Main Component
var Main = require("../components/Main");
// Components
var RegisterForm = require('../components/RegisterForm');
var LoginForm = require('../components/LoginForm');

var Test = require('../components/Test');

// Export the Routes
module.exports = (

  // The high level component is the Router component
  <Router history={hashHistory}>
    <div className="container">
 
    <Switch>
        <Route exact path="/" component={Main}/>
        <Route path="/login" component={LoginForm} />
        <Route path="/register" component={RegisterForm} />
        <Route render={function(){
            return <p>Not Found</p>
        }}/>
      </Switch>

    </div>
      
  </Router>
);
