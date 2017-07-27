import React from 'react';
import axios from 'axios';

export default class FaveResultItem extends React.Component {

  constructor(props) {
    super(props);
    this.state={
    	resultUser:{},
      hovered: false
    }
    this.Hover = this.Hover.bind(this);
    this.unHover = this.unHover.bind(this);
  }

  componentDidMount(){
  	axios.get('/user-u/'+this.props.username).then( res =>{
  		//console.log("result item data", res.data)
  		this.setState({
  			resultUser: res.data
  		})
  	});
  }

  Hover(){
    this.setState({
        hovered: true
    });
  }

  unHover(){
    this.setState({
        hovered: false
    });
  }


  render() {
    return (
      	<img style={{border: this.state.resultUser.status === "online"? '#b6fc5e 3px solid' : '#fa4d76 3px solid' }} onClick={ ()=>{this.props.selectThis(this.state.resultUser.username)}} onMouseEnter={this.Hover} onMouseLeave={this.unHover} title={this.state.resultUser.username} className={this.state.hovered === true? 'favesListImg heartbeat': 'favesListImg'} src={this.state.resultUser.photo || './images/default.png'} alt='my fave'/>
    );
  }
}
