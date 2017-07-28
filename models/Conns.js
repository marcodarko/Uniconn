var mongoose = require('mongoose');

// User Schema
var UserSchema = mongoose.Schema({
	conn: {
		type: Array
	},
	messages:{
		type: Array
	}
}, { collection: 'conns' });

var conns = module.exports = mongoose.model('conns', UserSchema);

