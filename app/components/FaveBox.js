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
        <h5>General Chat</h5>
	  		<MessagesBox user={this.props.user}/>
	  </div>	
    );
  }
}
