var express = require('express');
var router = express.Router();
var users = require('../models/User');
var bcrypt = require('bcryptjs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var geolib = require('geolib');

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

router.post('/api/find-all', function(req, res) {

	let userLat = req.body.lat;
	let userLon = req.body.lon;
	let userDistance = parseInt(req.body.distance);
	let usersCloseToUser =[];

	//console.log('user lat long', userLat, userLon);

	users.find({}, (err,docs)=>{
		if(err) res.send(err);

		//console.log('docs server', docs);
		for(i=0; i<docs.length; i++){

			//console.log('docs lat', docs[i].latitude);
			//console.log('docs long', docs[i].longitude);

			let res= geolib.getDistance(
		    {latitude: parseFloat(userLat), longitude: parseFloat(userLon)},
		    {latitude: parseFloat(docs[i].latitude), longitude: parseFloat(docs[i].longitude)}
			);

			let distance = res/3.28084;
			if(distance < userDistance){
				usersCloseToUser.push(docs[i]);
			}
		}
		return res.send(usersCloseToUser);
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

// adds one user to user's friends array
router.put('/favorite/:id', function (req,res) {
	users.update({_id: req.params.id},{$push:{friends: req.body._id}},function(err,updatedUser){
		if(err) throw err;
		res.send(updatedUser);
	})
});

// removes one user to user's friends array
router.put('/unfavorite/:id', function (req,res) {
	users.update({_id: req.params.id},{$pull:{friends: req.body._id}},function(err,updatedUser){
		if(err) throw err;
		res.send(updatedUser);
	})
});

// adds the ID of a user to the main USER's blocked array
router.put('/block/:id', function (req,res) {
	users.update({_id: req.params.id},{$push:{blocked: req.body._id}},function(err,updatedUser){
		if(err) throw err;
		res.send(updatedUser);
	})
});
// finds one user by ID
router.get('/user/:id', function(req,res){
	users.findOne({_id: req.params.id}, function(err, userFound){
		if(err) throw err;
		res.send(userFound);
	})
})

// unblocks all, sets blocked array to empty array
router.put('/unblock-all/:id', function( req, res){
	users.update({_id: req.params.id},{$set:{blocked: [] }},function(err,updatedUser){
		if(err) throw err;
		res.send(updatedUser);
	})
})

// deletes user from DB
router.delete('/delete-account/:id', function (req,res) {

	// makes sure user is the one sending the delte request
	if(req.params.id === req.body._id){
		users.deleteOne({_id: ObjectId(req.params.id)}, function(err, confirmation){
			if(err) throw err;
			res.send(confirmation);
		})
	}
})

// unblocks all, sets blocked array to empty array
router.put('/api/update-location/:id', function( req, res){
	users.update({_id: req.params.id},{$set:{latitude: req.body.lat, longitude: req.body.long }},function(err,updatedUser){
		if(err) throw err;
		res.send(updatedUser);
	})
})




module.exports = router;