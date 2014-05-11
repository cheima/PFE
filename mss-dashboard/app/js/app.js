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

]).run(
        ['$rootScope', '$state', '$stateParams',
            function($rootScope, $state, $stateParams) {

                // It's very handy to add references to $state and $stateParams to the $rootScope
                // so that you can access them from any scope within your applications.For example,
                // <li ui-sref-active="active }"> will set the <li> // to active whenever
                // 'contacts.list' or one of its decendents is active.
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }]).config(function($stateProvider, $urlRouterProvider) {
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
        url: "/LoadCPU",
        templateUrl: "partials/sigu.cpu.html",
        controller: 'MyCtrl1'
    }).state('sigu.bp', {
        url: "/LoadBP",
        templateUrl: "partials/sigu.bp.html",
        controller: 'MyCtrl3'
    }).state('sigu.traffic', {
        url: "/Traffic",
        templateUrl: "partials/sigu.traffic.html",
        controller: 'MyCtrl1'
    }).state('bsu', {
        abstract: true,
        url: "/bsu",
        templateUrl: "partials/sigu.html"
    }).state('bsu.cpu', {
        url: "/LoadCPU",
        templateUrl: "partials/sigu.cpu.html",
        controller: 'MyCtrl2'
    }).state(
            'bsu.bp', {
                url: "/LoadBP",
                templateUrl: "partials/sigu.bp.html",
                controller: 'MyCtrl4'
            }

    ).state('bsu.traffic', {
        url: "/Traffic",
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