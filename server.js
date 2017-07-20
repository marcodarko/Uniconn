// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var fs = require('fs'); // required for file serving
var expressValidator = require('express-validator');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// Mongoose mpromise deprecated - use bluebird promises
var Promise = require("bluebird");
var methodOverride= require('method-override');

mongoose.Promise = Promise;


// // Require Click schema
// var Address = require("./models/Address");

// Create a new express app
var app = express();
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 3000;

// SOCKET IO
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
  console.log('socket user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.broadcast.emit('Someone joined the chat');

});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    //console.log('message: ' + msg);
    io.emit('get message', msg);
  });
});


// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("public"));
app.use(methodOverride("_method"));

// -------------------------------------------------

// MongoDB configuration (Change this URL to your own DB)
//mongoose.connect("mongodb://artofmarco@gmail.com:Italiano1@ds157342.mlab.com:57342/heroku_sb3hh2c2");
//mongoose.connect("mongodb://localhost/uniconn2");
mongoURI = 'mongodb://localhost/uniconn2';
MONGOLAB_URI = "mongodb://heroku_sb3hh2c2:dua059evi70hscv8h11eje5mpt@ds157342.mlab.com:57342/heroku_sb3hh2c2"

mongoose.connect(MONGOLAB_URI);

var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));


var routes = require('./controllers/routes.js');
// -------------------------------------------------
app.use(routes);

// Starting our express server
http.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
