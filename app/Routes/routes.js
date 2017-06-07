// Inclue the React library
var React = require("react");

// Include the react-router module
var router = require("react-router");

// Include the Route component for displaying individual routes
//var Route = router.Route;

// Include the Router component to contain all our Routes
// Here where we can pass in some configuration as props
//var Router = router.Router;

// Include the hashHistory prop to handle routing client side without a server
// https://github.com/ReactTraining/react-router/blob/master/docs/guides/Histories.md#hashhistory
var hashHistory = router.hashHistory;

// Include the IndexRoute (catch-all route)
var IndexRoute = router.IndexRoute;

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


// Export the Routes
module.exports = (

  // The high level component is the Router component
  <Router history={hashHistory}>
    <div>
      <Route exact path="/" component={Main}/>
         <Switch>
          <Route path="/Register" component={RegisterForm} />
        </Switch>
    </div>
  </Router>
);
