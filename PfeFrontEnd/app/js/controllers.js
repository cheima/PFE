'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', function($scope, trafficforsigu) {
        $scope.alltraffics = trafficforsigu.query();
        $scope.showSelectedElement = function(s){
           $scope.selected = s; 
        };
  })
  .controller('MyCtrl2', function($scope, trafficforsigu) {
          $scope.alltraffics = trafficforsigu.query();
  });