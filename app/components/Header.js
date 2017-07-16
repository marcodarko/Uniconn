import React from 'react';
import { NavLink } from 'react-router-dom';

export default class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state={
    }
  }


  render() {
    return (
	      <nav className="navbar navbar-inverse backPurple noBorder">
		  	  <div className="container-fluid text-center">
			    <div className="navbar-header">
			      <NavLink className="navbar-brand" to="/">
			        <img src='./images/uniconn.png' alt="logo home" width="110px"/>
			      </NavLink>
			    </div>		   
			  </div>
		  </nav>    	
    );
  }
}
