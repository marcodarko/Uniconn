var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index:true, 
		unique: true
	},
	password: {
		type: String
	},
	email: {
		type: String,
		unique: true
	},
	name: {
		type: String
	},
	latitude:{
		type: String
	},
	longitude:{
		type: String
	},
	blocked:{
		type: Array
	},
	friends:{
		type: Array
	},
	photo:{
		type: String
	},
	identity:{
		type: String
	},
	age:{
		type: String
	},
	herefor:{
		type: String
	},
	conns:{
		type: Number
	},
	status:{
		type: String
	}
}, { collection: 'users' });

var users = module.exports = mongoose.model('users', UserSchema);

// module.exports.createUser = function(newUser, callback){
// 	bcrypt.genSalt(10, function(err, salt) {
// 	    bcrypt.hash(newUser.password, salt, function(err, hash) {
// 	        newUser.password = hash;
// 	        newUser.save(callback);
// 	    });
// 	});
// }

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}