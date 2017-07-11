import React from 'react';
import { NavLink } from 'react-router-dom'

export default class Header extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container-fluid">
	      <nav className="navbar navbar-inverse">
		  	  <div className="container-fluid">
			    <div className="navbar-header">
			      <NavLink className="navbar-brand" to="/">
			        UniConn
			      </NavLink>
			    </div>
			     <ul className="nav navbar-nav">
			     	<li><NavLink to="/login">Log In</NavLink></li>
			     	<li><NavLink to="/icon1">Location</NavLink></li>
			     </ul>
			  </div>
		  </nav>    	
      </div>
    );
  }
}
