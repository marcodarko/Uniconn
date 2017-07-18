import React from 'react';

export default class Footer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="navbar navbar-inverse backPurple noBorder footer clearBoth">
		  	  <div className="container-fluid text-center whiteText">
			    <div className="navbar-header">
			      <a className="navbar-brand">
			        <h5>UniConn</h5>
			      </a>
			    </div>
			    <p className="navbar-text whiteText">Copyright Marco Alvarado © 2017 </p>
			    <ul className="nav navbar-nav navbar-left">
			    	<li><a href="https://www.facebook.com/mdarko2" target="_blank">Facebook</a></li>
			    </ul>
			  </div>
		  </nav>   
    );
  }
}
