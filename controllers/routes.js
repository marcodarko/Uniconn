var express = require('express');
var router = express.Router();
var users = require('../models/User');
var bcrypt = require('bcryptjs');
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

router.get('/api/find-all', function(req, res) {

	users.find({}, (err,docs)=>{
		if(err) res.send(err);
		return res.send(docs);
	})
	
});


router.post('/register', function(req, res){

	console.log("body", req.body);
	newUser= new users(req.body);

	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save();
	        res.send(newUser);
	    });
	});
	
});

passport.use(new LocalStrategy(
  function(username, password, done) {
   users.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}

   	users.comparePassword(password, user.password, function(err, isMatch){
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
	var candidatePassword = req.body.password;
	
	users.findOne({username: username}, function(err,user){
		if(err) throw err;
		let compare = bcrypt.compare(candidatePassword, user.password);
		if(compare){
			res.send(user);
		}
		else{
			res.end();
		}
	})

  
 });

router.get('/logout', function(req, res){
	req.logout();

	res.redirect('/');
});



module.exports = router;