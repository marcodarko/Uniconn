import React from 'react';

export default class ResultItem extends React.Component {


  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-sm-12 col-md-4 col-lg-2">
      	<img src={this.props.photo || "https://www.atomix.com.au/media/2015/06/atomix_user31.png" } style={{borderRadius:'100%', width:'50px'}}/>
      	<p>{this.props.name}</p>
      	<p>{this.props.username}</p>
      </div>
    );
  }
}
