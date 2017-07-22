import React from 'react';
import axios from 'axios';
import ResultItem from './ResultItem';

export default class Results extends React.Component {

  constructor(props) {
    super(props);
    this.state={
    	resMSG:'',
    	results: [],
    	pickedDistance:''
    }
    this.handleClick = this.handleClick.bind(this);
    this.getDistance = this.getDistance.bind(this);
  }

getDistance(e){

	this.setState({
		pickedDistance: e.target.value
	})
}

 handleClick(){

    	 axios.post('/api/find-all',{lat: this.props.user.latitude, lon: this.props.user.longitude, distance:this.state.pickedDistance}).then( res=>{

			console.log("API res",res.data);
			this.setState({
				resMSG: "We Found Some Peeps :)",
				results: res.data
			})
			//console.log("state results",this.state.results);

		}).catch(err=>{
			this.setState({
				resMSG: "No One Near You :("
			})
		});



  }

  render() {
    return (
      <div className="panel panel-default col-sm-12 col-m-12 col-lg-12 backPink noBorder slide-in-fwd-center" style={{margin:'0px'}}>
	  <div className="panel-body text-center">
	  	<div className='row'>
	    	 {this.props.user.name && <h3 className="whiteText">Find Friends</h3>}
	    	 {this.props.user.name && <form>
	    	 	<label className='whiteText'>Distance</label>
	    	 	<br/>
	    	 	<select onChange={this.getDistance}>
	    	 		<option value="" disabled >Choose Distance</option>
	    	 		<option value='2640'>Within 5 Miles</option>
	    	 		<option value='52800'>Within 10 Miles</option>
	    	 		<option value='79200'>Within 15 Miles</option>
	    	 		<option value='264000'>Within 50 Miles</option>
	    	 		<option value='528000'>Within 100 Miles</option>
	    	 	</select>
	    	 </form>}
	     	 {this.state.pickedDistance && <button className="btn themeButton heartbeat" type='button' onClick={this.handleClick}><span style={{color:'lightblue'}} className="glyphicon glyphicon-heart" aria-hidden="true"></span> Go <span style={{color:'lightyellow'}} className="glyphicon glyphicon-heart" aria-hidden="true"></span></button>}	    
		</div>
	    {this.state.resMSG === "We Found Some Peeps :)" && <div className="alert alert-success alert-dismissable orangeBack noBorder whiteText" role="alert">
		  <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		  {this.state.resMSG}
		</div>}
		{this.state.resMSG === "No One Near You :(" && <div className="alert alert-danger alert-dismissable pinkBack noBorder whiteText" role="alert">
		  <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		  {this.state.resMSG}
		</div>}
	    <br/>
	    <div id="resultsHere" className="row text-center">
	    {!this.props.user.name && <img src="./images/homeHero.jpg" alt="home image uniconn" className="jello-horizontal heroImg"/>}
	    {this.state.results && this.state.results.map( (doc,index)=>{

	    	return <ResultItem userID={this.props.user._id} key={index}  photo={doc.photo} name={doc.name} username={doc.username} id={doc._id}/>
	    })}
	    </div>

	  </div>
	</div>
    );
  }
}
