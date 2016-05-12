/*  Creates the addCtrl and Controller - it has one dependency on 'gelocation'
and 'gservice'. 'gservice' is a factory we created to handel placing the data
on the map. Since this needs to happen when we create a new user, our conntroller
needs to be aware of this factory*/
var addCtrl = angular.module('addCtrl', ['geolocation', 'gservice']);
addCtrl.controller('addCtrl', function($scope, $http, $rootScope, geolocation, gservice) {
  // Intialize Variables
  $scope.formData = {};
  var coords = {};
  var lat = 0;
  var long = 0;


  // Set inital coordinates to the Toronto
  $scope.formData.latitude = 43.6532;
  $scope.formData.longitude = -79.3832;


  // FUNCTIONS =================================================================
  // Get coordinates based on mouse click. When a click event is detected.....
  $rootScope.$on("clicked", function(){
    //  Run the gservice functions associated with identifying coordinates
    $scope.$apply(function(){
      $scope.formData.latitude = parseFloat(gservice.clickLat).toFixed(3);
      $scope.formData.longitude = parseFloat(gservice.clickLong).toFixed(3);
      $scope.formData.htmlverified = "Nope (thanks for spanning my map....)"
    });
  });
  
  // Creates a new user based on the form
  $scope.createUser = function() {
    // Grabs all of the text box fields
    var userData = {
      username: $scope.formData.username,
      gender: $scope.formData.gender,
      age: $scope.formData.age,
      favlang: $scope.formData.favlang,
      location: [$scope.formData.longitude, $scope.formData.latitude],
      htmlverified: $scope.formData.htmlverified
    };

    // Saves the user data to the db
    $http.post('/users', userData)
         .success(function(data) {
          // once the post request is complete and the user is created we want to clear the form
           $scope.formData.username = "";
           $scope.formData.gender = "";
           $scope.formData.age = "";
           $scope.formData.favlang = "";
          // calling out gservice.refresh to update the map with the new marker
          gservice.refresh($scope.formData.latitude, $scope.formData.longitude)
         })

         .error(function(data) {
           console.log('Error: ' + data);
         });
  };
});
