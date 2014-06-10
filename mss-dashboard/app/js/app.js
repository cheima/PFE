'use strict';

// Declare app level module which depends on filters, and services
//angular.module('myApp', ['ui.bootstrap']);
Highcharts.setOptions({
    global: {
        useUTC: false
                //useUTC: true
    }
});
angular.module('myApp', [
    'ui.bootstrap',
    'ui.router',
    'myApp.filters',
    'myApp.services',
    'myApp.directives',
    'myApp.controllers',
    'ngBootstrap',
    'uiSlider',
    "highcharts-ng"

]).run(
        ['$rootScope', '$state', '$stateParams', 'AuthService',
            function($rootScope, $state, $stateParams, AuthService) {

                // It's very handy to add references to $state and $stateParams to the $rootScope
                // so that you can access them from any scope within your applications.For example,
                // <li ui-sref-active="active }"> will set the <li> // to active whenever
                // 'contacts.list' or one of its decendents is active.
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;

                //https://medium.com/opinionated-angularjs/techniques-for-authentication-in-angularjs-applications-7bbf0346acec

                $rootScope.$on('$stateChangeStart', function(event, next) {
                    var isFree = next.isFree;
                    if (!isFree) {
                        if (AuthService.isLogged) {
                            // user is not allowed
                            
                        } else {
                        event.preventDefault();
                            $state.go("login");
                        }
                    }
                });

            }]).config(function($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/dashboard");
    //
    // Now set up the states

    $stateProvider
            .state('index3', {
                //abstract: true,
                url: "/index3",
                templateUrl: "index3.html"
            })
            .state('index', {
                //abstract: true,
                url: "/index",
                templateUrl: "index.html",
                controller: "ModalInstanceCtrl"
            })
            .state('dashboard', {
                //abstract: true,
                url: "/dashboard",
                templateUrl: "partials/msstabs.html"
         //controller: 'LoginCtrl'
           })
            .state('dashboard.mss', {
                //abstract: true,
                url: "/mss/:mssId",
                templateUrl: "partials/mss.html"
            })
            .state('dashboard.mss.carte', {
                //abstract: true,
                url: "/:carte",
                templateUrl: "partials/mss.cart.html",
                controller: "KPIController"
            }).state('dashboard.mss.carte.cpu', {
        url: "/LoadCPU",
        templateUrl: "partials/mss.cart.cpu.html",
        controller: 'CPUController'
    }).state('dashboard.mss.carte.bp', {
        url: "/LoadBP",
        templateUrl: "partials/mss.cart.bp.html",
        controller: 'BPController'
    }).state('dashboard.mss.carte.traffic', {
        url: "/Traffic",
        templateUrl: "partials/mss.cart.traffic.html",
        controller: 'TrafficController'
    }).state('dashboard.mss.carte.trafficout', {
        url: "/trafficout",
        templateUrl: "partials/trafficout.html",
        controller: 'MyCtrl6'
    }).state('login', {
        url: "/login",
        templateUrl: "partials/login.html",
        controller: 'LoginCtrl',
        isFree: true
    });
});

