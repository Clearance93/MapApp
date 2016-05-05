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
       });
