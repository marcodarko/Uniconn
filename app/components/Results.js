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
	    {this.state.resMSG === "We Found Some Peeps :)" && <div className="alert alert-success greenBack noBorder purpleText" role="alert">
		  {this.state.resMSG}
		</div>}
		{this.state.resMSG === "No One Near You :(" && <div className="alert alert-danger pinkBack noBorder purpleText" role="alert">
		  {this.state.resMSG}
		</div>}
	    <br/>
	    <div className="row text-center">
	    {!this.props.userLong && <img src="./images/uniconn.png" width="50%" alt="results logo"/>}
	    {this.state.results && this.state.results.map( (doc,index)=>{

	    	let res= geolib.getDistance(
		    {latitude: parseFloat(this.props.userLat), longitude: parseFloat(this.props.userLong)},
		    {latitude: parseFloat(doc.latitude), longitude: parseFloat(doc.longitude)}
			);
			console.log(res);

	    	return <ResultItem key={index} photo={doc.photo} name={doc.name} username={doc.username}/>
	    })}
	    </div>
	    <hr/>
	    <div className='row'>
	    {this.props.userLong && <button className="btn themeButton" type='button' onClick={this.handleClick}>Find Friends</button>}
	    {!this.props.userLong && <div className="alert alert-warning yellowBack noBorder whiteText" role="alert">
		  <strong>Location Needed to Find Friends</strong>
		</div>}
		</div>
	  </div>
	</div>
    );
  }
}
