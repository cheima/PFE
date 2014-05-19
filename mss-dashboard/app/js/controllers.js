'use strict';
/* Controllers */
//load the visualization API and the linechart package
google.load('visualization', '1', {packages: ['corechart']});
//nitialize our Angular app
google.setOnLoadCallback(function() {
    angular.bootstrap(document.body, ['myApp']);
});

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

angular.module('myApp.controllers', []).
        controller('MyCtrl1', function($scope, trafficforsigu, getsigunames, toptraffic, allgraphs, siguranged) {
            $scope.allvars = {};
            $scope.allvars.Indi_Name = "SIGU";
            $scope.allvars.packet = "packetreceived";
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
)/*.controller('Index2', function($scope) {
 
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
        .controller('MyCtrl5', function($scope, allcpu, allcpu11, allmodules, $state, allcpu99) {
            $scope.allvars = {};

            $scope.show = function() {
                //alert("ok");
                var c = $scope.myc;
                //var c= angular.element(document.querySelector('.yourclass'));
                c.data('daterangepicker').show();
            };
            $scope.onchange = function() {
                alert("ok2");
            }
            if ($state.includes('bsu')) {
                $scope.allvars.Indi_Name = "BSU";
                $scope.sigunames = allmodules.query({type: 1});
            }
            else if ($state.includes('sigu')) {
                $scope.allvars.Indi_Name = "SIGU";
                $scope.sigunames = allmodules.query({type: 0});
            }
            else if ($state.includes('vlru')) {
                $scope.allvars.Indi_Name = "VLRU";
                $scope.sigunames = allmodules.query({type: 2});
            }
            else if ($state.includes('ccsu')) {
                $scope.allvars.Indi_Name = "CCSU";
                $scope.sigunames = allmodules.query({type: 3});
            }
            else if ($state.includes('chu')) {
                $scope.allvars.Indi_Name = "CHU";
                $scope.sigunames = allmodules.query({type: 4});
            }
            else if ($state.includes('bdcu')) {
                $scope.allvars.Indi_Name = "BDCU";
                $scope.sigunames = allmodules.query({type: 5});
            }
            else if ($state.includes('cmu')) {
                $scope.allvars.Indi_Name = "CMU";
                $scope.sigunames = allmodules.query({type: 6});
            }
            else if ($state.includes('stu')) {
                $scope.allvars.Indi_Name = "STU";
                $scope.sigunames = allmodules.query({type: 7});
            }
            else if ($state.includes('omu')) {
                $scope.allvars.Indi_Name = "OMU";
                $scope.sigunames = allmodules.query({type: 8});
            }
            else if ($state.includes('cmm')) {
                $scope.allvars.Indi_Name = "CMM";
                $scope.sigunames = allmodules.query({type: 9});
            }
            //$scope.sigunames = allcpu12.query({list12:1});
            var showFromList2 = function(result) {
                // $scope.show();
                $scope.graphs = result;
                var sigus = result["modules"];
                // var sigus = result["sigus"];
                var times = result["times"]; // liste des TimePoint
                var tab = [];
                /* Ligne 1 de la matrice */
                var ligne1 = ['time'];
                for (var s in sigus) {
                    var sigu = sigus[s]; // le sigu 
                    var siguname = sigu["modulename"];
                    //  var siguname = sigu["siguname"];
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
                    var d1 = d.getHours() - 1;
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
                            if (traffic["dateExec"] == timeId) {
                                trafficsomme = traffic["loadCPU"];
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
                    var lignesomme = [sigu["modulename"]];
                    // var lignesomme = [sigu["siguname"]];

                    var trafficsomme = 0;
                    var traffics = sigu["liste"];
                    for (var trafficKey in traffics) {
                        var traffic = traffics[trafficKey];
                        if (traffic["dateExec"] == last_timeId) {
                            trafficsomme = traffic["loadCPU"];

                            break;
                        }
                    }
                    lignesomme.push(trafficsomme);
                    tab2.push(lignesomme);
                }
                //set a pie
                var data = google.visualization.arrayToDataTable(tab);
                var options = {
                    title: '% of CPU '
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
                    title: '% of CPU'
                };
                var chart2 = {};
                chart2.data = data2;
                chart2.options = options2;
                chart2.type = $scope.chartTypes[3].typeValue;
                $scope.chart2 = chart2;
            };
            $scope.updateShowAll = function() {
                var args = {
                    year: $scope.allvars.dt.getFullYear(),
                    month: $scope.allvars.dt.getMonth(),
                    day: $scope.allvars.dt.getDate()
                };
                if ($state.includes('bsu')) {
                    args.type1 = 1;
                }
                else if ($state.includes('sigu')) {
                    args.type1 = 0;
                }
                else if ($state.includes('vlru')) {
                    args.type1 = 2;
                }
                else if ($state.includes('ccsu')) {
                    // var allsigu = allcpu.query({type1: 3});
                    args.type1 = 3;
                }
                else if ($state.includes('chu')) {
                    // var allsigu = allcpu.query({type1: 4});
                    args.type1 = 4;
                }
                else if ($state.includes('bdcu')) {
                    // var allsigu = allcpu.query({type1: 5});
                    args.type1 = 5;
                }
                else if ($state.includes('cmu')) {
                    // var allsigu = allcpu.query({type1: 6});
                    args.type1 = 6;
                }
                else if ($state.includes('stu')) {
                    //var allsigu = allcpu.query({type1: 7});
                    args.type1 = 7;
                }
                else if ($state.includes('omu')) {
                    // var allsigu = allcpu.query({type1: 8});
                    args.type1 = 8;
                }
                else if ($state.includes('cmm')) {
                    //var allsigu = allcpu.query({type1: 9});
                    args.type1 = 9;
                }

                var allsigu = allcpu.query(args);
                allsigu.$promise.then(showFromList2);

            };

            $scope.updateShowTop10 = function() {
                var allsigu = allcpu.query({type1: 0});
                allsigu.$promise.then(showFromList2);
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
                var args = {
                    year: $scope.allvars.dt.getFullYear(),
                    month: $scope.allvars.dt.getMonth(),
                    day: $scope.allvars.dt.getDate(),
                    list11: list
                };
                /* var rangesigu = allcpu11.query(args);
                 rangesigu.$promise.then(showFromList2);*/
                var from = "2014-05-15";
                var to = "2014-05-19";
                var rangesigu = allcpu99.query({from: from, to: to});
                rangesigu.$promise.then(showFromList2);

            };

            $scope.updateRange11 = function() {
                var list = $scope.allvars.siguSelected3;
                var args = {
                    year: $scope.allvars.dt.getFullYear(),
                    month: $scope.allvars.dt.getMonth(),
                    day: $scope.allvars.dt.getDate(),
                    list11: list
                };
                // alert(list);
                var rangesigu = allcpu11.query(args);
                var rangesigu = allcpu11.query(list);
                rangesigu.$promise.then(showFromList2);
            };

        }
        ).controller('MyCtrl6', function($scope, trafficforsigu, getsigunames, toptraffic, getbsunames, allgraphs, siguranged, allbsu) {
    $("#ex7").slider();
    $("#ex7-enabled").click(function() {
        if (this.checked) {
            $("#ex7").slider("enable");
        }
        return chartData;
    }


    );
});
        