import React from 'react';
import axios from 'axios';

export default class UnblockAllButton extends React.Component {


  constructor(props) {
    super(props);
    this.state={
    	status: 'Delete Account',
      clicked: false
    }
    this.deleteAccount = this.deleteAccount.bind(this);
    this.confirm = this.confirm.bind(this);
  }

  deleteAccount(){
  	if(this.props.ID === this.props.user._id){
      axios.delete('/delete-account/'+this.props.ID,{_id: this.props.user._id}).then( res=>{
        this.setState({
          status: 'Bye Girl'
        })
      });
    }else{
      this.setState({
          status: 'Not Same User'
        })
    }
  }

  confirm(){
    this.setState({
     clicked: true,
     status: 'Confirm Delete'
    })
  }



  render() {
    return (
	 <button className="btn connButton" onClick={this.state.clicked ===false ? this.confirm : this.deleteAccount}>
      	{this.state.status}
    </button>
 
    );
  }
}
