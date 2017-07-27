import React from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

export default class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state={
    }
    this.logout = this.logout.bind(this);
  }

  logout(){

  	axios.put('/offline/'+this.props.user._id).then(res =>{
  		var gone ={};
  		this.props.sendUserToHome(gone);
  	});
  	
  }




  render() {
    return (
	      <nav className="navbar backPurple noBorder">
		  	  <div className="container-fluid text-center">
			    <div className="navbar-header">
			      <NavLink className="navbar-brand" to="/">
			        <img src='./images/uniconn.png' alt="logo home" width="110px"/>
			      </NavLink>
			    </div>
			   	{!this.props.user.name && <ul className="nav navbar-nav navbar-right">
			   		<li><button onClick={this.props.login} type="button" className="btn themeButton">Login</button></li>
			   		<li><button onClick={this.props.register} type="button" className="btn themeButton">Register</button></li>
			   	</ul>}
			   	{this.props.user.name && <ul className="nav navbar-nav navbar-right">
			   		<li><button onClick={this.logout} type="button" className="btn themeButton">Log Out</button></li>			   		
			   	</ul>}	    
			  </div>
		  </nav>    	
    );
  }
}
