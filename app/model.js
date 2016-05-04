// DEPNDENCIES==================================================================
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create a User Schema (this is the basis of how our user's data will be stored in the db)
var UserSchema = new Schema({
  username: {type: String, required: true},
  gender: {type: String, required: true},
  age: {type: Number, required: true},
  favlang: {type: String, required: true},
  /* -- IMPORTANT --
    MongoDB requires coordinatres to be ordered in [Long, Lat], but Google maps
    requires that you log in [Lat, Long]
  -- IMPORTANT -- */
  location: {type: [Number], required: true},
  htmlverified: String,
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now}

})
// Set created_at to equal the current time.
// .pre sets the pre-save logical
UserSchema.pre('save', function(next) {
  now = new Date();
  this.updated_at = now;
  if(!this.created_at) {
    this.created_at = now
  }
  next();
});

// Indexes the UserSchema in 2dsphere format (this is critical for running proximity searches)
 // 2dsphere index supports queries that calculate geometries on an earth-like sphere.
 // supports queries for intersection and proximity
 // this index is needed to run the nessassary queries (as highligted above)
UserSchema.index({ location: '2dsphere'});

//  Exports the UserSchema for use elesewhere.
// Sets the MongoDB collection to be used as "app-users"
/* -- IMPORTANT --
The collection needs to be exported for us to use it. Also, we've named the
collection 'app-user' but Mongoose will add an extra letter 's' when creating
the collection
-- IMPORTANT -- */
module.exports = mongoose.model('app-user', UserSchema);
