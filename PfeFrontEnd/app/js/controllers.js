'use strict';

/* Controllers */
google.load('visualization', '1', {packages: ['corechart']});
google.setOnLoadCallback(function() {
    angular.bootstrap(document.body, ['myApp']);
});

angular.module('myApp.controllers', []).
  controller('MyCtrl1', function($scope, trafficforsigu) {
        $scope.alltraffics = trafficforsigu.query();
        $scope.showSelectedElement = function(s){
           $scope.selected = s; 
        };
  })
  .controller('MyCtrl2', function($scope, trafficforsigu) {
          $scope.alltraffics = trafficforsigu.query();
         //wait for data retreiving from ws
         $scope.alltraffics.$promise.then(function(result){
              $scope.alltraffics = result;
               var i = 0;
                
                       
                var val = [['Time', 'TrafficOUT']];
                for (var key in result) {
                    var obj = result[key];
                    i=i+5;
               val.push([i, obj["packetsent"]]);
                }
                var data = google.visualization.arrayToDataTable(val);
                var options = {
                    title: 'TrafficOUT for SIGU'
                };
                var chart = {};
                chart.data = data;
                chart.options = options;

                $scope.chartTypes = [
                    {typeName: 'LineChart', typeValue: '1'},
                    {typeName: 'BarChart', typeValue: '2'},
                    {typeName: 'ColumnChart', typeValue: '3'},
                    {typeName: 'PieChart', typeValue: '4'}
                ];
                $scope.selectType = function(type) {
                    $scope.chart.type = type.typeValue;
                };
                chart.type = $scope.chartTypes[0].typeValue;
                $scope.chartType = $scope.chartTypes[0];

                $scope.chart = chart;
         });
  
  });