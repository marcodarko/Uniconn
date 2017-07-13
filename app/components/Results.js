import React from 'react';
import axios from 'axios';
import geolib from 'geolib';
import ResultItem from './ResultItem';

export default class Results extends React.Component {

  constructor(props) {
    super(props);
    this.state={
    	resMSG:'',
    	results: []
    }
    this.handleClick = this.handleClick.bind(this);
  }

  // componentDidMount(){

  // 	axios.get('/api/find-all').then( res=>{

		// 	console.log("API res",res.data);
		// 	this.setState({
		// 		resMSG: "We Found Some Peeps :)"
		// 	})
		// }).catch(err=>{
		// 	this.setState({
		// 		resMSG: "No One Near You :("
		// 	})
		// });
  // }



 handleClick(){

    	 axios.get('/api/find-all').then( res=>{

			console.log("API res",res.data);
			this.setState({
				resMSG: "We Found Some Peeps :)",
				results: res.data
			})
			console.log("state results",this.state.results);

		}).catch(err=>{
			this.setState({
				resMSG: "No One Near You :("
			})
		});



  }

  render() {
    return (
      <div className="panel panel-default col-sm-12 col-m-12 col-lg-12 backPink noBorder">
	  <div className="panel-body text-center">
	  	{!this.props.userLong && <div className="alert alert-warning yellowBack noBorder whiteText heartbeat" role="alert">
		  <strong>Location Needed to Find Friends</strong>
		</div>}
	    {this.state.resMSG === "We Found Some Peeps :)" && <div className="alert alert-success alert-dismissable greenBack noBorder whiteText" role="alert">
		  <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		  {this.state.resMSG}
		</div>}
		{this.state.resMSG === "No One Near You :(" && <div className="alert alert-danger alert-dismissable pinkBack noBorder whiteText" role="alert">
		  <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		  {this.state.resMSG}
		</div>}
	    <br/>
	    <div className="row text-center">
	    {!this.props.userLong && <img style={{borderRadius:"20px"}} src="./images/homeHero.jpg" width="90%" alt="home image uniconn" className="jello-horizontal"/>}
	    {this.state.results && this.state.results.map( (doc,index)=>{

	    	let res= geolib.getDistance(
		    {latitude: parseFloat(this.props.userLat), longitude: parseFloat(this.props.userLong)},
		    {latitude: parseFloat(doc.latitude), longitude: parseFloat(doc.longitude)}
			);
			console.log(res);
			let distance = res/3.28084;

	    	return <ResultItem key={index} feetAway={distance.toFixed(2)} photo={doc.photo} name={doc.name} username={doc.username}/>
	    })}
	    </div>
	    <hr/>
	    <div className='row'>
	    {this.props.userLong && <h2 className="whiteText">Find Friends</h2>}
	    {this.props.userLong && <button className="btn themeButton heartbeat" type='button' onClick={this.handleClick}><span style={{color:'lightblue'}} className="glyphicon glyphicon-heart" aria-hidden="true"></span> Go <span style={{color:'lightyellow'}} className="glyphicon glyphicon-heart" aria-hidden="true"></span></button>}
	    
		</div>
	  </div>
	</div>
    );
  }
}
