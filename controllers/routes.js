var express = require('express');
var router = express.Router();

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

module.exports = router;