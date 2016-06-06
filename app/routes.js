// DEPNDENCIES =================================================================
var mongoose = require('mongoose');
var User = require('./model.js');

// OPEN APP ROUTES =============================================================
module.exports = function(app) {
  // GET ROUTES ----------------------------------------------------------------
  // Retrieve records for all users in the db
  app.get('/users', function(req, res) {
    console.log("get request was successful");
    //making a db query to find users
    var query = User.find({});
    query.exec(function(err, users) {
      if(err)
        res.send(err);
      //Respond with JSON of all users in our system
      res.json(users);
    })
  });
  // POST ROUTES ---------------------------------------------------------------
  // Post request to save new users in our db
  app.post('/users', function(req, res) {
    console.log("post was successfull");
    // create a new User based on the user schema (imported in the User var)
    // the info for the new User will be in the request body
    var info = req.body
    var newuser = new User(info);
    // Saving the new user in the db
    newuser.save(function(err) {
      if(err)
        res.send(err);
      /* if save function is successful return a responds with a JSON of the
      new user that was created from the contents of the request body
      */
       res.json(info);
    });
  });

  // This will retrieve JSON records for all users who meet a certian set of query conditions
  // Retrieves JSON records for all users who meet a certain set of query conditions
app.post('/query/', function(req, res){

    // Grab all of the query parameters from the body.
    var lat = req.body.latitude;
    var long = req.body.longitude;
    var distance = req.body.distance;
    var male = req.body.male;
    var female = req.body.female;
    var other = req.body.other;
    var minAge = req.body.minAge;
    var maxAge = req.body.maxAge;
    var favLang = req.body.favLang;
    var reqVerified = req.body.reqVerified;


    // Opens a generic Mongoose Query. Depending on the post body we will...
    var query = User.find({});

    // ...include filter by Max Distance (converting miles to meters)
    if(distance){

        // Using MongoDB's geospatial querying features. (Note how coordinates are set [long, lat]
        query = query.where('location').near({ center: {type: 'Point', coordinates: [long, lat]},

            // Converting meters to miles. Specifying spherical geometry (for globe)
            maxDistance: distance * 1609.34, spherical: true});
    }
    //including the filter for gender
    if(male || female || other){
      query.or([{ 'gender': male}, {'gender': female}, {'gender': other}]);
    }
    //include filter for min age
    if(minAge){
      query = query.where('age').gte(minAge);
    }
    //include filter for max age
    if(maxAge){
      query = query.where('age').lte(maxAge);
    }
    //include filter for fav lang
    if(favLang){
      query = query.where('favlang').equals(favLang);
    }
    //include filter for HTML5 verified location
    if(reqVerified){
      query = query.where('htmlverified').equals("Yep (Thanks for giving us real data!)");
    }
    // Execute Query and Return the Query Results
    query.exec(function(err, users){
        if(err)
            res.send(err);

        // If no errors, respond with a JSON of all users that meet the criteria
        res.json(users);
    });
});

  app.delete("/users/:user_id", function(req, res) {
    User.remove({
      _id: req.params.user_id
    }, function(err, users) {
      if(err)
        res.send(err);

      res.json(users);
    });

  });

};
