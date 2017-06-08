var express = require('express');
var router = express.Router();
var User = require('../models/User');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Get Homepage
router.get('/', function(req, res){
	res.send("index.html");
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/');
	}
}


router.post('/register', function(req, res){

	// var name = req.body.name;
	// var email = req.body.email;
	// var username = req.body.username;
	// var password = req.body.password;
	// var password2 = req.body.password2;
	console.log("REQ BODY ITEMS:");
	console.log(req.body.name);
	console.log(req.body.email);
	console.log(req.body.username);
	console.log(req.body.password);
	// console.log(password2);

	// // Validation
	// req.checkBody('name', 'Name is required').notEmpty();
	// req.checkBody('email', 'Email is required').notEmpty();
	// req.checkBody('email', 'Email is not valid').isEmail();
	// req.checkBody('username', 'Username is required').notEmpty();
	// req.checkBody('password', 'Password is required').notEmpty();
	// req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	// var errors = req.validationErrors();
		var newUser = new User({
			name: req.body.name,
			email: req.body.email,
			username: req.body.username,
			password: req.body.password
		});

		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		});

		res.send(newUser);
	

});

passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}

   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			console.log("USER FOUND");
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
   		}
   	});
   });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});


router.post('/login', function(req, res){

	var username = req.body.username;
	var password = req.body.password;
	console.log("USERNAME: "+ username);
	console.log("PASSWORD: "+ password);
	
	User.getUserByUsername(username, function(error, user){

	   	if(error) {
	   		console.log("No user found");
	   		return res.send(error);
	   	}

	   	if(!user){
	   		console.log("Not user");
	   		return res.send(error);
	   	}

	   	User.comparePassword(password, user.password, function(err, isMatch){
	   		if(err) throw err;
	   		if(isMatch){
	   			console.log("USER FOUND");
	   			return res.send(user);
	   		} else {
	   			console.log("password was not a match");
	   			return res.send(err);
	   		}
	   	});

	});
  
  });

router.get('/logout', function(req, res){
	req.logout();

	res.redirect('/login');
});



module.exports = router;