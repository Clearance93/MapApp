// Creates the gservice factory.
// This will be the primary means by which we interact with Google Maps
angular.module('gservice', [])
       .factory('gservice', function($http) {

        // Initialize Variables-------------------------------------------------
        /* googleMapService is an object and it will hold the refresh function
        that we will use to build/rebuild our map */
        var googleMapService = {};

        /* Array of locations obtained for API call. Below is a function to
        convert our collected lat/lng data to the Google format - which will be
        stored in this array */
        var locations = [];

        /* Selected Location (initialize to Toronto), this will hold the
        specific location we are looking at during any given point. */
        var selectedLat = 43.6532;
        var selectedLong = -79.3832;

        // FUNCTIONS============================================================

        /* Refresh the Map with new data. This function will take new latitude and
        longitude coordinates and will refresh the map with this info. Note: this
        function will be running as soon as the window loads*/
        googleMapService.refresh = function(latitude, longitude) {
          // Clears the holding array of locations
          locations = [];

          // Set the selected lat and long equal to the ones provided on the refresh() call
          selectedLat = latitude;
          selectedLong = longitude;

          // Perform an AJAX call to get all the records in the db
          $http.get('/users').success(function(response){

            // Convert the results form the AJAX call into Google Map Format(function for this defined below)
            locations = convertToMapPoints(response);

            // Then initialize the map with the initialize function (defined below)
            initialize(latitude, longitude);
          }).error(function(){});
        };


          // PRIVATE INNER FUNCTIONS -------------------------------------------
          // Convert the locations holder
          var convertToMapPoints = function(response){
            // Clear the locations holder
            var locations = [];

            /* Loop through all of the JSON entries provided in the response
            and creates an array of Google formated coordinates with the pop-up
            message built in. */
            for(var i= 0; i < response.length; i++){
              var user = response[i];
              // create popup window for each record
              var contentString =
              '<p><b>Username</b>: ' + user.username +
              '<br /><b>Age</b>: ' + user.age +
              '<br /><b>Gender</b>: ' + user.gender +
              '<br /><b>Favourite Lanaguage</b>: ' + user.favlang +
              '</p>';
              /* Converts (and push into our locations array) each of the JSON
              reocrds into Google Maps Location formate Note: [Lat, Lng] format */
              locations.push({
                latlon: new google.maps.LatLng(user.location[1], user.location[0]),
                message: new google.maps.InfoWindow({
                  content: contentString,
                  maxWidth: 320,
                }),
                username: user.username,
                gender: user.gender,
                age: user.age,
                favlang: user.favlang,
              });
            }
            /* This returns locations, which is now an array populated with
            records in Google Maps format*/
            return locations;
          };

          // Initialize a generic google map (this will be called from the refresh function)
          var initialize = function(latitude, longitude) {

            // Uses the selected lat, long as starting point
            var myLatLng = {lat: selectedLat, lng: selectedLong};

            // If map has not been created already..
            if(!map){
              // This creates a new map and places it in the index.html
              var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 3,
                center: myLatLng,
              });
            }

            // Loop through each location in the array and place a maker on our map
            locations.forEach(function(n, i){
              var marker = new google.maps.Marker({
                position: n.latlon,
                map: map,
                title: 'Big Map',
                icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
              });


              // For each maker created, add an event listener that checks for click events
              google.maps.event.addListener(marker, 'click', function(e){
                // When the marker is cliekc, it will open the slected marker's message
                currentSelectedMarker = n;
                n.message.open(map, marker);
              });
            });

            // Set initial location as a bouncing red marker
            var initialLocation = new google.maps.LatLng(latitude, longitude);

            var redMarker = new google.maps.Marker({
              position: initialLocation,
              animation: google.maps.Animation.BOUNCE,
              map: map,
              icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
            });
            lastMarker = redMarker;
          };

          // Refresh the page upon window load and calls the refresh function (defined above)
          // Use the initial latitude and longitude
          google.maps.event.addDomListener(window, 'load',
            googleMapService.refresh(selectedLat, selectedLong));
          return googleMapService;
        });
