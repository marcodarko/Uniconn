import React from 'react';
import axios from 'axios';

export default class FaveResultItem extends React.Component {

  constructor(props) {
    super(props);
    this.state={
    	resultUser:{},
    	picready: false
    }
    this.renderPic = this.render.bind(this);
  }

  componentDidMount(){
  	axios.get('/user/'+this.props.id).then( res =>{
  		//console.log("result item data", res.data)
  		this.setState({
  			resultUser: res.data
  		})
  	});
  }

  renderPic(){
  	return <img className="favesListImg" src={this.state.resultUser.photo} alt='my fave'/>
  }

  render() {
    return (
      <div className="faveListItem">
      	<img className="favesListImg" src={this.state.resultUser.photo || './images/default.png'} alt='my fave'/>
      </div>
    );
  }
}
