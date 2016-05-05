// Creates the gservice factory.
// This will be the primary means by which we interact with Google Maps
angular.module('gservice', [])
       .factory('gservice', function($http) {

        // Initialize Variables-------------------------------------------------
        // Service our factory will return
        var googleMapService = {};

        // Array of locations obtained for API call
        var locations = [];

        // Selected Location (initialize to center of America)
        var selectedLat = 43.6532;
        var selectedLong= -79.3832;

        // FUNCTIONS------------------------------------------------------------
        // Refresh the Map with new data
        // Function will take new latitude and longitude coordinates
        googleMapService.refresh = function(latitude, longitude) {
          // Clears the holding array of locations
          locations = [];

          // Set the selected lat and long equal to the ones provided on the refresh() call
          selectedLat = latitude;
          selectedLong = longitude;

          // Perform an AJAX call to get all the records in the db
          $http.get('/users').success(function(response){

            // Convert the results into Google Map Format
            locations = convertToMapPoints(response);

            // Then initialize the map
            initialize(latitude, longitude);
          }).error(function(){});
        };


          // PRIVATE INNER FUNCTIONS -------------------------------------------
          // Convert the locations holder
          var convertToMapPoints = function(reponse){
            // Clear the locations holder
            var location = [];

            // Loop through all of the JSOn entries provided in the response
            for(var i = 0; i < response.length; i++){
              var user = response[i];
              // create popup window for each record
              var contentString =
              '<p><b>Username</b>: ' + user.username +
              '<br><b>Age</b>: ' + user.age +
              '<br><b>Gender</b>: ' + user.gender +
              '<br><b>Favourite Lanaguage</b>: ' + user.favlang +
              '</p>';
              // Converts each of the JSON reocrds into Google Maps Location formate
              // Note: [Lat, Lng] format
              locations.push({
                latlong: new google.maps.LatLng(user.location[1], user.location[0]),
                message: new google.maps.InfoWindow({
                  content: contentString,
                  maxWidth: 320
                }),
                username: user.username,
                gender: user.gender,
                age: user.age,
                favlang: user.favlang
              });
            }
            /* This returns locations, which is now an array populated with
            records in Google Maps format*/
            return locations;
          };

          
       });
