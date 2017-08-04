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

			//console.log("API res",res.data);
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
      <div className="panel panel-default col-sm-12 col-m-12 col-lg-12 backPink noBorder clearBoth" style={{margin:'0px'}}>
	  <div className="panel-body text-center">
	  	<div className='row'>
	    	 {this.props.user.name && <h3 className="whiteText">Find Friends</h3>}
	    	 {this.props.user.name && <form>
	    	 	<label className='whiteText'>Distance</label>
	    	 	<br/>
	    	 	<select onChange={this.getDistance}>
	    	 		<option value="" >Choose Distance</option>
	    	 		<option value='2640'>Within 5 Miles</option>
	    	 		<option value='52800'>Within 10 Miles</option>
	    	 		<option value='79200'>Within 15 Miles</option>
	    	 		<option value='264000'>Within 50 Miles</option>
	    	 		<option value='528000'>Within 100 Miles</option>
	    	 	</select>
	    	 </form>}
	    	 <br/>
	     	 {this.state.pickedDistance && this.props.user.name && <button className="btn themeButton heartbeat" type='button' onClick={this.handleClick}>Search</button>}	    
		</div>
		{this.state.resMSG === "No One Near You :(" && this.props.user.name && <div className="alert alert-danger alert-dismissable pinkBack noBorder whiteText" role="alert">
		  <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		  {this.state.resMSG}
		</div>}
	    <br/>
	    <div id="resultsHere" className="row text-center">
	    {this.state.results && this.props.user.name && this.state.results.map( (doc,index)=>{
	    	if(doc.username !== this.props.user.username){
	    		return <ResultItem updateUser={this.props.updateUser} userID={this.props.user._id} friends={doc.friends.length} status={doc.status} key={index}  photo={doc.photo} name={doc.name} username={doc.username} herefor={doc.herefor} description={doc.description} id={doc._id}/>
	    	}
	    })}

	    </div>

	  </div>

	</div>
    );
  }
}
