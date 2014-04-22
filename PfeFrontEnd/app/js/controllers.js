'use strict';
/* Controllers */
//load the visualization API and the linechart package
google.load('visualization', '1', {packages: ['corechart']});
//nitialize our Angular app
google.setOnLoadCallback(function() {
    angular.bootstrap(document.body, ['myApp']);
});

angular.module('myApp.controllers', []).
        controller('MyCtrl1', function($scope, trafficforsigu, getsigunames) {
           // var nom = "SIGU 0";
          //  $scope.alltraffics = trafficforsigu.query({siguId : "SIGU-3"});
          $scope.alltraffics = trafficforsigu.query({siguId : 5});
          $scope.sigunames=getsigunames.query();

         //$scope.alltraffics = trafficforsigu.query();
            $scope.showSelectedElement = function(s) {
                $scope.selected = s;
            };
            $scope.alltraffics.$promise.then(function(result) {
                $scope.alltraffics = result;
                var i = 0;
                var val = [['Time', 'TrafficIN']];
                // key = i && tab[i]=result[key]
                for (var key in result) {
                    var obj = result[key];
                  //  if (obj["siguName"] == nom) {                   
                        i = i + 5;
                        val.push([i, obj["packetreceived"]]);
                   // }
                    }
                var data = google.visualization.arrayToDataTable(val);
                var options = {
                    title: 'TrafficIN for SIGU'
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
        })
        .controller('MyCtrl2', function($scope, trafficforsigu) {
            $scope.alltraffics = trafficforsigu.query({siguName : "SIGU-4"});
            $scope.showSelectedElement = function(s) {
                $scope.selected = s;
            };
            //wait for data retreiving from ws
            $scope.alltraffics.$promise.then(function(result) {
                $scope.alltraffics = result;
                var i = 0;
                var val = [['Time', 'TrafficOUT']];
                for (var key in result) {
                    var obj = result[key];
                    if (obj["siguName"] == "SIGU-4") {
                       // i = i + 5;
                        val.push([obj["dateExec"], obj["packetsent"]]);
                    }
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

        }).controller('MyCtrl3', function() {


}).controller('MyCtrl4', function() {

});
               