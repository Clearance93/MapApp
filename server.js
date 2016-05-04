// DEPNDENCIES==================================================================
var express = require('express'); // server frame work
var bodyParser = require('body-parser'); //helps with parsing JSON
var morgan = require('morgan'); //HTTP request logger middleware
var mongoose = require('mongoose'); //db
var methodOverride = require('method-override') //HTTP verb helper

// DEFIND PORT------------------------------------------------------------------
var port = process.env.PORT || 8080;

// CREATING SERVER USING EXPRESS------------------------------------------------
var app = express();

// DEV DB ----------------------------------------------------------------------
mongoose.connect('mongodb://localhost/GoogleMapApp');

// CONFIG ======================================================================
// SERVE STATIC FILES FROM PUBLIC FOLDER & BOWER FOLDERS --------------------
app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(morgan('dev')); // loggs each request that is made
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

//CONNECT ROUTES TO SERVER =====================================================
require('./app/routes.js')(app);

// TELLING OUR SERVER TO LISTEN TO REQUESTS ====================================
app.listen(port);
console.log("Happiness can be found on port :" + port);
