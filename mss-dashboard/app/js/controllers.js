'use strict';
/* Controllers */
//load the visualization API and the linechart package
google.load('visualization', '1', {packages: ['corechart']});
//nitialize our Angular app
google.setOnLoadCallback(function() {
    angular.bootstrap(document.body, ['myApp']);
});

angular.module('myApp.controllers', []).
        controller('MyCtrl1', function($scope, trafficforsigu, getsigunames, getalltraffic, allgraphs, siguranged) {

            $scope.sigunames = getsigunames.query();
            $scope.traffic = getalltraffic.query();

            //  $scope.rangesigu= siguranged.query({list: liste});   
            $scope.update = function() {
                //alert($scope.siguSelected);
                $scope.alltraffics = trafficforsigu.query({siguId: $scope.siguSelected});
                $scope.alltraffics.$promise.then(function(result) {
                    $scope.alltraffics = result;                 
                    var val = [['Time', 'TrafficIN']];
                    // key = i && tab[i]=result[key]
                    for (var key in result) {
                        var obj = result[key];
                        //  if (obj["siguName"] == nom) {                   
                        //  i = i + 5;
                        var d = new Date(obj["dateExec"]);
                        var d1 = d.getHours();
                        var d2 = d.getMinutes();
                        var curr_date = d.getDate();
                        var curr_month = d.getMonth() + 1; //Months are zero based
                        var curr_year = d.getFullYear();
                        var datenow = curr_date + "-" + curr_month + "-" + curr_year;

                        val.push([d1 + ":" + d2, obj["packetreceived"]]);
                        // val.push([i, obj["packetreceived"]]);
                        //}
                        // }
                        // else {
                        //    i++;
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

            };

            $scope.updateShowAll = function() {
                $scope.graphs = allgraphs.query();
                $scope.graphs.$promise.then(function(result) {
                    $scope.graphs = result;
                    //  var i = 0;
                    var tab = [['date']];
                    for (var i = 0; i < 10; i++) // 10 = nombre de valeurs horizontales
                        tab.push([i * 5]);

                    // key = i && tab[i]=result[key]
                    for (var key in result) { // pour tout sigu dans result
                        var obj = result[key]; // le sigu 
                        var liste = obj["liste"]; // ses stats
                        var siguname = obj["siguname"];
                        if (!siguname)
                            siguname = "inconnu id:" + obj["siguid"];
                        tab[0].push(siguname);
                        var index = 0;
                        for (var key1 in liste) // pour tout traffic de ce sigu
                        {
                            if (index >= 10)
                                break;

                            var val = [['Time', obj["siguname"]]];
                            var obj1 = liste[key1];
                            var d = new Date(obj1["dateExec"]);
                            var d1 = d.getHours();
                            var d2 = d.getMinutes();
                            var curr_date = d.getDate();
                            var curr_month = d.getMonth() + 1; //Months are zero based
                            var curr_year = d.getFullYear();
                            var datenow = curr_date + "-" + curr_month + "-" + curr_year;

                            val.push([d1 + ":" + d2, obj1["packetreceived"]]);

                            tab[index + 1].push(obj1["packetreceived"]);
                            index = index + 1;
                        }

                        // si le sigu a moin que 10 valeurs, remplir avec des zeros
                        if (index < 10)
                            for (var i = index; i < 10; i++) {
                                tab[i + 1].push(0);
                            }
                    }
                    var data = google.visualization.arrayToDataTable(tab);




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


                }

                );

            };
            
            $scope.updateRange=function(){
                 var chaine = $scope.siguSelected;
                    var chaine2 = $scope.siguSelected2;
                    var j = chaine;
                    //var liste="from "+chaine+"to"+chaine2+"there are:";
                    var liste = "";
                    for (var k = 0; k <= Math.abs(chaine2 - chaine); k++) {
                        if (parseInt(chaine) < parseInt(chaine2))
                            var j = parseInt(k) + parseInt(chaine);
                        else
                            var j = parseInt(k) + parseInt(chaine2);
                        liste += parseInt(j) + ",";
                    }

                    alert(liste);
                    $scope.rangesigu = siguranged.query({list: liste});
                      $scope.rangesigu.$promise.then(function(result) {
                    $scope.rangesigu = result;                 
                    var val = [['Time', 'TrafficIN']];
                    // key = i && tab[i]=result[key]
                    for (var key in result) {
                        var obj = result[key];
                        //  if (obj["siguName"] == nom) {                   
                        //  i = i + 5;
                        var d = new Date(obj["dateExec"]);
                        var d1 = d.getHours();
                        var d2 = d.getMinutes();
                        var curr_date = d.getDate();
                        var curr_month = d.getMonth() + 1; //Months are zero based
                        var curr_year = d.getFullYear();
                        var datenow = curr_date + "-" + curr_month + "-" + curr_year;

                        val.push([d1 + ":" + d2, obj["packetreceived"]]);
                        // val.push([i, obj["packetreceived"]]);
                        //}
                        // }
                        // else {
                        //    i++;
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
                    
            };
        })
        .controller('MyCtrl2', function($scope, trafficforsigu, getalltraffic) {
            $scope.alltraffics = getalltraffic.query({siguName: "SIGU-4"});
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
               