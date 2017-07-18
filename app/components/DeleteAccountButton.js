import React from 'react';
import axios from 'axios';

export default class UnblockAllButton extends React.Component {


  constructor(props) {
    super(props);
    this.state={
    	status: 'Delete Account'
    }
    this.deleteAccount = this.deleteAccount.bind(this);
  }

  deleteAccount(yourID, userID){
  	axios.delete('/delete-account/'+yourID,{_id: userID}).then( res=>{
  		this.setState({
  			status: 'Bye Girl'
  		})
  	});
  }



  render() {
    return (
	 <button className="btn deleteButton" onClick={ ()=>{ this.deleteAccount(this.props.ID, this.props.user._id)}}>
      	{this.state.status}
      </button>
 
    );
  }
}
