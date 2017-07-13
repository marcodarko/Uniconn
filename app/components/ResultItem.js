import React from 'react';

export default class ResultItem extends React.Component {


  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-sm-12 col-md-3 col-lg-2 resultItemBox purpleText slide-in-fwd-center">
      	<img src={this.props.photo || "https://emojipedia-us.s3.amazonaws.com/thumbs/120/apple/96/unicorn-face_1f984.png" }/>
      	<h5>{this.props.name}</h5>
      	<p>@{this.props.username}</p>
      </div>
    );
  }
}
