
var axios = require("axios");
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import MainIcon1 from './MainIcon1';

import ageCalculator from 'age-calculator';
import {AgeFromDateString, AgeFromDate} from 'age-calculator';

export default class RegisterForm extends React.Component{

constructor(props) {
  super(props);
   this.state = {
     username: "",
     password:'',
     password1: "",
     password2: "",
     name: "",
     age:'',
     email:"",
     identity: '',
     herefor:'',
     passwordMSG:"",
     submitMSG:'',
     latitude:'',
     longitude: '',
     locationMSG: "Get Location",
     relationship:'',
     ageMSG: '',
     usernameMSG:'',
     submitBtn: false
    };
  this.getPassword1 = this.getPassword1.bind(this);
  this.getPassword2 = this.getPassword2.bind(this);
  this.getEmail = this.getEmail.bind(this);
  this.getName = this.getName.bind(this);
  this.getUsername = this.getUsername.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  this.getIdentity = this.getIdentity.bind(this);
  this.getHereFor = this.getHereFor.bind(this);
  this.comparePasswords = this.comparePasswords.bind(this);
  this.getAge = this.getAge.bind(this);
  this.checkState = this.checkState.bind(this);
  this.getLocation = this.getLocation.bind(this);
  this.getDescription = this.getDescription.bind(this);
  this.getRelationship = this.getRelationship.bind(this);
  this.getHeight = this.getHeight.bind(this);
  this.getWeight = this.getWeight.bind(this);
  this.renderCheck = this.renderCheck.bind(this);
}

renderCheck(){
  return (
      <span style={{color:'#74ed8a', textShadow:'1px 1px 1px #b14204'}} className="glyphicon glyphicon-ok-sign" aria-hidden="true"></span>
    )
}

getName(event){

  	this.setState({
  		name: event.target.value.toLowerCase()
  	})

}

getHeight(event){

    this.setState({
      height: event.target.value.trim()
    })

}

getWeight(event){

    this.setState({
      weight: event.target.value.trim()
    })

}

getUsername(event){

    let x= event.target.value.trim();
    x.toLowerCase();

    if (x){
        axios.get('/user-u/'+x ).then(res=>{

          if( res.data ){
            this.setState({
              usernameMSG: "Username is Taken"
            })
          }else{
            this.setState({
              username: x,
              usernameMSG: "Username Available"
            })
          }

        });
    }else{
      this.setState({
        usernameMSG: ''
      })
    }
}
getEmail(event){

  	this.setState({
  		email: event.target.value.toLowerCase()
  	})

}
getIdentity(event){

    this.setState({
      identity: event.target.value
    })

}

getAge(event){
    
  let ageFromString = new AgeFromDateString(event.target.value).age;
  //console.log('Your Age', ageFromString);
  
  if( parseInt(ageFromString) >= 18){
    this.setState({
      age: ageFromString,
      ageMSG: "Age OK"
    });
  }else if( parseInt(ageFromString) < 18){
    this.setState({
      ageMSG: 'You Must Be 18 or Older To Sign Up'
    });
  }else if( parseInt(ageFromString) > 100){
    this.setState({
      ageMSG: 'Please Use Date Picker'
    });
  }

}

getDescription(event){
    this.setState({
      description: event.target.value.trim()
    });

}

getHereFor(event){

    this.setState({
      herefor: event.target.value
    });

}

getRelationship(event){

    this.setState({
      relationship: event.target.value
    });

}

getPassword1(event){
    let pass1 = event.target.value.trim();
    //console.log(pass1);
  	this.setState({
  		password1: pass1
  	});
    
    
}
getPassword2(event){
    let pass2 = event.target.value.trim();
    //console.log(pass2);
  	this.setState({
  		password2: pass2
  	});

}

comparePasswords(pass1, pass2){

    if (pass1 !== pass2){
      this.setState({
      passwordMSG: "Passwords Must Match"
       });
      return false;
    }
    else if(pass1 === pass2){
      this.setState({
      passwordMSG: "Passwords Match",
      password: pass1
       });

      return true;
    }
}

checkState(){
  if( this.state.name &&
    this.state.username &&
    this.state.age &&
    this.description &&
    this.state.password1 && 
    this.state.password2 &&
    this.state.herefor &&
    this.state.identity &&
    this.state.latitude &&
    this.state.relationship &&
    this.state.height &&
    this.state.weight &&
    this.state.longitude){
    
    return true;
  }
  else{
    this.setState({
    submitMSG:"All fields must be filled out"
    });
    return false;
  }
}

handleSubmit(){

  var passwordComparison = this.comparePasswords(this.state.password1, this.state.password2);
  var everythingFilledOut = this.checkState();

 if( passwordComparison && everythingFilledOut ){
  var newUserInfo={
    name: this.state.name,
    username: this.state.username,
    age: this.state.age,
    email: this.state.email,
    password: this.state.password1,
    herefor: this.state.herefor,
    identity: this.state.identity,
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    description: this.state.description,
    relationship: this.state.relationship,
    height: this.state.height,
    weight: this.state.weight
  }

  axios.post('/register', newUserInfo).then(res=>{

    console.log("registration res", res.data);
    this.setState({
    submitMSG:"You Can Login Now!"
    });

  }).catch(err=>{
    this.setState({
    submitMSG:"Invalid Information"
    });
  })

 }else{
  this.setState({
    submitMSG:"Check User Info"
  });
 }

}


 getLocation(){
      //console.log("this is happening");
      navigator.geolocation.getCurrentPosition( (location,err) =>{

        if(location){
          let locationLatitude= location.coords.latitude;
          let locationLongitude= location.coords.longitude;
          this.setState({
            latitude: locationLatitude,
            longitude: locationLongitude,
            locationMSG: "Location Found"
          });
        }
        else{
          this.setState({
            locationMSG:"Location Not Found"
          })
        }

    });

    //console.log(this.state);
  }

  // Here we render the function
  render() {

    return (

    	<div className="container registerContainer">
      <h5 className="whiteText">New User Registration</h5>
      <img className="regImg" src="./images/unireg.jpg" alt='login banner uniconn'/>
      <hr/>
			<form>      
			   <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
			    <label>Name</label>
			    <input style={{margin:'auto'}} type="text" className="form-control themeInput" placeholder="Name" name="name" required onChange={this.getName}></input>
          {this.state.name && this.renderCheck()}
			  </div>
        <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <label>Age</label>
          <input style={{margin:'auto'}} type="date" className="form-control themeInput" placeholder="Age" name="age" required onChange={this.getAge}></input>
          <h5 style={{color: this.state.ageMSG === "You Must Be 18 or Older To Sign Up" ? 'red': "white"}}>{this.state.ageMSG}</h5>
          {this.state.age && this.renderCheck()}
        </div>
        <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <label>Height (Feet.Inches)</label>
          <input autoComplete='off' maxLength='3' style={{margin:'auto'}} type="text" className="form-control themeInput" placeholder="Height Ex. 6.9 " name="name" required onChange={this.getHeight}></input>
          {this.state.height && this.renderCheck()}
        </div>
        <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <label>Weight (Pounds)</label>
          <input autoComplete='off' maxLength='3' style={{margin:'auto'}} type="text" className="form-control themeInput" placeholder="Weight Ex. 155" name="name" required onChange={this.getWeight}></input>
          {this.state.weight && this.renderCheck()}
        </div>
        <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <label>A Little About You (130 characters max)</label>
          <textarea rows="4" maxLength='130' style={{margin:'auto'}} type="text" className="form-control themeInput" placeholder="Type Here..." name="description" required onChange={this.getDescription}></textarea>
          {this.state.description && this.renderCheck()}
        </div>
         <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <label>Here For</label>
          <br/>
          <select onChange={this.getHereFor}>
            <option value="">Choose your option</option>
            <option value="friends">Friends</option>
            <option value="dating">Dating</option>
            <option value="whatever">Whatever</option>
          </select>
          {this.state.herefor !== ''  && this.renderCheck()}
        </div>
        <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <label>Sexual Identity</label>
          <br/>
          <select onChange={this.getIdentity}>
            <option value="">Choose your option</option>
            <option value="gay">Gay</option>
            <option value="bi">Bi</option>          
            <option value="transgender">Transgender</option>
            <option value="genderqueer">GenderQueer</option>
            <option value="non-binary">Non-Binary</option>
            <option value="androgenous">Androgenous</option>
            <option value="fluid">Fluid</option>
          </select>
          {this.state.identity !== ''  && this.renderCheck()}
        </div>
        <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <label>Relationship status</label>
          <br/>
          <select onChange={this.getRelationship}>
            <option value="">Choose your option</option>
            <option value="single">Single</option>
            <option value="dating someone">Dating Someone</option>
            <option value="serious relationship">Serious Relationship</option>          
            <option value="married">Married (Monogamous)</option>
            <option value="open relationship">Open Relationship</option>
            <option value="complicated">Complicated</option>
          </select>
          {this.state.relationship !== '' && this.renderCheck()}
        </div>
        <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center">
          <label>Set Location</label><br/>
          <MainIcon1 getLocation={this.getLocation} locationMSG={this.state.locationMSG}/>
           {this.state.locationMSG === "Location Found" && this.renderCheck()}
        </div>
			  <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
			    <label>Username</label>
			    <input style={{margin:'auto'}} type="text" className="form-control themeInput" placeholder="Username" name="username" required onChange={this.getUsername}></input>
          <h5 style={{color: this.state.usernameMSG === "Username is Taken" ? 'red': "white"}}>{this.state.usernameMSG}</h5>
          {this.state.usernameMSG  === 'Username Available' && this.renderCheck()}
			  </div>
			   <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
			    <label>Email</label>
			    <input style={{margin:'auto'}} type="email" className="form-control themeInput" placeholder="Email" name="email" required onChange={this.getEmail}></input>
          {this.state.email && this.renderCheck()}
			  </div>
			  <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
			    <label>Password</label>
			    <input style={{margin:'auto'}} type="password" className="form-control themeInput" placeholder="Password" name="password1" required onChange={this.getPassword1}></input>
          
			  </div>
        <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center">
          <span style={{color: this.state.passwordMSG === "Passwords Match" ? '#00db8e': "#ff6464"}}>{this.state.passwordMSG}</span>

        </div>
			  <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
			    <label>Confirm Password</label>
			    <input style={{margin:'auto'}} type="password" className="form-control themeInput" placeholder="Confirm Password" name="password2" required onChange={this.getPassword2}></input>
           
			  </div>        
        <hr/>
			   <button type="button" onClick={this.handleSubmit} className="btn btn-lg loginButton">Submit</button>
        <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center">
        <h3 className='heartbeat' style={{color: this.state.submitMSG === "You Can Login Now!" ? '#00db8e': "#ff6464"}}>{this.state.submitMSG}</h3>
       </div>
			</form>
		</div>
    );
  }

};




