'use strict';


// Declare app level module which depends on filters, and services
//angular.module('myApp', ['ui.bootstrap']);
angular.module('myApp', [
    'ui.bootstrap',
    'ngRoute',
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
            }]);
