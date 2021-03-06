import React from 'react';
import { NavLink } from 'react-router-dom';
import ReactDOM from 'react-dom';

export default class MainIcon1 extends React.Component {


  constructor(props) {
    super(props);
  }

  render() {
    return (
		<button type='button' className={this.props.locationMSG === "Location Found" ? 'btn connButton disabled': 'btn connButton'} onClick={this.props.getLocation}>
			{this.props.locationMSG === "Location Found" ? <span className="glyphicon glyphicon-ok" aria-hidden="true"></span> : <span style={{color:'hotpink'}} className="glyphicon glyphicon-record heartbeat" aria-hidden="true"></span>} {this.props.locationMSG}
		</button>
    );
  }
}
