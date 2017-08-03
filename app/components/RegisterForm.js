
var axios = require("axios");
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import MainIcon1 from './MainIcon1';

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
     identity: 'gay',
     herefor:'friends',
     passwordMSG:"",
     submitMSG:'',
     latitude:'',
     longitude: '',
      locationMSG: "Get Location"
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
}

getName(event){

  	this.setState({
  		name: event.target.value.toLowerCase()
  	})

}
getUsername(event){

  	this.setState({
  		username: event.target.value.toLowerCase()
  	})


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
    this.setState({
      age: event.target.value.trim()
    });

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
    description: this.state.description
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
      <hr/>
			<form>
       
			   <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
			    <label>Name</label>
			    <input style={{margin:'auto'}} type="text" className="form-control themeInput" placeholder="Name" name="name" required onChange={this.getName}></input>
			  </div>
        <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <label>Age</label>
          <input style={{margin:'auto'}} type="text" className="form-control themeInput" placeholder="Age" name="age" required onChange={this.getAge}></input>
        </div>
        <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <label>A Little About You (130 characters max)</label>
          <textarea rows="4" maxLength='130' style={{margin:'auto'}} type="text" className="form-control themeInput" placeholder="Type Here..." name="description" required onChange={this.getDescription}></textarea>
        </div>
         <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <label>Here For</label>
          <br/>
          <select onChange={this.getHereFor}>
            <option value="" disabled >Choose your option</option>
            <option value="friends">Friends</option>
            <option value="dating">Dating</option>
            <option value="whatever">Whatever</option>
          </select>
        </div>
        <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <label>Sexual Identity</label>
          <br/>
          <select onChange={this.getIdentity}>
            <option value="" disabled >Choose your option</option>
            <option value="gay">Gay</option>
            <option value="bi">Bi</option>          
            <option value="transgender">Transgender</option>
            <option value="genderqueer">GenderQueer</option>
            <option value="non-binary">Non-Binary</option>
            <option value="androgenous">Androgenous</option>
            <option value="fluid">Fluid</option>
            <option value="unicorn">Unicorn</option>
          </select>
        </div>
			  <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
			    <label>Username</label>
			    <input style={{margin:'auto'}} type="text" className="form-control themeInput" placeholder="Username" name="username" required onChange={this.getUsername}></input>
			  </div>
			   <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
			    <label>Email</label>
			    <input style={{margin:'auto'}} type="email" className="form-control themeInput" placeholder="Email" name="email" required onChange={this.getEmail}></input>
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
        <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center">
          <label>Set Location</label><br/>
          <MainIcon1 getLocation={this.getLocation} locationMSG={this.state.locationMSG}/>
        </div>
			  <button type="button" onClick={this.handleSubmit} className="btn btn-lg loginButton">Submit</button>
        <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center">
        <h3 style={{color: this.state.submitMSG === "Success" ? '#00db8e': "#ff6464"}}>{this.state.submitMSG}</h3>
       </div>
			</form>
		</div>
    );
  }

};




