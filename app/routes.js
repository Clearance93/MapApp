// DEPNDENCIES =================================================================
var mongoose = require('mongoose');
var User = require('./model.js');

// OPEN APP ROUTES =============================================================
module.exports = function(app) {
  // GET ROUTES ----------------------------------------------------------------
  // Retrieve records for all users in the db
  app.get('/users', function(req, res) {
    //making a db query to find users
    var query = User.find({});
    query.exec(function(err, users) {
      if(err)
        res.send(err);
      //Respond with JSON of all users in our system
      res.json(users);
    });
  });
  // POST ROUTES ---------------------------------------------------------------
  // Post request to save new users in our db
  app.post('/users', function(req, res) {
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
