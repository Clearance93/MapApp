// DEPNDENCIES==================================================================
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create a User Schema (this is the basis of how our user's data will be stored in the db)
var UserSchema = new Schema({
  username: {type: String, required: true},
  gender: {type: String, required: true},
  age: {type: Number, required: true},
  favlang: {type: String, required: true},
  location: {type: [Number], required: true},//going to record long/lat
  htmlverified: String,
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now}

})
// Set created_at to equal the current time
UserSchema.pre('save', function(next) {
  now = new Date();
  this.updated)at = now;
  if(!this.created_at) {
    this.created_at = now
  }
  next();
});

// Indexes the UserSchema in 2dsphere format - this is critical for running proximity searches)
UserSchema.index({ location: '2dsphere'});

//  Exports the UserSchema for use elesewhere.
// Sets the MongoDB collection to be used as "app-users"
module.exports = mongoose.model('app-user', UserSchema);
