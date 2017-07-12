import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link, 
  Switch
} from 'react-router-dom'
// COMPONENTS
import Header from '../components/Header';
import MainIcon1 from '../components/MainIcon1';
import Main  from "../components/Main";
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import Home from '../components/Home';
// Export the Routes
export default (

  // The high level component is the Router component
  <Router >
    <div className="container-fluid">
        <Route exact path="/" component={Home}/>
    </div>
  </Router>
  );

