import React from 'react';
import axios from 'axios';

export default class UnblockAllButton extends React.Component {


  constructor(props) {
    super(props);
    this.state={
    	status: 'Unblock All'
    }
    this.unblockAll = this.unblockAll.bind(this);
  }

  unblockAll(yourID, ){
  	axios.put('/unblock-all/'+yourID).then( res=>{
  		this.setState({
  			status: 'Done'
  		})
  	});
  }

  render() {
    return (
      <button className="btn themeButton" onClick={()=>{ this.unblockAll(this.props.ID)}}>
      	{this.state.status}
      </button>
    );
  }
}
