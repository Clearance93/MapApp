//  Creates the addCtrl and Controller - it has one dependency on 'gelocation'
var addCtrl = angular.module('addCtrl', ['geolocation']);
addCtrl.controller('addCtrl', function($scope, $http, geolocation) {
  // Intialize Variables
  $scope.formData = {};
  var coords = {};
  var lat = 0;
  var long = 0;

  // Set inital coordinates to the Toronto
  $scope.formData.latitude = 43.6532;
  $scope.formData.longitude = -79.3832;


  // FUNCTIONS =================================================================
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
         })
         .error(function(data) {
           console.log('Error: ' + data);
         });
  };
});
