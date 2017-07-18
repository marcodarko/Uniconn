import React from 'react';
import axios from 'axios';
import FaveResultItem from './FaveResultItem';
import MessagesBox from './MessagesBox';

export default class FaveBox extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-xs-12 col-sm-8 col-md-8 col-lg-8 col-xl-8 text-center">	  			
      		<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 favesList backPink">
      			{this.props.user.name && this.props.user.friends.map( (friend,index)=>{
      				return <FaveResultItem key={index} id={friend} />
      			})}
      		</div>
	  		<MessagesBox/>
	  </div>	
    );
  }
}
