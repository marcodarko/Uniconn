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

  favoriteThis(pickedUsername){
    axios.put(/favorite/+this.props.userID, {username: pickedUsername}).then( res=>{

      console.log('res fave', res.data);
      this.setState({
        favorited: true
      });
      this.props.updateUser();
    });

  }

  UnfavoriteThis(pickedUsername){
    axios.put(/unfavorite/+this.props.userID, {username: pickedUsername}).then( res=>{
 
        this.setState({
         favorited: false
      });
      this.props.updateUser();
    });
  
  }

   blockThis(pickedUsername){
    axios.put(/block/+this.props.userID, {username: pickedUsername}).then( res=>{

      this.setState({
       blocked: true
      });
    });
    
  }


  render() {
    return (
      <div className="col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-3 resContainer  whiteText" style={{display: this.state.blocked ? 'none':'initial'}}>
      <div className="resultItemBox" style={{backgroundColor: this.state.favorited? '#ecd8ff': 'lightpink', backgroundImage:'url('+this.props.photo || './images/default.png'+')', backgroundSize:'cover', backgroundRepeat:'no-repeat', backgroundPosition:'center'}}>
          <div className="resultGradientBox">        	
            <div className="row">
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 text-center">
                <span className=" glyph" style={{fontSize:"2em", cursor:'pointer'}} onClick={ ()=>{ this.blockThis(this.props.username) } } className="glyphicon glyphicon-ban-circle" aria-hidden="true"></span>
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 text-center">
                {!this.state.favorited && <span style={{fontSize:"2em", cursor:'pointer'}} className=" glyph" onClick={ ()=>{ this.favoriteThis(this.props.username) } } className="glyphicon glyphicon-plus" aria-hidden="true"></span>}
                {this.state.favorited && <span style={{fontSize:"2em", cursor:'pointer'}} className=" glyph" onClick={ ()=>{ this.UnfavoriteThis(this.props.username) } } className="glyphicon glyphicon-minus" aria-hidden="true"></span>}
              </div>
            </div>
            <hr style={{border: 'violet 1px solid'}}/>
            <h5 style={{textShadow:'1px 1px 2px black'}}>@{this.props.username}</h5>
            <p style={{color:'lightpink'}}>{this.props.name}</p>
            <button type="button" className="btn themeButton"><span  className="glyphicon glyphicon-comment" aria-hidden="true"></span> CONN</button>

          </div>
        </div>
      </div>
    );
  }
}
