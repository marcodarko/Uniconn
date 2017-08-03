import React from 'react';
import axios from 'axios';

export default class ResultItem extends React.Component {


  constructor(props) {
    super(props);
    this.state={
      favorited: false,
      blocked: false,
      user:{},
      showDetails: false
    }
    this.favoriteThis= this.favoriteThis.bind(this);
    this.UnfavoriteThis= this.UnfavoriteThis.bind(this);
    this.blockThis= this.blockThis.bind(this);
    this.toggleDetails = this.toggleDetails.bind(this);
  }

  toggleDetails(){

    if(this.state.showDetails){
      this.setState({
        showDetails: false
      });
    }else{
      this.setState({
        showDetails: true
      });
    }

  }

  favoriteThis(pickedUsername){
    axios.put(/favorite/+this.props.userID, {username: pickedUsername}).then( res=>{

      //console.log('res fave', res.data);
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
      <div onClick={this.toggleDetails} className="col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-3 resContainer  whiteText" style={{display: this.state.blocked ? 'none':'initial'}}>
      <div className="resultItemBox" style={{backgroundColor: this.state.favorited? '#ecd8ff': 'lightpink', backgroundImage:'url('+this.props.photo+')', backgroundSize:'cover', backgroundRepeat:'no-repeat', backgroundPosition:'center'}}>
      {this.props.status === 'online'? <span title='online' style={{color:'#b6fc5e'}} className="glyphicon glyphicon-globe" aria-hidden="true"></span> : <span title='offline' style={{color:'#fa4d76'}} className="glyphicon glyphicon-globe" aria-hidden="true"></span>}
          {!this.state.showDetails && <div className="resultGradientBox">         
            <div className="row">
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 text-center">
                <span title='block' className=" glyph" style={{fontSize:"2em", cursor:'pointer'}} onClick={ ()=>{ this.blockThis(this.props.username) } } className="glyphicon glyphicon-ban-circle" aria-hidden="true"></span>
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 text-center">
                {!this.state.favorited && <span title='favorite' style={{fontSize:"2em", cursor:'pointer'}} className=" glyph" onClick={ ()=>{ this.favoriteThis(this.props.username) } } className="glyphicon glyphicon-plus" aria-hidden="true"></span>}
                {this.state.favorited && <span title='unfavorite' style={{fontSize:"2em", cursor:'pointer'}} className=" glyph" onClick={ ()=>{ this.UnfavoriteThis(this.props.username) } } className="glyphicon glyphicon-minus" aria-hidden="true"></span>}
              </div>
            </div>
            <hr style={{border: 'violet 1px solid'}}/>
            <h5 style={{textShadow:'1px 1px 2px black'}}>@{this.props.username}</h5>
            <p className="whiteText">{this.props.friends} friends</p>
          </div>}
          {this.state.showDetails && <div className="resultGradientBox2">
            <img src={this.props.photo} alt="details photo" className="detailsPhoto"/>
            <h5 className="whiteText">About <span style={{color:'hotpink'}}>@{this.props.username}</span></h5>        
            <p className="whiteText" style={{fontSize:'12px'}}>{this.props.description}</p>
            <p className="whiteText">Here For: <b>{this.props.herefor}</b></p>
          </div>}
        </div>
      </div>
    );
  }
}
