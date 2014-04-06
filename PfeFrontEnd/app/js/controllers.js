'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', function($scope, trafficforsigu) {
        $scope.alltraffics = trafficforsigu.query();
  })
  .controller('MyCtrl2', [function() {

  }]);