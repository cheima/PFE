'use strict';
/* Controllers */
//load the visualization API and the linechart package
google.load('visualization', '1', {packages: ['corechart']});
//nitialize our Angular app
google.setOnLoadCallback(function() {
    angular.bootstrap(document.body, ['myApp']);
});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

var showFromList = function(result, $scope) {

    $scope.graphs = result;
    var sigus = result["sigus"];
    var times = result["times"]; // liste des TimePoint

    var tab = [];
    var tab1 = [];

    /* Ligne 1 de la matrice */
    var ligne1 = [['time']];
    for (var s in sigus) {
        var sigu = sigus[s]; // le sigu 
        var siguname = sigu["siguname"];
        ligne1.push(siguname);
    }
    tab.push(ligne1);
    tab1.push(ligne1);
//                for (var i = 0; i < 10; i++) // 10 = nombre de valeurs horizontales
//                    tab.push([i * 5]);

    /* Le reste des lignes, une ligne pour chaque TimePoint */
    var last_timeId;
    var last_timeValue;
    for (var t in times) {
        var time = times[t];
        var timeId = time["id"];
        last_timeId = timeId;
        var d = new Date(time["atTime"]);
        var d1 = d.getHours() - 1;
        var d2 = d.getMinutes();
        var curr_date = d.getDate();
        var curr_month = d.getMonth() + 1; //Months are zero based
        var curr_year = d.getFullYear();
        var datenow = curr_date + "-" + curr_month + "-" + curr_year;
        var timeValeur = d1 + ":" + d2;
        last_timeValue = timeValeur;
        var lignereceived = [timeValeur];
        var lignesent = [timeValeur];
        for (var s in sigus) {
            var sigu = sigus[s]; // le sigu 
            var trafficsent = 0;
            var trafficreceived = 0;
            var traffics = sigu["liste"];
            for (var trafficKey in traffics) {
                var traffic = traffics[trafficKey];
                if (traffic["dateExec"] == timeId) {
                    trafficsent = traffic["packetsent"];
                    trafficreceived = traffic["packetreceived"];
                    break;
                }
            }
            lignesent.push(trafficsent);
            lignereceived.push(trafficreceived);
        }
        tab.push(lignereceived);
        tab1.push(lignesent);

    }
    $scope.allvars.lasttime = last_timeValue;
    var tab2 = [['name', last_timeValue]];
    var tab3 = [['name', last_timeValue]];

    for (var s in sigus) {
        var sigu = sigus[s]; // le sigu 
        var lignereceived = [sigu["siguname"]];
        var lignesent = [sigu["siguname"]];
        var trafficsent = 0;
        var trafficreceived = 0;
        var traffics = sigu["liste"];
        for (var trafficKey in traffics) {
            var traffic = traffics[trafficKey];
            if (traffic["dateExec"] == last_timeId) {
                trafficsent = traffic["packetsent"];
                trafficreceived = traffic["packetreceived"];
                break;
            }
        }
        lignesent.push(trafficsent);
        lignereceived.push(trafficreceived);
        tab2.push(lignereceived);
        tab3.push(lignesent);
    }

//                // key = i && tab[i]=result[key]
//                for (var key in sigus) { // pour tout sigu dans result
//                    var obj = sigus[key]; // le sigu 
//                    var liste = obj["liste"]; // ses stats
//                    var siguname = obj["siguname"];
//                    if (!siguname)
//                        siguname = "inconnu id:" + obj["siguid"];
//                    tab[0].push(siguname);
//                    var index = 0;
//                    for (var key1 in liste) // pour tout traffic de ce sigu
//                    {
//                        if (index >= 10)
//                            break;
//
//                        var val = [['Time', obj["siguname"]]];
//                        var obj1 = liste[key1];
//                        var d = new Date(obj1["dateExec"]);
//                        var d1 = d.getHours();
//                        var d2 = d.getMinutes();
//                        var curr_date = d.getDate();
//                        var curr_month = d.getMonth() + 1; //Months are zero based
//                        var curr_year = d.getFullYear();
//                        var datenow = curr_date + "-" + curr_month + "-" + curr_year;
//
//                        val.push([d1 + ":" + d2, obj1["packetreceived"]]);
//
//                        tab[index + 1].push(obj1["packetreceived"]);
//                        index = index + 1;
//                    }
//
//                    // si le sigu a moin que 10 valeurs, remplir avec des zeros
//                    if (index < 10)
//                        for (var i = index; i < 10; i++) {
//                            tab[i + 1].push(0);
//                        }
//                }
    var data = google.visualization.arrayToDataTable(tab);
    var data1 = google.visualization.arrayToDataTable(tab1);
    var options = {
        title: 'Traffic IN for SIGU'
    };
    var options1 = {
        title: 'Traffic OUT for SIGU'
    };
    var chart = {};
    chart.data = data;
    chart.options = options;
    var chart1 = {};
    chart1.data = data1;
    chart1.options = options1;
    $scope.chartTypes = [
        {typeName: 'LineChart', typeValue: '1'},
        {typeName: 'BarChart', typeValue: '2'},
        {typeName: 'ColumnChart', typeValue: '3'},
        {typeName: 'PieChart', typeValue: '4'}
    ];
    $scope.selectType = function(type) {
        $scope.chart.type = type.typeValue;
        $scope.chart1.type = type.typeValue;
    };
    chart.type = $scope.chartTypes[2].typeValue;
    chart1.type = $scope.chartTypes[2].typeValue;
    $scope.chartType = $scope.chartTypes[2];
    $scope.chart = chart;
    $scope.chart1 = chart1;

    // pie
    var data2 = google.visualization.arrayToDataTable(tab2);
    var data3 = google.visualization.arrayToDataTable(tab3);
    var options2 = {
        title: 'Traffic IN for SIGU'
    };
    var options3 = {
        title: 'Traffic OUT for SIGU'
    };
    var chart2 = {};
    chart2.data = data2;
    chart2.options = options2;
    var chart3 = {};
    chart3.data = data3;
    chart3.options = options3;


    chart2.type = $scope.chartTypes[3].typeValue;
    chart3.type = $scope.chartTypes[3].typeValue;
    $scope.chart2 = chart2;
    $scope.chart3 = chart3;
};

var carteToID = function(carte) {
    if (carte === 'bsu') {
        //  args.type1 = 1;
        return 1;
    }
    else if (carte === 'sigu') {
        return 0;
    }
    else if (carte === 'vlru') {
        return 2;
    }
    else if (carte === 'ccsu') {
        return 3;
    }
    else if (carte === 'chu') {
        return 4;
    }
    else if (carte === 'bdcu') {
        return 5;
    }
    else if (carte === 'cmu') {
        return 6;
    }
    else if (carte === 'stu') {
        return 7;
    }
    else if (carte === 'omu') {
        return 8;
    }
    else if (carte === 'cmm') {
        return 9;
    }

};
var module = angular.module('myApp.controllers', []).
        controller('MyCtrl1', function($scope, trafficforsigu, getsigunames, toptraffic, allgraphs, siguranged) {
            $scope.allvars = {};
            $scope.allvars.Indi_Name = "SIGU";
            // $scope.allvars.packet = "packetreceived";
            $scope.sigunames = getsigunames.query();
            //fonction zèyda
            $scope.update = function() {
                //alert($scope.siguSelected);
                $scope.alltraffics = trafficforsigu.query({siguId: $scope.siguSelected});
                $scope.alltraffics.$promise.then(function(result) {
                    $scope.alltraffics = result;
                    var val = [['Time', 'Traffic IN']];
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
                        val.push([d1 + ":" + d2, obj[$scope.allvars.traff]]);
                        // val.push([i, obj["packetreceived"]]);
                        //}
                        // }
                        // else {
                        //    i++;
                        // }
                    }
                    var data = google.visualization.arrayToDataTable(val);
                    var data1 = google.visualization.arrayToDataTable(val);
                    var options = {
                        title: 'Traffic IN for SIGU'
                    };
                    var chart = {};
                    chart.data = data;
                    chart.options = options;
//                    var chart1 = {};
//                    chart1.data = data1;
//                    chart1.options = options;

                    $scope.chartTypes = [
                        {typeName: 'LineChart', typeValue: '1'},
                        {typeName: 'BarChart', typeValue: '2'},
                        {typeName: 'ColumnChart', typeValue: '3'},
                        {typeName: 'PieChart', typeValue: '4'}
                    ];
                    $scope.selectType = function(type) {
                        $scope.chart.type = type.typeValue;
                        //$scope.chart1.type = type.typeValue;
                    };
                    chart.type = $scope.chartTypes[0].typeValue;
                    $scope.chartType = $scope.chartTypes[0];

                    $scope.chart = chart;
                    //$scope.chart1 = chart1;
                });

            };

            var dateFrom = $scope.allvars.dt.getFullYear() + ":" + $scope.allvars.dt.getMonth() + ":" + $scope.allvars.dt.getDate();
            $scope.updateShowAll = function() {
                var args = {
                    year: $scope.allvars.dt.getFullYear(),
                    month: $scope.allvars.dt.getMonth(),
                    day: $scope.allvars.dt.getDate()
                };
                var allsigu = allgraphs.query(args);
                allsigu.$promise.then($scope.showFromListLOCAL);

            };
            $scope.showFromListLOCAL = function(result) {
                showFromList(result, $scope);
            };

            $scope.updateShowTop10 = function() {
                var allsigu = toptraffic.query();
                allsigu.$promise.then(showFromList);
            };

            $scope.updateRange = function() {
                var list = "";

                var start = 0;
                var i = 0;
                while (i < $scope.sigunames.length) {
                    if ($scope.sigunames[i].id == $scope.allvars.siguSelected) {
                        start = i;
                        break;
                    } else
                        i = i + 1;
                }

                // juska ? et créer la liste en parallèle
                for (i = start; i < $scope.sigunames.length; i++) {
                    if (list === "")
                        list = $scope.sigunames[i].id;
                    else
                        list = list + "," + $scope.sigunames[i].id;

                    if ($scope.sigunames[i].id == $scope.allvars.siguSelected2)
                        break;
                }

                //alert(list);
                // i =0;
                var rangesigu = siguranged.query({list: list});
                rangesigu.$promise.then($scope.showFromListLOCAL);
            };

            $scope.updateRange11 = function() {
                var list = $scope.allvars.siguSelected3;
                //alert(list);
                var rangesigu = siguranged.query({list: list});
                rangesigu.$promise.then($scope.showFromListLOCAL);
            };

            //////
            /* $scope.updateout = function() {
             $scope.alltraffics = trafficforsigu.query({siguId: $scope.siguSelected});
             $scope.alltraffics.$promise.then(function(result) {
             $scope.alltraffics = result;
             var val = [['Time', 'Traffic OUT']];
             for (var key in result) {
             var obj = result[key];
             var d = new Date(obj["dateExec"]);
             var d1 = d.getHours();
             var d2 = d.getMinutes();
             var curr_date = d.getDate();
             var curr_month = d.getMonth() + 1; //Months are zero based
             var curr_year = d.getFullYear();
             var datenow = curr_date + "-" + curr_month + "-" + curr_year;
             val.push([d1 + ":" + d2, obj["packetsent"]]);
             }
             var data = google.visualization.arrayToDataTable(val);
             var options = {
             title: 'Traffic OUT for SIGU'
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
             
             var showFromListout = function(result) {
             $scope.graphs = result;
             
             var sigus = result["sigus"];
             var times = result["times"]; // liste des TimePoint
             
             var tab = [];
             
             // Ligne 1 de la matrice 
             var ligne1 = [['time']];
             for (var s in sigus) {
             var sigu = sigus[s]; // le sigu 
             var siguname = sigu["siguname"];
             ligne1.push(siguname);
             }
             tab.push(ligne1);
             for (var t in times) {
             var time = times[t];
             var timeId = time["id"];
             var d = new Date(time["atTime"]);
             var d1 = d.getHours();
             var d2 = d.getMinutes();
             var curr_date = d.getDate();
             var curr_month = d.getMonth() + 1; //Months are zero based
             var curr_year = d.getFullYear();
             var datenow = curr_date + "-" + curr_month + "-" + curr_year;
             var timeValeur = d1 + ":" + d2;
             
             var ligne = [timeValeur];
             for (var s in sigus) {
             var sigu = sigus[s]; // le sigu 
             var trafficsent = 0;
             var traffics = sigu["liste"];
             for (var trafficKey in traffics) {
             var traffic = traffics[trafficKey];
             if (traffic["dateExec"] == timeId) {
             trafficsent = traffic["packetsent"];
             break;
             }
             }
             ligne.push(trafficsent);
             }
             tab.push(ligne);
             
             }
             };
             var data = google.visualization.arrayToDataTable(tab);
             var options = {
             title: 'Traffic OUT for SIGU'
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
             $scope.chart = chart;*/
            /////
        })
        .controller('MyCtrl2', function($scope, trafficforsigu, getsigunames, toptraffic, getbsunames, allgraphs, siguranged, allbsu) {
            $scope.allvars = {};
            $scope.allvars.Indi_Name = "BSU";
            $scope.sigunames = getbsunames.query();
            //                             
            $scope.update3333 = function() {
                //alert($scope.siguSelected);
                $scope.alltraffics = trafficforsigu.query({siguId: $scope.siguSelected});
                $scope.alltraffics.$promise.then(function(result) {
                    $scope.alltraffics = result;
                    var val = [['Time', 'Traffic IN']];
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

                        val.push([d1 + ":" + d2, obj[$scope.allvars.traff]]);
                    }
                    var data = google.visualization.arrayToDataTable(val);
                    var options = {
                        title: 'Traffic IN for SIGU'
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

            var showFromList5555 = function(result) {
                $scope.graphs = result;

                var sigus = result["sigus"];
                var times = result["times"]; // liste des TimePoint

                var tab = [];

                /* Ligne 1 de la matrice */
                var ligne1 = [['time']];
                for (var s in sigus) {
                    var sigu = sigus[s]; // le sigu 
                    var siguname = sigu["siguname"];
                    ligne1.push(siguname);
                }
                tab.push(ligne1);
//                for (var i = 0; i < 10; i++) // 10 = nombre de valeurs horizontales
//                    tab.push([i * 5]);

                /* Le reste des lignes, une ligne pour chaque TimePoint */
                for (var t in times) {
                    var time = times[t];
                    var timeId = time["id"];
                    var d = new Date(time["atTime"]);
                    var d1 = d.getHours();
                    var d2 = d.getMinutes();
                    var curr_date = d.getDate();
                    var curr_month = d.getMonth() + 1; //Months are zero based
                    var curr_year = d.getFullYear();
                    var datenow = curr_date + "-" + curr_month + "-" + curr_year;
                    var timeValeur = d1 + ":" + d2;

                    var ligne = [timeValeur];
                    for (var s in sigus) {
                        var sigu = sigus[s]; // le sigu 
                        var trafficsent = 0;
                        var traffics = sigu["liste"];
                        for (var trafficKey in traffics) {
                            var traffic = traffics[trafficKey];
                            if (traffic["dateExec"] === timeId) {
                                trafficsent = traffic[$scope.allvars.traff];
                                break;
                            }
                        }
                        ligne.push(trafficsent);
                    }
                    tab.push(ligne);

                }

                var data = google.visualization.arrayToDataTable(tab);
                var options = {
                    title: 'Traffic IN for SIGU'
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


            };

            $scope.updateShowAll = function() {
                var args = {
                    year: $scope.allvars.dt.getFullYear(),
                    month: $scope.allvars.dt.getMonth(),
                    day: $scope.allvars.dt.getDate()
                };
                var allsigu = allbsu.query(args);
                allsigu.$promise.then($scope.showFromListLOCAL);

            };
            $scope.showFromListLOCAL = function(result) {
                showFromList(result, $scope);
            }

            $scope.updateShowTop10 = function() {
                var allsigu = toptraffic.query();
                allsigu.$promise.then(showFromList);
            };

            $scope.updateRange = function() {
                var list = "";
                var start = 0;
                var i = 0;
                while (i < $scope.sigunames.length) {
                    if ($scope.sigunames[i].id == $scope.allvars.siguSelected) {
                        start = i;
                        break;
                    } else
                        i = i + 1;
                }

                // juska ? et créer la liste en parallèle
                for (i = start; i < $scope.sigunames.length; i++) {
                    if (list == "")
                        list = $scope.sigunames[i].id;
                    else
                        list = list + "," + $scope.sigunames[i].id;

                    if ($scope.sigunames[i].id == $scope.allvars.siguSelected2)
                        break;
                }

                //  alert(list);
                // i =0;
                var rangesigu = siguranged.query({list: list});
                rangesigu.$promise.then($scope.showFromListLOCAL);
            };

            $scope.updateRange11 = function() {
                var list = $scope.allvars.siguSelected3;
                // alert(list);
                var rangesigu = siguranged.query({list: list});
                rangesigu.$promise.then($scope.showFromListLOCAL);
            };
        })
        .controller('MyCtrl3', function($scope, trafficforsigu, getsigunames, toptraffic, getbsunames, allgraphs, siguranged, allbsu) {
            $scope.allvars = {};
            $scope.allvars.Indi_Name = "SIGU";
            $scope.sigunames = getsigunames.query();
            //                             
            $scope.update = function() {
                $scope.alltraffics = trafficforsigu.query({siguId: $scope.siguSelected});
                $scope.alltraffics.$promise.then(function(result) {
                    $scope.alltraffics = result;
                    var val = [['Time', 'Traffic IN']];
                    // key = i && tab[i]=result[key]
                    for (var key in result) {
                        var obj = result[key];
                        //  if (obj["siguName"] == nom) {                   
                        //  i = i + 5;
                        var d = new Date(obj["dateExec"]);
                        var d1 = d.getHours() - 1;
                        var d2 = d.getMinutes();
                        var curr_date = d.getDate();
                        var curr_month = d.getMonth() + 1; //Months are zero based
                        var curr_year = d.getFullYear();
                        var datenow = curr_date + "-" + curr_month + "-" + curr_year;

                        val.push([d1 + ":" + d2, obj["somme"]]);
                    }
                    var data = google.visualization.arrayToDataTable(val);
                    var options = {
                        title: 'Bandwidth for SIGU'
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
                    chart.type = $scope.chartTypes[2].typeValue;
                    $scope.chartType = $scope.chartTypes[2];
                    $scope.chart = chart;
                });

            };


            var showFromList = function(result) {
                $scope.graphs = result;
                var sigus = result["sigus"];
                var times = result["times"]; // liste des TimePoint
                var tab = [];
                /* Ligne 1 de la matrice */
                var ligne1 = [['time']];
                for (var s in sigus) {
                    var sigu = sigus[s]; // le sigu 
                    var siguname = sigu["siguname"];
                    ligne1.push(siguname);
                }
                tab.push(ligne1);
                var last_timeId;
                var last_timeValue;
                for (var t in times) {
                    var time = times[t];
                    var timeId = time["id"];
                    last_timeId = timeId;
                    var d = new Date(time["atTime"]);
                    var d1 = d.getHours();
                    var d2 = d.getMinutes();
                    var curr_date = d.getDate();
                    var curr_month = d.getMonth() + 1; //Months are zero based
                    var curr_year = d.getFullYear();
                    var datenow = curr_date + "-" + curr_month + "-" + curr_year;
                    var timeValeur = d1 + ":" + d2;
                    last_timeValue = timeValeur;
                    var ligne = [timeValeur];
                    for (var s in sigus) {
                        var sigu = sigus[s]; // le sigu 
                        var trafficsomme = 0;
                        var traffics = sigu["liste"];
                        for (var trafficKey in traffics) {
                            var traffic = traffics[trafficKey];
                            if (traffic["dateExec"] === timeId) {
                                trafficsomme = traffic["somme"];
                                break;
                            }
                        }
                        ligne.push(trafficsomme);
                    }
                    tab.push(ligne);
                }
                //////
                $scope.allvars.lasttime = last_timeValue;
                var tab2 = [['name', last_timeValue]];
                for (var s in sigus) {
                    var sigu = sigus[s]; // le sigu 
                    var lignesomme = [sigu["siguname"]];

                    var trafficsomme = 0;
                    var traffics = sigu["liste"];
                    for (var trafficKey in traffics) {
                        var traffic = traffics[trafficKey];
                        if (traffic["dateExec"] == last_timeId) {
                            trafficsomme = traffic["somme"];

                            break;
                        }
                    }
                    lignesomme.push(trafficsomme);
                    tab2.push(lignesomme);
                }
                //set a pie(thabit milblasa
                var data = google.visualization.arrayToDataTable(tab);
                var options = {
                    title: 'BandWIdth for SIGU'
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
                chart.type = $scope.chartTypes[2].typeValue;
                $scope.chartType = $scope.chartTypes[2];
                $scope.chart = chart;
                //pie
                var data2 = google.visualization.arrayToDataTable(tab2);
                var options2 = {
                    title: '% BandWidth for SIGU'
                };
                var chart2 = {};
                chart2.data = data2;
                chart2.options = options2;
                chart2.type = $scope.chartTypes[3].typeValue;
                $scope.chart2 = chart2;
            };
            $scope.updateShowAll = function() {
                var allsigu = allgraphs.query();
                allsigu.$promise.then(showFromList);

            };

            $scope.updateShowTop10 = function() {
                var allsigu = toptraffic.query();
                allsigu.$promise.then(showFromList);
            };

            $scope.updateRange = function() {
                var list = "";
                var start = 0;
                var i = 0;
                while (i < $scope.sigunames.length) {
                    if ($scope.sigunames[i].id == $scope.allvars.siguSelected) {
                        start = i;
                        break;
                    } else
                        i = i + 1;
                }

                // juska ? et créer la liste en parallèle
                for (i = start; i < $scope.sigunames.length; i++) {
                    if (list == "")
                        list = $scope.sigunames[i].id;
                    else
                        list = list + "," + $scope.sigunames[i].id;

                    if ($scope.sigunames[i].id == $scope.allvars.siguSelected2)
                        break;
                }

                //  alert(list);
                // i =0;
                var rangesigu = siguranged.query({list: list});
                rangesigu.$promise.then(showFromList);
            };

            $scope.updateRange11 = function() {
                var list = $scope.allvars.siguSelected3;
                // alert(list);
                var rangesigu = siguranged.query({list: list});
                rangesigu.$promise.then(showFromList);
            };

        }
        ).controller('MyCtrl4', function($scope, allmodules, trafficforsigu, getsigunames, toptraffic, getbsunames, allgraphs, siguranged, allbsu) {
    $scope.allvars = {};
    $scope.allvars.Indi_Name = "BSU";
    $scope.sigunames = getbsunames.query();


    var showFromList = function(result) {
        $scope.graphs = result;
        var sigus = result["sigus"];
        var times = result["times"]; // liste des TimePoint
        var tab = [];
        /* Ligne 1 de la matrice */
        var ligne1 = [['time']];
        for (var s in sigus) {
            var sigu = sigus[s]; // le sigu 
            var siguname = sigu["siguname"];
            ligne1.push(siguname);
        }
        tab.push(ligne1);
        var last_timeId;
        var last_timeValue;
        for (var t in times) {
            var time = times[t];
            var timeId = time["id"];
            last_timeId = timeId;
            var d = new Date(time["atTime"]);
            var d1 = d.getHours();
            var d2 = d.getMinutes();
            var curr_date = d.getDate();
            var curr_month = d.getMonth() + 1; //Months are zero based
            var curr_year = d.getFullYear();
            var datenow = curr_date + "-" + curr_month + "-" + curr_year;
            var timeValeur = d1 + ":" + d2;
            last_timeValue = timeValeur;
            var ligne = [timeValeur];
            for (var s in sigus) {
                var sigu = sigus[s]; // le sigu 
                var trafficsomme = 0;
                var traffics = sigu["liste"];
                for (var trafficKey in traffics) {
                    var traffic = traffics[trafficKey];
                    if (traffic["dateExec"] === timeId) {
                        trafficsomme = traffic["somme"];
                        break;
                    }
                }
                ligne.push(trafficsomme);
            }
            tab.push(ligne);
        }
        //////
        $scope.allvars.lasttime = last_timeValue;
        var tab2 = [['name', last_timeValue]];
        for (var s in sigus) {
            var sigu = sigus[s]; // le sigu 
            var lignesomme = [sigu["siguname"]];

            var trafficsomme = 0;
            var traffics = sigu["liste"];
            for (var trafficKey in traffics) {
                var traffic = traffics[trafficKey];
                if (traffic["dateExec"] == last_timeId) {
                    trafficsomme = traffic["somme"];

                    break;
                }
            }
            lignesomme.push(trafficsomme);
            tab2.push(lignesomme);
        }
        //set a pie(thabit milblasa
        var data = google.visualization.arrayToDataTable(tab);
        var options = {
            title: 'BandWidth for BSU'
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
        chart.type = $scope.chartTypes[2].typeValue;
        $scope.chartType = $scope.chartTypes[2];
        $scope.chart = chart;
        //pie
        var data2 = google.visualization.arrayToDataTable(tab2);
        var options2 = {
            title: '% BandWidth for BSU'
        };
        var chart2 = {};
        chart2.data = data2;
        chart2.options = options2;
        chart2.type = $scope.chartTypes[3].typeValue;
        $scope.chart2 = chart2;
    };
    $scope.updateShowAll = function() {
        var allsigu = allbsu.query();
        allsigu.$promise.then(showFromList);

    };

    $scope.updateShowTop10 = function() {
        var allsigu = toptraffic.query();
        allsigu.$promise.then(showFromList);
    };

    $scope.updateRange = function() {
        var list = "";
        var start = 0;
        var i = 0;
        while (i < $scope.sigunames.length) {
            if ($scope.sigunames[i].id == $scope.allvars.siguSelected) {
                start = i;
                break;
            } else
                i = i + 1;
        }

        // juska ? et créer la liste en parallèle
        for (i = start; i < $scope.sigunames.length; i++) {
            if (list == "")
                list = $scope.sigunames[i].id;
            else
                list = list + "," + $scope.sigunames[i].id;

            if ($scope.sigunames[i].id == $scope.allvars.siguSelected2)
                break;
        }

        //  alert(list);
        // i =0;
        var rangesigu = siguranged.query({list: list});
        rangesigu.$promise.then(showFromList);
    };

    $scope.updateRange11 = function() {
        var list = $scope.allvars.siguSelected3;
        // alert(list);
        var rangesigu = siguranged.query({list: list});
        rangesigu.$promise.then(showFromList);
    };

}
);
/*.controller('Index2', function($scope) {
 
 $scope.currencyFormatting = function(value) { return value.toString() + " $"; };
 
 
 $scope.DatepickerDemoCtrl = function() {
 $scope.today = function() {
 $scope.dt = new Date();
 };
 $scope.today();
 
 $scope.showWeeks = true;
 $scope.toggleWeeks = function() {
 $scope.showWeeks = !$scope.showWeeks;
 };
 
 $scope.clear = function() {
 $scope.dt = null;
 };
 
 // Disable weekend selection
 $scope.disabled = function(date, mode) {
 return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
 };
 
 $scope.toggleMin = function() {
 $scope.minDate = ($scope.minDate) ? null : new Date();
 };
 $scope.toggleMin();
 
 $scope.open = function($event) {
 $event.preventDefault();
 $event.stopPropagation();
 
 $scope.opened = true;
 };
 
 $scope.dateOptions = {
 'year-format': "'yy'",
 'starting-day': 1
 };
 
 $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'];
 $scope.format = $scope.formats[0];
 };
 })*/

module.controller('KPIController', function($scope, $filter, $timeout, allmodules, $stateParams) {
    $scope.allvars = {};
    $scope.allvars.optionsTabs = [true, false, false, false];
    $scope.allvars.timingOption = 0;
    $scope.allvars.chartType = 'line';
    $scope.mycalendar = null;
    $scope.onDateChange = function() {
        $timeout(function() {
            alert("ok3:" + $scope.allvars.timingOption + ":" + $scope.allvars.optionsTabs[0] + '-' + $scope.allvars.optionsTabs[1] + '-');
        });
    };
    $scope.onChangeChartType = function(type) {
        alert("type:" + type);
    };
    $scope.allvars.carteType = carteToID($stateParams.carte);
    $scope.allvars.Indi_Name = $stateParams.carte;
    $scope.sigunames = allmodules.query({type: $scope.allvars.carteType, mss: $stateParams.mssId});
    $scope.updateShowAll = function() {
        var list = "all," + $scope.allvars.carteType;
        return list;

    };

    $scope.updateShowTop10 = function() {
        return "";
    };

    $scope.updateRange = function() {
        var list = "";
        var start = 0;
        var i = 0;
        while (i < $scope.sigunames.length) {
            if ($scope.sigunames[i].id == $scope.allvars.siguSelected) {
                start = i;
                break;
            } else
                i = i + 1;
        }

        // juska ? et créer la liste en parallèle
        for (i = start; i < $scope.sigunames.length; i++) {
            if (list == "")
                list = $scope.sigunames[i].id;
            else
                list = list + "," + $scope.sigunames[i].id;

            if ($scope.sigunames[i].id == $scope.allvars.siguSelected2)
                break;
        }
        return list;
    };

    $scope.updateOne = function() {
        var list = $scope.allvars.siguSelected3;
        return list;
    };

    $scope.getSelectedOptions = function() {
        var ws_options = {};
        ws_options.mss = $stateParams.mssId;

        // options
        var list = "";
        if ($scope.allvars.optionsTabs[0])
            list = $scope.updateShowAll();
        else if ($scope.allvars.optionsTabs[1])
            list = $scope.updateRange();
        else if ($scope.allvars.optionsTabs[2])
            list = $scope.updateShowTop10();
        else if ($scope.allvars.optionsTabs[3])
            list = $scope.updateOne();
        ws_options.list11 = list;

        //date
        var date = "";
        var timingOption = $scope.allvars.timingOption;
        if (timingOption === 2) { // custom date
            var to = $scope.allvars.dates1.endDate.toDate();     //return date
            var from = $scope.allvars.dates1.startDate.toDate();

            var formattedTo = $filter('date')(to, "yyyy-MM-dd"); //return date with this format
            var formattedFrom = $filter('date')(from, "yyyy-MM-dd");

            ws_options.from = formattedFrom;
            ws_options.to = formattedTo;

        } else if (timingOption === 0) { // custom date
            ws_options.from = 'lastHour';
            ws_options.to = '';
        } else if (timingOption === 1) { // custom date
            ws_options.from = 'last4Hours';
            ws_options.to = '';
        }
        return ws_options;
    }

});
module.controller('CPUController', function($scope, $timeout, detailsService) {
    $scope.show = function() {
        var c = $scope.mycalendar;
        c.show();
    };

    $scope.onChangeChartType = function(type) {
        if ($scope.highchartsNG) {
            var series = $scope.highchartsNG.series;
            for (var key in series) {
                series[key].type = type;
            }
        }

    };

    var showFromList2 = function(result) {
        $scope.graphs = result;
        var sigus = result["modules"];
        var times = result["times"]; // liste des TimePoint
        var series = [];
        var noms = [];
        //for each module
        for (var s in sigus) {
            var sigu = sigus[s]; // le sigu 
            var siguname = sigu["modulename"];
            var data = []; // le data de ce sigu, à remplir par la liste des cpus
            var traffics = sigu["liste"];
            for (var trafficKey in traffics) {
                var traffic = traffics[trafficKey];
                // chercher le timepoint
                for (var t in times) {
                    var time = times[t];
                    var timeId = time["id"];

                    if (traffic["dateExec"] == timeId) {
                        data.push([new Date(time["atTime"]).getTime(), traffic["loadCPU"]]);
                        break;
                    }
                }
            }
            series.push({data: data, name: siguname, type: $scope.allvars.chartType});

        }

        $scope.highchartsNG = {
            options: {
                /*chart: {
                 type: 'line'
                 },*/
                rangeSelector: {
                    enabled: true,
                    buttons: [{
                            type: 'day',
                            count: 1,
                            text: '1d'
                        }, {
                            type: 'minute',
                            count: 360,
                            text: '6h'
                        }, {
                            type: 'minute',
                            count: 180,
                            text: '3h'
                        }, {
                            type: 'minute',
                            count: 60,
                            text: '1h'
                        }],
                    inputEnabled: false
                },
                navigator: {enabled: true}

            },
            series: series,
            title: {
                text: 'Load Percent of CPU'
            },
            loading: false,
            useHighStocks: true
        };

    };

    $scope.generalUpdate = function() {
        $timeout(function() {
            var ws_options = $scope.getSelectedOptions();

            //for the indi
            ws_options.indi = "allcpu";

            var rangesigu = detailsService.query(ws_options);
            rangesigu.$promise.then(showFromList2);


        });
    };
}
);
module.controller('TrafficController', function($scope, $timeout, detailsService) {
    $scope.show = function() {
        var c = $scope.mycalendar;
        c.show();
    };

    $scope.onChangeChartType = function(type) {
        if ($scope.highchartsNG) {
            var series = $scope.highchartsNG.series;
            for (var key in series) {
                series[key].type = type;
            }
        }

    };

    var showFromList2 = function(result) {
        $scope.graphs = result;
        var sigus = result["modules"];
        var times = result["times"]; // liste des TimePoint
        var series_line = [];
        //for each module
        for (var s in sigus) {
            var sigu = sigus[s]; // le sigu 
            var siguname = sigu["modulename"];
            var data = []; // le data de ce sigu, à remplir par la liste des cpus
            var traffics = sigu["liste"];
            for (var trafficKey in traffics) {
                var traffic = traffics[trafficKey];
                // chercher le timepoint
                for (var t in times) {
                    var time = times[t];
                    var timeId = time["id"];

                    if (traffic["dateExec"] == timeId) {
                        data.push([new Date(time["atTime"]).getTime(), traffic["packetreceived"]]);
                        break;
                    }
                }
            }
            series_line.push({data: data, name: siguname, type: $scope.allvars.chartType});

        }


        // pour le pie
        var last_timeId = times[times.length - 1].id;
        $scope.allvars.timeForPie = last_timeId;
        var data_pie = [];
        for (var s in sigus) {
            var sigu = sigus[s]; // le sigu 
            var traffics = sigu["liste"];
            for (var trafficKey in traffics) {
                var traffic = traffics[trafficKey];
                if (traffic["dateExec"] == last_timeId) {
                    data_pie.push([sigu["modulename"], traffic["packetreceived"] + 5]);
                    break;
                }
            }
        }
        var series_pie = [{data: data_pie, type: 'pie'}];
        $scope.highchartsNG = {
            options: {
                 events : {
                    click : function (e){
                        alert("click");
                    }
                },
           
                rangeSelector: {
                    enabled: true,
                    buttons: [{
                            type: 'day',
                            count: 1,
                            text: '1d'
                        }, {
                            type: 'minute',
                            count: 360,
                            text: '6h'
                        }, {
                            type: 'minute',
                            count: 180,
                            text: '3h'
                        }, {
                            type: 'minute',
                            count: 60,
                            text: '1h'
                        }],
                    inputEnabled: false
                },
                navigator: {enabled: true}

            },
            series: series_line,
            title: {
                text: 'Load Percent of CPU'
            },
            loading: false,
            useHighStocks: true
        };
        $scope.highchartsNGPie = {
            series: series_pie,
            title: {
                text: 'Load Percent of CPU'
            },
            loading: false
        };

    };

    $scope.generalUpdate = function() {
        $timeout(function() {
            var ws_options = $scope.getSelectedOptions();

            //for the indi
            ws_options.indi = "traffic";

            var rangesigu = detailsService.query(ws_options);
            rangesigu.$promise.then(showFromList2);


        });
    };
}
);
module.controller('BPController', function($scope, $timeout, detailsService) {
    $scope.show = function() {
        var c = $scope.mycalendar;
        c.show();
    };

    $scope.onChangeChartType = function(type) {
        if ($scope.highchartsNG) {
            var series = $scope.highchartsNG.series;
            for (var key in series) {
                series[key].type = type;
            }
        }

    };

    var showFromList2 = function(result) {
        $scope.graphs = result;
        var sigus = result["modules"];
        var times = result["times"]; // liste des TimePoint
        var series = [];
        var noms = [];
        //for each module
        for (var s in sigus) {
            var sigu = sigus[s]; // le sigu 
            var siguname = sigu["modulename"];
            var data = []; // le data de ce sigu, à remplir par la liste des cpus
            var traffics = sigu["liste"];
            for (var trafficKey in traffics) {
                var traffic = traffics[trafficKey];
                // chercher le timepoint
                for (var t in times) {
                    var time = times[t];
                    var timeId = time["id"];

                    if (traffic["dateExec"] == timeId) {
                        data.push([new Date(time["atTime"]).getTime(), traffic["loadCPU"]]);
                        break;
                    }
                }
            }
            series.push({data: data, name: siguname, type: $scope.allvars.chartType});

        }

        $scope.highchartsNG = {
            options: {
                /*chart: {
                 type: 'line'
                 },*/
                rangeSelector: {
                    enabled: true,
                    buttons: [{
                            type: 'day',
                            count: 1,
                            text: '1d'
                        }, {
                            type: 'minute',
                            count: 360,
                            text: '6h'
                        }, {
                            type: 'minute',
                            count: 180,
                            text: '3h'
                        }, {
                            type: 'minute',
                            count: 60,
                            text: '1h'
                        }],
                    inputEnabled: false
                },
                navigator: {enabled: true}

            },
            series: series,
            title: {
                text: 'Load Percent of CPU'
            },
            loading: false,
            useHighStocks: true
        };

    };

    $scope.generalUpdate = function() {
        $timeout(function() {
            var ws_options = $scope.getSelectedOptions();

            //for the indi
            ws_options.indi = "allcpu";

            var rangesigu = detailsService.query(ws_options);
            rangesigu.$promise.then(showFromList2);


        });
    };
}
);

module.controller('MyCtrl6', function($scope, trafficforsigu, getsigunames, toptraffic, getbsunames, allgraphs, siguranged, allbsu) {
    $("#ex7").slider();
    $("#ex7-enabled").click(function() {
        if (this.checked) {
            $("#ex7").slider("enable");
        }
        return chartData;
    }


    );
});

module.controller('ModalInstanceCtrl', function($scope, $modalInstance, login, getsigunames, toptraffic, allgraphs, siguranged) {

    $scope.allvars = {};
    $scope.selected = {
    };

    $scope.submit = function() {
        var list = "";
        list = list + $scope.allvars.ip + "," + $scope.allvars.log + "," + $scope.allvars.pw;
        $scope.log = login.query({username: list});
        alert(list);
        // $modalInstance.close(0);
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
});

module.controller('AppMainController', function($scope, $state, $modal, $log, login, mss) {
    $scope.mainvars = {};
    // $scope.allvars.Indi_Name = "MSS";

    var allmss = mss.query();
    //mss tabs
    allmss.$promise.then(function() {
        $scope.mainvars.tabs = [
//        {heading: "MSS 1", route: "mss", active: false},
//        {heading: "MSS 2", route: "mass", active: false},
//        {heading: "MSS 3", route: "mss", active: false}
        ];
        for (var msskey in allmss) {
            var thismss = allmss[msskey];
            $scope.mainvars.tabs.push({heading: thismss.adrip, route: thismss.id, active: false});
        }
    });
    $scope.go = function(route) {
        $state.go(route);
    };

    $scope.active = function(route) {
        return $state.is(route);
    };

    $scope.$on("$stateChangeSuccess", function() {
        $scope.tabs.forEach(function(tab) {
            tab.active = $scope.active(tab.route);
        });
    });

    $scope.selectedTab = function(tab) {
        tab.active = true;
        $state.go('mss', {mssId: tab.route});
    },
            // add mss
            $scope.open = function(size) {
                var modalInstance = $modal.open({
                    templateUrl: 'partials/addMSS.html',
                    controller: 'ModalInstanceCtrl',
                    size: size
                });

                modalInstance.result.then(function(selectedItem) {
                }, function() {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };
});
