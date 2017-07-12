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
      <div className="panel panel-default col-sm-12 col-m-12 col-lg-12">
	  <div className="panel-body text-center">
	  	Results
	  	<hr/>
	    {this.state.resMSG === "We Found Some Peeps :)" && <div className="alert alert-success" role="alert">
		  {this.state.resMSG}
		</div>}
		{this.state.resMSG === "No One Near You :(" && <div className="alert alert-danger" role="alert">
		  {this.state.resMSG}
		</div>}
	    <br/>
	    {this.state.results && this.state.results.map( (doc,index)=>{

	    	let res= geolib.getDistance(
		    {latitude: parseFloat(this.props.userLat), longitude: parseFloat(this.props.userLong)},
		    {latitude: parseFloat(doc.latitude), longitude: parseFloat(doc.longitude)}
			);
			console.log(res);

	    	return <ResultItem key={index} photo={doc.photo} name={doc.name} username={doc.username}/>
	    })}
	    {this.props.userLong && <button className="btn btn-primary" type='button' onClick={this.handleClick}>Find Friends</button>}
	    {!this.props.userLong && <div className="alert alert-warning" role="alert">
		  Location Needed to Find Friends
		</div>}
	  </div>
	</div>
    );
  }
}
