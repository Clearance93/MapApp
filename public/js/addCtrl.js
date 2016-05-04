//  Creates the addCtrl and Controller - it has one dependency on 'gelocation'
var addCtrl = angular.module('addCtrl', ['geolocation']);
addctrl.controller('addCtrl', function($scope, $htpp, geolocation) {
  // Intialize Variables
  $scope.formData = {};
  var coords = {};
  var lat = 0;
  var long = 0;

  // Set inital coordinates to the Toronto 
  $scope.formData.latitude = 43.6532;
  $scope.formData.longitude = -79.3832;

});
