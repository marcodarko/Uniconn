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
  	axios.get('/user/'+this.props.id).then( res=>{
  		this.setState({
  			resultUser: res.data,
  			picready: true
  		})
  	});
  }

  renderPic(){
  	return <img className="favesListImg" src={this.state.resultUser.photo} alt='my fave'/>
  }

  render() {
    return (
      <div className="faveListItem">
      	{this.state.picready && this.renderPic()}
      </div>
    );
  }
}
