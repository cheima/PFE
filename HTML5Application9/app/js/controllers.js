'use strict';

/* Controllers */
google.load('visualization', '1', {packages: ['corechart']});
google.setOnLoadCallback(function() {
    angular.bootstrap(document.body, ['myApp']);
});
angular.module('myApp.controllers', []).
        controller('MyCtrl1', ['$scope', function($scope) {
                var i = 0;
                var validation_messages = [{"id": 1581, "siguName": "SIGU 0", "dateExec": 1397638032757, "packetreceived": 7050294, "packetsent": 3179801}, {"id": 1640, "siguName": "SIGU 0", "dateExec": 1397638089980, "packetreceived": 7050294, "packetsent": 3179801}, {"id": 1699, "siguName": "SIGU 0", "dateExec": 1397638097026, "packetreceived": 7050294, "packetsent": 3179801}, {"id": 1758, "siguName": "SIGU 0", "dateExec": 1397638098324, "packetreceived": 7050294, "packetsent": 3179801}, {"id": 1817, "siguName": "SIGU 0", "dateExec": 1397638128902, "packetreceived": 7050294, "packetsent": 3179801}, {"id": 1876, "siguName": "SIGU 0", "dateExec": 1397638132812, "packetreceived": 7050294, "packetsent": 3179801}, {"id": 1935, "siguName": "SIGU 0", "dateExec": 1397682614922, "packetreceived": 7050294, "packetsent": 3179801}];
                var val = [['Time', 'TrafficOUT']];
                for (var key in validation_messages) {
                    var obj = validation_messages[key];
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


            }]).controller('MyCtrl3', function($scope, trafficforsigu) {
    $scope.alltraffics = trafficforsigu.query();
    $scope.showSelectedElement = function(s) {
        $scope.selected = s;
    };
})
        .controller('MyCtrl2', [function() {

            }]);

