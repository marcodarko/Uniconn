import React from 'react';
import axios from 'axios';

export default class FavoritesSlider extends React.Component {

  constructor(props) {
    super(props);
    this.state={
    	friends:[],
    	favoriteInfo:{},
    	currentFriend: 0,
    	message:''

    }
    this.getNext = this.getNext.bind(this);
    this.getPrevious = this.getPrevious.bind(this);
    this.getPrevious = this.getPrevious.bind(this);
    this.renderMain = this.renderMain.bind(this);
    this.renderFriend = this.renderFriend.bind(this);
  }

  getNext(){

  	if(this.props.user.friends[this.state.currentFriend + 1]){
  		this.setState({
  			currentFriend: this.state.currentFriend + 1
  		});
  		this.renderFriend();
  	}else{
  		this.setState({
  			currentFriend: 0
  		});
  		this.renderFriend();
  	}

  }

  getPrevious(){
  	if(this.props.user.friends[this.state.currentFriend - 1]){
  		this.setState({
  			currentFriend: this.state.currentFriend - 1
  		});
  		this.renderFriend();
  	}else{
  		this.setState({
  			currentFriend: this.props.user.friends.length -1
  		});
  		this.renderFriend();
  	}
  }

  renderFriend(){

  	axios.get('/user-u/'+this.props.user.friends[this.state.currentFriend]).then(res=>{
  		this.setState({
  			favoriteInfo: res.data
  		});
  	}).catch(err=>{
  		this.setState({
  			message: 'friend not found'
  		});
  	});
  }

  UnfavoriteThis(){
    axios.put(/unfavorite/+this.props.user._id, {username: this.state.favoriteInfo.username}).then( res=>{
        this.setState({
         currentFriend: 0,
         message: 'Bye, Felicia!'
      });
      this.props.updateUser();
      this.renderFriend();
    });
  }


  renderMain(){
  	return (
		  	<div>
		      
		      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 whiteText text-center">
		      	{this.state.favoriteInfo.name && <h5>Viewing Friend # {this.state.currentFriend + 1} out of {this.props.user.friends.length} friends</h5>}
		      	<p>{this.state.message}</p>
		      </div>
		      	<div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 text-center verticalCenter"><button onClick={()=>{ this.getPrevious()}} className="btn themeButton"><span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span></button></div>
		      	<div className="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 text-center">
		      		{!this.state.favoriteInfo.name && <button className="btn connButton" onClick={()=>{this.renderFriend()}}>My Favorites</button>} 
		      		{this.state.favoriteInfo.name && 
			      		<div className="whiteText">
			      		<img className="profilePhoto slide-in-fwd-center" src={this.state.favoriteInfo.photo || './images/default.png'} alt="favorite uniconn"/>     		
			      		<h5>@{this.state.favoriteInfo.username}</h5>
			      		<p>{this.state.favoriteInfo.name}, {this.state.favoriteInfo.age}</p>
			      		<p>{this.state.favoriteInfo.identity}</p>
			      		<p><b>Here for:</b> {this.state.favoriteInfo.herefor}</p>
			      		<button className="btn connButton" onClick={()=>{this.UnfavoriteThis()}}>REMOVE</button>
			      		<br/>
			      		</div>
		      		}
		      	</div>
		      	<div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 text-center verticalCenter"><button onClick={()=>{ this.getNext()}} className="btn themeButton"><span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></button></div>
		    </div>
  		)
  }

  render() {
    return (
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 rainPurple clearBoth">
      	{this.props.user.name && this.renderMain()}
      </div>
    );
  }
}