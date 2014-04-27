'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/trafficIN', {templateUrl: 'partials/trafficin.html', controller: 'MyCtrl1'});
  $routeProvider.when('/trafficOUT', {templateUrl: 'partials/trafficout.html', controller: 'MyCtrl2'});
  
  $routeProvider.when('/LoadCPU', {templateUrl: 'partials/LoadCPU.html', controller: 'MyCtrl3'});
  $routeProvider.when('/Bandwidth', {templateUrl: 'partials/partial4.html', controller: 'MyCtrl4'});
  
  $routeProvider.otherwise({redirectTo: '/trafficIN'});
}]);