
// This creats the addCtrl module and controller. Note the dependencies on geolocation and gservice
var queryCtrl = angular.module('queryCtrl', ['geolocation', 'gservice']);
queryCtrl.controller('queryCtrl', function($scope, $log, $http, $rootScope, geolocation, gservice){

  // Initializes variables
  $scope.formData = {};
  var queryBody = {};

  // Functions
  //Get User's actual coordinates based on HTML5 at window load
  geolocation.getLocation().then(function(data){
    coords = {lat:data.coords.latitude, long:data.coords.longitude};
    console.log("long " + data.coords.longitude);
    console.log("lat " + data.coords.latitude);

    console.log("with convert " + parseFloat(coords.long).toFixed(3));


    //Set the latitude and longtitude equal to the HTML5 coordinates
    $scope.formData.longitude = parseFloat(coords.long).toFixed(3);
    $scope.formData.latitude = parseFloat(coords.lat).toFixed(3);
    console.log("with something else " +   $scope.formData.longitude);
  });


  //get coordinates based on mouse click...when click is detected
  $rootScope.$on("clicked", function(){

    //Run the gservice functions assocaited with identifying coordinates
    $scope.$apply(function(){
      $scope.formData.latitude = parseFloat(gservice.clickLat).toFixed(3);
      $scope.formData.longitude = parseFloat(gservice.clickLong).toFixed(3);
    });

  });

  //Take the query parameters and incirporate into a JSON queryBody
  $scope.queryUsers = function() {

      // Assemble Query Body
      queryBody = {
        longitude: parseFloat($scope.formData.longitude),
        latitude: parseFloat($scope.formData.latitude),
        distance: parseFloat($scope.formData.distance),
        male: $scope.formData.male,
        female: $scope.formData.female,
        other: $scope.formData.other,
        minAge: $scope.formData.minage,
        maxAge: $scope.formData.maxage,
        favlang: $scope.formData.favlang,
        reqVerified: $scope.formData.verified
      };

      //Post the queryPost to the /query POST route to retrive the results
      $http.post('/query', queryBody)

           .success(function(queryResults){
             console.log("QueryBody:");
             console.log(queryBody);
             console.log("QueryResults:");
             console.log(queryResults);
            // count the number of records retrieved for the panel-footer
             $scope.queryCount = queryResults.length;
           })
           .error(function(queryResults){
             console.log('Error ' + queryResults);
           })

  };

});
