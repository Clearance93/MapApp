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

// CONFIG ======================================================================
// SERVE STATIC FILES FROM PUBLIC FOLDER & BOWER FOLDERS --------------------
app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.get('/', function(req, res) {
  console.log("Request was made!")
});

// TELLING OUR SERVER TO LISTEN TO REQUESTS ====================================
app.listen(port);
console.log("Happiness can be found on port :" + port);
