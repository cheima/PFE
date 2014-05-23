'use strict';

// Declare app level module which depends on filters, and services
//angular.module('myApp', ['ui.bootstrap']);
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
            .state('mss', {
                //abstract: true,
                url: "/mss/:mssId",
                templateUrl: "partials/mss.html"
            })
            .state('mss.carte', {
                //abstract: true,
                url: "/:carte",
                templateUrl: "partials/sigu.html"
            }).state('mss.carte.cpu', {
        url: "/LoadCPU",
        templateUrl: "partials/sigu.cpu.html",
        controller: 'MyCtrl5'
    })/*.state('mss.vlru', {
     abstract: true,
     url: "/vlru",
     templateUrl: "partials/sigu.html"
     }).state('mss.vlru.cpu', {
     url: "/LoadCPU",
     templateUrl: "partials/sigu.cpu.html",
     controller: 'MyCtrl5'
     }).state('mss.ccsu', {
     abstract: true,
     url: "/ccsu",
     templateUrl: "partials/sigu.html"
     
     }).state('mss.mss.ccsu.cpu', {
     url: "/LoadCPU",
     templateUrl: "partials/sigu.cpu.html",
     controller: 'MyCtrl5'
     }).state('mss.chu', {
     abstract: true,
     url: "/chu",
     templateUrl: "partials/sigu.html"
     
     }).state('mss.mss.chu.cpu', {
     url: "/LoadCPU",
     templateUrl: "partials/sigu.cpu.html",
     controller: 'MyCtrl5'
     }).state('mss.bdcu', {
     abstract: true,
     url: "/bdcu",
     templateUrl: "partials/sigu.html"
     
     }).state('mss.bdcu.cpu', {
     url: "/LoadCPU",
     templateUrl: "partials/sigu.cpu.html",
     controller: 'MyCtrl5'
     }).state('mss.cmu', {
     abstract: true,
     url: "/cmu",
     templateUrl: "partials/sigu.html"
     
     }).state('mss.cmu.cpu', {
     url: "/LoadCPU",
     templateUrl: "partials/sigu.cpu.html",
     controller: 'MyCtrl5'
     }).state('mss.stu', {
     abstract: true,
     url: "/stu",
     templateUrl: "partials/sigu.html"
     
     }).state('mss.stu.cpu', {
     url: "/LoadCPU",
     templateUrl: "partials/sigu.cpu.html",
     controller: 'MyCtrl5'
     }).state('mss.cmm', {
     abstract: true,
     url: "/cmm",
     templateUrl: "partials/sigu.html"
     
     }).state('mss.cmm.cpu', {
     url: "/LoadCPU",
     templateUrl: "partials/sigu.cpu.html",
     controller: 'MyCtrl5'
     }).state('mss.omu', {
     abstract: true,
     url: "/omu",
     templateUrl: "partials/sigu.html"
     
     }).state('mss.omu.cpu', {
     url: "/LoadCPU",
     templateUrl: "partials/sigu.cpu.html",
     controller: 'MyCtrl5'
     })*/.state('mss.carte.bp', {
        url: "/LoadBP",
        templateUrl: "partials/sigu.bp.html",
        controller: 'MyCtrl3'
    }).state('mss.carte.traffic', {
        url: "/Traffic",
        templateUrl: "partials/sigu.traffic.html",
        controller: 'MyCtrl1'
    })/*.state('mss.bsu', {
     //abstract: true,
     url: "/bsu",
     templateUrl: "partials/sigu.html"
     }).state('mss.bsu.cpu', {
     url: "/LoadCPU",
     templateUrl: "partials/sigu.cpu.html",
     controller: 'MyCtrl5'
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
     })*/.state('mss.carte.trafficout', {
        url: "/trafficout",
        templateUrl: "partials/trafficout.html",
        controller: 'MyCtrl6'
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