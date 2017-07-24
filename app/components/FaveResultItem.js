import React from 'react';
import axios from 'axios';

export default class FaveResultItem extends React.Component {

  constructor(props) {
    super(props);
    this.state={
    	resultUser:{}
    }
  }

  componentDidMount(){
  	axios.get('/user-u/'+this.props.username).then( res =>{
  		//console.log("result item data", res.data)
  		this.setState({
  			resultUser: res.data
  		})
  	});
  }


  render() {
    return (
      <div className="faveListItem">
      	<img title={this.state.resultUser.username} className="favesListImg" src={this.state.resultUser.photo || './images/default.png'} alt='my fave'/>
      </div>
    );
  }
}
