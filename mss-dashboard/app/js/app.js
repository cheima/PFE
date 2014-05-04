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
                abstract: true,
                url: "/sigu",
                templateUrl: "partials/sigu.html"
            }).state('sigu.cpu', {
        url: "",
        templateUrl: "partials/sigu.cpu.html",
        controller: 'MyCtrl1'
    }).state('sigu.traffic', {
        url: "traffic",
        templateUrl: "partials/sigu.traffic.html",
        controller: 'MyCtrl1'
    }).state('bsu', {
        abstract: true,
        url: "/bsu",
        templateUrl: "partials/sigu.html"
    }).state('bsu.cpu', {
        url: "",
        templateUrl: "partials/sigu.cpu.html",
        controller: 'MyCtrl2'
    }).state('bsu.traffic', {
        url: "/traffic",
        templateUrl: "partials/sigu.traffic.html",
        controller: 'MyCtrl2'
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