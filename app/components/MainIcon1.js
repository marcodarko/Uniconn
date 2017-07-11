import React from 'react';
import {TweenMax, Power2, TimelineLite, TweenLite} from "gsap";
import { NavLink } from 'react-router-dom';
import ReactDOM from 'react-dom';
import KUTE from 'kute.js';

export default class MainIcon1 extends React.Component {


  constructor(props) {
    super(props);
    this.state={
    	locationLatitude:'',
    	locationLongitude: '',
    	locationMSG: "Get Location"
    }
    this.handleClick = this.handleClick.bind(this);
    this.getLocation = this.getLocation.bind(this);
  }

  getLocation(){
  	 	navigator.geolocation.getCurrentPosition( (location,err) =>{

  	 		if(location){
  	 			let locationLatitude= location.coords.latitude;
		  		let locationLongitude= location.coords.longitude;
		  		this.setState({
		  			locationLatitude: locationLatitude,
		  			locationLongitude: locationLongitude,
		  			locationMSG: "Location Found"
		  		});
  	 		}
  	 		else{
  	 			this.setState({
  	 				locationMSG:"Location Not Found"
  	 			})
  	 		}

  	});

  	console.log(this.state);
  }

  handleClick(){
  	console.log('clicked');
  	var circle = this.refs.Circle;
  	var star = this.refs.Star;
  	console.log(circle);
  	console.log(star);
  	//TweenLite.to(circle, 1, {morphSVG: star});
  	//console.log(KUTE);
  	KUTE.to(circle, { path: star }).start();
  	// 	      	<svg  viewBox="0 0 100 100" onClick={this.handleClick, this.getLocation} style={{width:'50px'}}>
			// <g>
			// 	<circle ref='Circle' style={{fill:"#93278F"}} cx="50" cy="50" r="50"/>
			// </g>
			// 	<path ref="Star" style={{fill:"#93278F", visibility:'hidden'}} d="M53.407,11.704l10.462,21.198c0.553,1.122,1.623,1.899,2.861,2.079l23.394,3.399
			// c3.117,0.453,4.361,4.283,2.106,6.481l-16.928,16.5c-0.896,0.873-1.304,2.131-1.093,3.363l3.996,23.299
			// c0.532,3.104-2.726,5.471-5.513,4.006l-20.924-11c-1.107-0.582-2.429-0.582-3.536,0l-20.924,11
			// c-2.788,1.466-6.046-0.902-5.513-4.006l3.996-23.299c0.211-1.233-0.197-2.49-1.093-3.363L7.77,44.862
			// c-2.255-2.198-1.011-6.028,2.106-6.481l23.394-3.399c1.238-0.18,2.308-0.957,2.861-2.079l10.462-21.198
			// C47.986,8.88,52.014,8.88,53.407,11.704z"/>
			//</svg>
  }

  render() {
    return (
		<button className="btn btn-primary" onClick={this.getLocation}>{this.state.locationMSG}</button>
    );
  }
}
