import React from 'react';

export default class WelcomeScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 clearBoth rainOrange">
 		<div className="flexP">
 			<div className="flexC100 rainGreen purpleText well scale-in-hor-left text-center" style={{border:'none'}}>
 				<img className="pictureFW" src="./images/homeHero.jpg" alt="hero"/>
 			</div>			
 			<div className="flexC2 rainYellow purpleText well scale-in-hor-left text-center" style={{border:'none'}}>
 				<img className="pictureFW" src="./images/hearteyes.jpg" alt="hearteyes"/>
 				<h5>UniConn</h5>
 				<hr/>
 			 	<p>Sometimes finding gay friends in your area is as hard as finding a unicorn. <br/> Until now.</p>
 			 	<h3 className="purpleText colorChange" style={{textShadow:'2px 2px 0px orange'}}>UniConn</h3>
 			 	<p><i>The gay friend finder.</i></p>
 			</div>
 			<div className="flexC2 rainBlue whiteText well scale-in-hor-left text-center" style={{border:'none'}}>
 				<img className="pictureFW" src="./images/boys.png" alt="boys"/>
 				<h4>Boys</h4>
 				<hr/>
 				<h3 className="whiteText juneFont" style={{textShadow:'2px 2px 0px hotpink'}}>BOYS</h3>
 				<h2 className="whiteText juneFont" style={{textShadow:'2px 2px 0px hotpink'}}>BOYS</h2>
 				<h1 className="whiteText juneFont" style={{textShadow:'2px 2px 0px hotpink'}}>BOYS</h1>
 			 	<p>Do we need to say anything more?</p>
 			</div>
 			<div className="flexC rainPurple whiteText well scale-in-hor-right text-center" style={{border:'none'}}>
 				<img className="pictureFW" src="./images/inbox.png" alt="inbox UniConn"/>
 				<h4>Private Messages</h4>
 				<hr/>
 			 	<p>Private messaging is unlocked if both guys have each other as a favorite.</p>
 			 	<img src="./images/horn.png" alt="gif UniConn" className="pictureFW heartbeat"/>
 			</div>
 			<div className="flexC rainPink whiteText well scale-in-hor-left text-center" style={{border:'none'}}>
 				<img className="pictureFW" src="./images/chat.png" alt="chat UniConn"/>
 				<h4>Chats</h4>
 				<hr/>
 			 	<p>Chat with all the guys online or privately with boys you've favorited</p>
 			 	<img src="./images/unihead.png" alt="gif UniConn" className="pictureHW rotate"/>
 			</div>
 			<div className="flexC3 rainOrange purpleText well scale-in-hor-right text-center" style={{border:'none'}}>
 				<img className="pictureFW" src="./images/heyhi.jpg" alt="heyhi"/>
 				<h4>Connect</h4>
 				<hr/>
 			 	<p>Find friends withing a specific radius of your location and connect with them.</p>
 			</div>
 			<div className="flexC rainGreen purpleText well scale-in-hor-right text-center" style={{border:'none'}}>
 				<img className="pictureFW" src="./images/match.png" alt="match UniConn"/>
 				<h4>Matches</h4>
 				<hr/>
 			 	<p>When a guy adds you to their favorites we will let you know so you can hit that. <strong>Hard.</strong></p>
 			 	<img src="./images/uni.gif" alt="gif UniConn" className="pictureFW"/>
 			 	<h4 className="whiteText" style={{textShadow:'2px 2px 0px hotpink'}}>You're his favorite too!</h4>
 			</div>

 		</div>
      </div>
    );
  }
}
