import React from 'react';

export default class ResultItem extends React.Component {


  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-xs-12 col-sm-6 col-md-3 col-lg-2 col-xl-2 resContainer  purpleText">
        <div className="resultItemBox">
          <div className="purpleBack whiteText" style={{padding:'5px', borderRadius:'10px'}}>
            <span className="glyphicon glyphicon-screenshot" aria-hidden="true"></span> <strong>{this.props.feetAway}</strong> Feet Away
          </div>
          {this.props.feetAway< 2000000 && <div><span className="glyphicon glyphicon-star" aria-hidden="true"></span> Super Close</div> || <div><span className="glyphicon glyphicon-plane" aria-hidden="true"></span> Kinda Far</div> }
        	<img src={this.props.photo || "https://emojipedia-us.s3.amazonaws.com/thumbs/120/apple/96/unicorn-face_1f984.png" }/>
        	<h5>{this.props.name}</h5>
        	<p>@{this.props.username}</p>
          <hr/>
          <button type="button" className="btn connButton"><span className="glyphicon glyphicon-comment" aria-hidden="true"></span> CONN</button>
        </div>
      </div>
    );
  }
}
