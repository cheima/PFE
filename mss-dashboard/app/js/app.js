'use strict';


// Declare app level module which depends on filters, and services
//angular.module('myApp', ['ui.bootstrap']);
angular.module('myApp', [
    'ui.bootstrap',
    'ui.router',
    'myApp.filters',
    'myApp.services',
    'myApp.directives',
    'myApp.controllers'
   
]).config(function($stateProvider, $urlRouterProvider) {
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
    }).state ('sigu.traffic', {
        url: "/traffic",
        templateUrl: "partials/sigu.traffic.html",
        controller: 'MyCtrl1'
    }).state('bsu', {
      url: "/bsu",
      templateUrl: "partials/bsu.html",
      controller : 'MyCtrl1'
    }).state ('bsu.traffic', {
        url: "/traffic",
        templateUrl: "partials/bsu.traffic.html",
        controller: 'MyCtrl1'
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