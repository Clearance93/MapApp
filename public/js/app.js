// Declaring the initial angular module "GoogleMapApp"
// The Module will grab other controllers and services
var app = angular.module('map_app', ['addCtrl', 'geolocation', 'gservice', 'ngRoute'])

  //Configures Angular routing -- showing the relevant view and controller when needed
  .config(function($routeProvider){
    //Join Team Control Panel
    $routeProvider.when('/join', {
      controller: 'addCtrl',
      templateUrl: 'partials/addForm.html',
      //Find teammates control panel
    }).when('/find', {
      templateUrl: 'partials/queryForm.html',

      //All else forward to the Joing Team Control Panel
    }).otherwise({redirectTo:'/join'})
  });
