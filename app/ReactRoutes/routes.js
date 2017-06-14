import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link, 
  Switch
} from 'react-router-dom'

// Include the Main Component
import Main  from "../components/Main";
// Components
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';

// Export the Routes
export default (

  // The high level component is the Router component
  <Router >
    <div className="container">
      <Switch>
        <Route exact path="/" component={Main}/>
        <Route path="/login" component={LoginForm}/>
        <Route path="/register" component={RegisterForm}/>
      </Switch>
    </div>
  </Router>
  );

