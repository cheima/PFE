'use strict';


// Declare app level module which depends on filters, and services
//angular.module('myApp', ['ui.bootstrap']);
/*angular.module('myApp', [
    'ui.bootstrap',
    'ngRoute',
    'ui.router',
    'myApp.filters',
    'myApp.services',
    'myApp.directives',
    'myApp.controllers'
   
]).
        config(['$routeProvider', function($routeProvider) {
                $routeProvider.when('/sigu', {templateUrl: 'partials/sigu.html', controller: 'MyCtrl1'});
                $routeProvider.when('/dashboard', {templateUrl: 'partials/trafficin.html', controller: 'MyCtrl1'});
                $routeProvider.when('/bsu', {templateUrl: 'partials/trafficout.html', controller: 'MyCtrl2'});
               // $routeProvider.when('/LoadCPU', {templateUrl: 'partials/LoadCPU.html', controller: 'MyCtrl3'});
               // $routeProvider.when('/Bandwidth', {templateUrl: 'partials/partial4.html', controller: 'MyCtrl4'});
                $routeProvider.otherwise({redirectTo: '/dashboard'});
            }]);*/
myApp.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  //$urlRouterProvider.otherwise("/sigu");
  //
  // Now set up the states
  $stateProvider
    .state('sigu', {
      url: "/sigu",
      templateUrl: "partials/sigu.html",
      controller : 'MyCtrl1'
    });
   /* .state('state1.list', {
      url: "/list",
      templateUrl: "partials/state1.list.html",
      controller: function($scope) {
        $scope.items = ["A", "List", "Of", "Items"];
      }
    })
    .state('state2', {
      url: "/state2",
      templateUrl: "partials/state2.html"
    })
    .state('state2.list', {
      url: "/list",
        templateUrl: "partials/state2.list.html",
        controller: function($scope) {
          $scope.things = ["A", "Set", "Of", "Things"];
        }
      });*/
    });