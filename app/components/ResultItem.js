import React from 'react';

export default class ResultItem extends React.Component {


  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-xs-12 col-sm-6 col-md-3 col-lg-2 col-xl-2 resContainer  purpleText">
        <div className="resultItemBox">
          <div className="backPurple whiteText" style={{padding:'5px', borderRadius:'10px'}}>
            <span style={{color:'hotpink'}} className="glyphicon glyphicon-screenshot" aria-hidden="true"></span> <strong>{this.props.feetAway}</strong> feet away
          </div>
          {this.props.feetAway < 3000000 && <div className="heartbeat"><span style={{color:'hotpink'}} className="glyphicon glyphicon-star" aria-hidden="true"></span> <strong style={{color:'hotpink'}}>Super Close</strong></div> || <div><span className="glyphicon glyphicon-plane" aria-hidden="true"></span> Far Far Away</div> }
        	<img src={this.props.photo || "./images/default.png" }/>
        	<h5>{this.props.name}</h5>
        	<p>@{this.props.username}</p>
          <div className="row">
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 text-right">
              <button type="button" className="btn wink"><span style={{color:'#76399e'}} className="glyphicon glyphicon-ban-circle" aria-hidden="true"></span> Block</button>
            </div>
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 text-left">
              <button type="button" className="btn hot"><span style={{color:'hotpink'}} className="glyphicon glyphicon-star" aria-hidden="true"></span> Fave</button>
            </div>
          </div>
          <hr/>
          <button type="button" className="btn connButton"><span  className="glyphicon glyphicon-comment" aria-hidden="true"></span> CONN</button>
        </div>
      </div>
    );
  }
}
