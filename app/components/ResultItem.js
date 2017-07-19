import React from 'react';
import axios from 'axios';

export default class ResultItem extends React.Component {


  constructor(props) {
    super(props);
    this.state={
      favorited: false,
      blocked: false,
      user:{}
    }
    this.favoriteThis= this.favoriteThis.bind(this);
    this.UnfavoriteThis= this.UnfavoriteThis.bind(this);
    this.blockThis= this.blockThis.bind(this);
  }

  favoriteThis(pickedId){
    axios.put(/favorite/+this.props.userID, {_id: pickedId}).then( res=>{

      console.log('res fave', res.data);
      this.setState({
        favorited: true
      });
    });

  }

  UnfavoriteThis(pickedId){
    axios.put(/unfavorite/+this.props.userID, {_id: pickedId}).then( res=>{
 
        this.setState({
         favorited: false
      });
    });
  
  }

   blockThis(pickedId){
    axios.put(/block/+this.props.userID, {_id: pickedId}).then( res=>{

      this.setState({
       blocked: true
      });
    });
    
  }

  // sendUserToHome={this.sendUserToHome}

  render() {
    return (
      <div className="col-xs-12 col-sm-6 col-md-3 col-lg-2 col-xl-2 resContainer  purpleText" style={{display: this.state.blocked ? 'none':'initial'}}>
        <div className="resultItemBox" style={{backgroundColor: this.state.favorited? '#ecd8ff': 'white'}}>
          <div className="backPurple whiteText" style={{padding:'5px', borderRadius:'10px'}}>
            <span style={{color:'hotpink'}} className="glyphicon glyphicon-screenshot" aria-hidden="true"></span> <strong>{this.props.feetAway}</strong> feet away
          </div>
          {this.props.feetAway < 500 && <div className="heartbeat"><span style={{color:'hotpink'}} className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> <strong style={{color:'#0591ff'}}>Right Next To You!</strong></div>}
          {this.props.feetAway < 2000 && this.props.feetAway > 500 && <div className="heartbeat"><span style={{color:'hotpink'}} className="glyphicon glyphicon-heart" aria-hidden="true"></span> <strong style={{color:'#0cc976'}}>Super Close</strong></div>}
        	{this.props.feetAway < 5000 && this.props.feetAway > 2000 && <div><span style={{color:'hotpink'}} className="glyphicon glyphicon-road" aria-hidden="true"></span> <strong style={{color:'#ebce00'}}>Driving Distance</strong></div>}
          {this.props.feetAway < 10000 && this.props.feetAway > 5000 && <div><span style={{color:'hotpink'}} className="glyphicon glyphicon-tint" aria-hidden="true"></span> <strong style={{color:'#f88b00'}}>Far</strong></div>}
          {this.props.feetAway < 2000000000 && this.props.feetAway > 10000 && <div><span style={{color:'hotpink'}} className="glyphicon glyphicon-plane" aria-hidden="true"></span> <strong style={{color:'#ec4f48'}}>Far Far Away</strong></div>}
          <img src={this.props.photo || "./images/default.png" }/>
        	<h5>@{this.props.username}</h5>
        	<p>{this.props.name}</p>
          <div className="row">
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 text-right">
              <button onClick={ ()=>{ this.blockThis(this.props.id) } } type="button" className="btn block"><span className="glyphicon glyphicon-ban-circle" aria-hidden="true"></span> Block</button>
            </div>
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 text-left">
              {!this.state.favorited && <button onClick={ ()=>{ this.favoriteThis(this.props.id) } } type="button" className="btn fave"><span  className="glyphicon glyphicon-plus" aria-hidden="true"></span> Fave</button>}
              {this.state.favorited && <button onClick={ ()=>{ this.UnfavoriteThis(this.props.id) } } type="button" className="btn fave2"><span  className="glyphicon glyphicon-minus" aria-hidden="true"></span>Fave</button>}
            </div>
          </div>
          <hr/>
          <button type="button" className="btn connButton"><span  className="glyphicon glyphicon-comment" aria-hidden="true"></span> CONN</button>
        </div>
      </div>
    );
  }
}
