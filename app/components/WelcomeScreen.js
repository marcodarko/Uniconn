import React from 'react';

export default class WelcomeScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 clearBoth rainOrange"> 		
		<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 purpleTextscale-in-hor-left text-center" style={{backgroundColor: 'none', padding:'20px'}}>
			<img className="pictureFW" src="./images/homeHero.jpg" alt="hero"/>
		</div>			
		<div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3 welcomeText rainPink whiteText scale-in-hor-left text-center well noBorder">
			<img className="pictureHW" src="./images/iconUnicorn.svg" alt="boys"/>
			<h3 className="colorChange juneFont">UniConn</h3>
			<hr/>
			<p>Finding gay friends just got easier.</p>
		</div>
		<div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3 welcomeText rainPurple whiteText scale-in-hor-left text-center well noBorder">
			<img className="pictureHW" src="./images/iconBoys.svg" alt="boys"/>
			<h3 className="colorChange juneFont">Boys</h3>
			<hr/>
			<p>Do we have to say anything more?</p>
		</div>
		<div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3 welcomeText rainBlue purpleText scale-in-hor-left text-center well noBorder">
			<img className="pictureHW" src="./images/iconMarker.svg" alt="boys"/>
			<h3 className="colorChange juneFont">Discover</h3>
			<hr/>
			<p>Search for guys in your area!</p>
		</div>
		<div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3 welcomeText rainGreen purpleText scale-in-hor-left text-center well noBorder">
			<img className="pictureHW" src="./images/iconCouple.svg" alt="boys"/>
			<h3 className="colorChange juneFont">Connect</h3>
			<hr/>
			<p>Favorite and talk to that special guy.</p>
		</div>
      </div>
    );
  }
}
