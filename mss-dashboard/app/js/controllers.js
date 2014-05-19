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
             $scope.addPoints = function () {
        var seriesArray = $scope.highchartsNG.series;
        var rndIdx = Math.floor(Math.random() * seriesArray.length);
        seriesArray[rndIdx].data = seriesArray[rndIdx].data.concat([1, 10, 20]);
    };

    $scope.addSeries = function () {
        var rnd = [
/* May 2006 */
[1147651200000,67.79],
[1147737600000,64.98],
[1147824000000,65.26],
[1147910400000,63.18],
[1147996800000,64.51],
[1148256000000,63.38],
[1148342400000,63.15],
[1148428800000,63.34],
[1148515200000,64.33],
[1148601600000,63.55],
[1148947200000,61.22],
[1149033600000,59.77],
/* Jun 2006 */
[1149120000000,62.17],
[1149206400000,61.66],
[1149465600000,60.00],
[1149552000000,59.72],
[1149638400000,58.56],
[1149724800000,60.76],
[1149811200000,59.24],
[1150070400000,57.00],
[1150156800000,58.33],
[1150243200000,57.61],
[1150329600000,59.38],
[1150416000000,57.56],
[1150675200000,57.20],
[1150761600000,57.47],
[1150848000000,57.86],
[1150934400000,59.58],
[1151020800000,58.83],
[1151280000000,58.99],
[1151366400000,57.43],
[1151452800000,56.02],
[1151539200000,58.97],
[1151625600000,57.27],
/* Jul 2006 */
[1151884800000,57.95],
[1152057600000,57.00],
[1152144000000,55.77],
[1152230400000,55.40],
[1152489600000,55.00],
[1152576000000,55.65],
[1152662400000,52.96],
[1152748800000,52.25],
[1152835200000,50.67],
[1153094400000,52.37],
[1153180800000,52.90],
[1153267200000,54.10],
[1153353600000,60.50],
[1153440000000,60.72],
[1153699200000,61.42],
[1153785600000,61.93],
[1153872000000,63.87],
[1153958400000,63.40],
[1154044800000,65.59],
[1154304000000,67.96],
/* Aug 2006 */
[1154390400000,67.18],
[1154476800000,68.16],
[1154563200000,69.59],
[1154649600000,68.30],
[1154908800000,67.21],
[1154995200000,64.78],
[1155081600000,63.59],
[1155168000000,64.07],
[1155254400000,63.65],
[1155513600000,63.94],
[1155600000000,66.45],
[1155686400000,67.98],
[1155772800000,67.59],
[1155859200000,67.91],
[1156118400000,66.56],
[1156204800000,67.62],
[1156291200000,67.31],
[1156377600000,67.81],
[1156464000000,68.75],
[1156723200000,66.98],
[1156809600000,66.48],
[1156896000000,66.96],
[1156982400000,67.85],
/* Sep 2006 */
[1157068800000,68.38],
[1157414400000,71.48],
[1157500800000,70.03],
[1157587200000,72.80],
[1157673600000,72.52],
[1157932800000,72.50],
[1158019200000,72.63],
[1158105600000,74.20],
[1158192000000,74.17],
[1158278400000,74.10],
[1158537600000,73.89],
[1158624000000,73.77],
[1158710400000,75.26],
[1158796800000,74.65],
[1158883200000,73.00],
[1159142400000,75.75],
[1159228800000,77.61],
[1159315200000,76.41],
[1159401600000,77.01],
[1159488000000,76.98],
/* Oct 2006 */
[1159747200000,74.86],
[1159833600000,74.08],
[1159920000000,75.38],
[1160006400000,74.83],
[1160092800000,74.22],
[1160352000000,74.63],
[1160438400000,73.81],
[1160524800000,73.23],
[1160611200000,75.26],
[1160697600000,75.02],
[1160956800000,75.40],
[1161043200000,74.29],
[1161129600000,74.53],
[1161216000000,78.99],
[1161302400000,79.95],
[1161561600000,81.46],
[1161648000000,81.05],
[1161734400000,81.68],
[1161820800000,82.19],
[1161907200000,80.41],
[1162166400000,80.42],
[1162252800000,81.08],
/* Nov 2006 */
[1162339200000,79.16],
[1162425600000,78.98],
[1162512000000,78.29],
[1162771200000,79.71],
[1162857600000,80.51],
[1162944000000,82.45],
[1163030400000,83.34],
[1163116800000,83.12],
[1163376000000,84.35],
[1163462400000,85.00],
[1163548800000,84.05],
[1163635200000,85.61],
[1163721600000,85.85],
[1163980800000,86.47],
[1164067200000,88.60],
[1164153600000,90.31],
[1164326400000,91.63],
[1164585600000,89.54],
[1164672000000,91.81],
[1164758400000,91.80],
[1164844800000,91.66],
/* Dec 2006 */
[1164931200000,91.32],
[1165190400000,91.12],
[1165276800000,91.27],
[1165363200000,89.83],
[1165449600000,87.04],
[1165536000000,88.26],
[1165795200000,88.75],
[1165881600000,86.14],
[1165968000000,89.05],
[1166054400000,88.55],
[1166140800000,87.72],
[1166400000000,85.47],
[1166486400000,86.31],
[1166572800000,84.76],
[1166659200000,82.90],
[1166745600000,82.20],
[1167091200000,81.51],
[1167177600000,81.52],
[1167264000000,80.87],
[1167350400000,84.84],
/* Jan 2007 */
[1167782400000,83.80],
[1167868800000,85.66],
[1167955200000,85.05],
[1168214400000,85.47],
[1168300800000,92.57],
[1168387200000,97.00],
[1168473600000,95.80],
[1168560000000,94.62],
[1168905600000,97.10],
[1168992000000,94.95],
[1169078400000,89.07],
[1169164800000,88.50],
[1169424000000,86.79],
[1169510400000,85.70],
[1169596800000,86.70],
[1169683200000,86.25],
[1169769600000,85.38],
[1170028800000,85.94],
[1170115200000,85.55],
[1170201600000,85.73],
/* Feb 2007 */
[1170288000000,84.74],
[1170374400000,84.75],
[1170633600000,83.94],
[1170720000000,84.15],
[1170806400000,86.15],
[1170892800000,86.18],
[1170979200000,83.27],
[1171238400000,84.88],
[1171324800000,84.63],
[1171411200000,85.30],
[1171497600000,85.21],
[1171584000000,84.83],
[1171929600000,85.90],
[1172016000000,89.20],
[1172102400000,89.51],
[1172188800000,89.07],
[1172448000000,88.65],
[1172534400000,83.93],
[1172620800000,84.61],
/* Mar 2007 */
[1172707200000,87.06],
[1172793600000,85.41],
[1173052800000,86.32],
[1173139200000,88.19],
[1173225600000,87.72],
[1173312000000,88.00],
[1173398400000,87.97],
[1173657600000,89.87],
[1173744000000,88.40],
[1173830400000,90.00],
[1173916800000,89.57],
[1174003200000,89.59],
[1174262400000,91.13],
[1174348800000,91.48],
[1174435200000,93.87],
[1174521600000,93.96],
[1174608000000,93.52],
[1174867200000,95.85],
[1174953600000,95.46],
[1175040000000,93.24],
[1175126400000,93.75],
[1175212800000,92.91],
/* Apr 2007 */
[1175472000000,93.65],
[1175558400000,94.50],
[1175644800000,94.27],
[1175731200000,94.68],
[1176076800000,93.65],
[1176163200000,94.25],
[1176249600000,92.59],
[1176336000000,92.19],
[1176422400000,90.24],
[1176681600000,91.43],
[1176768000000,90.35],
[1176854400000,90.40],
[1176940800000,90.27],
[1177027200000,90.97],
[1177286400000,93.51],
[1177372800000,93.24],
[1177459200000,95.35],
[1177545600000,98.84],
[1177632000000,99.92],
[1177891200000,99.80],
/* May 2007 */
[1177977600000,99.47],
[1178064000000,100.39],
[1178150400000,100.40],
[1178236800000,100.81],
[1178496000000,103.92],
[1178582400000,105.06],
[1178668800000,106.88],
[1178755200000,107.34],
[1178841600000,108.74],
[1179100800000,109.36],
[1179187200000,107.52],
[1179273600000,107.34],
[1179360000000,109.44],
[1179446400000,110.02],
[1179705600000,111.98],
[1179792000000,113.54],
[1179878400000,112.89],
[1179964800000,110.69],
[1180051200000,113.62],
[1180396800000,114.35],
[1180483200000,118.77],
[1180569600000,121.19],
/* Jun 2007 */
[1180656000000,118.40],
[1180915200000,121.33],
[1181001600000,122.67],
[1181088000000,123.64],
[1181174400000,124.07],
[1181260800000,124.49],
[1181520000000,120.19],
[1181606400000,120.38],
[1181692800000,117.50],
[1181779200000,118.75],
[1181865600000,120.50],
[1182124800000,125.09],
[1182211200000,123.66],
[1182297600000,121.55],
[1182384000000,123.90],
[1182470400000,123.00],
[1182729600000,122.34],
[1182816000000,119.65],
[1182902400000,121.89],
[1182988800000,120.56],
[1183075200000,122.04],
/* Jul 2007 */
[1183334400000,121.26],
[1183420800000,127.17],
[1183593600000,132.75],
[1183680000000,132.30],
[1183939200000,130.33],
[1184025600000,132.35],
[1184112000000,132.39],
[1184198400000,134.07],
[1184284800000,137.73],
[1184544000000,138.10],
[1184630400000,138.91],
[1184716800000,138.12],
[1184803200000,140.00],
[1184889600000,143.75],
[1185148800000,143.70],
[1185235200000,134.89],
[1185321600000,137.26],
[1185408000000,146.00],
[1185494400000,143.85],
[1185753600000,141.43],
[1185840000000,131.76],
/* Aug 2007 */
[1185926400000,135.00],
[1186012800000,136.49],
[1186099200000,131.85],
[1186358400000,135.25],
[1186444800000,135.03],
[1186531200000,134.01],
[1186617600000,126.39],
[1186704000000,125.00],
[1186963200000,127.79],
[1187049600000,124.03],
[1187136000000,119.90],
[1187222400000,117.05],
[1187308800000,122.06],
[1187568000000,122.22],
[1187654400000,127.57],
[1187740800000,132.51],
[1187827200000,131.07],
[1187913600000,135.30],
[1188172800000,132.25],
[1188259200000,126.82],
[1188345600000,134.08],
[1188432000000,136.25],
[1188518400000,138.48],
/* Sep 2007 */
[1188864000000,144.16],
[1188950400000,136.76],
[1189036800000,135.01],
[1189123200000,131.77],
[1189382400000,136.71],
[1189468800000,135.49],
[1189555200000,136.85],
[1189641600000,137.20],
[1189728000000,138.81],
[1189987200000,138.41],
[1190073600000,140.92],
[1190160000000,140.77],
[1190246400000,140.31],
[1190332800000,144.15],
[1190592000000,148.28],
[1190678400000,153.18],
[1190764800000,152.77],
[1190851200000,154.50],
[1190937600000,153.47],
/* Oct 2007 */
[1191196800000,156.34],
[1191283200000,158.45],
[1191369600000,157.92],
[1191456000000,156.24],
[1191542400000,161.45],
[1191801600000,167.91],
[1191888000000,167.86],
[1191974400000,166.79],
[1192060800000,162.23],
[1192147200000,167.25],
[1192406400000,166.98],
[1192492800000,169.58],
[1192579200000,172.75],
[1192665600000,173.50],
[1192752000000,170.42],
[1193011200000,174.36],
[1193097600000,186.16],
[1193184000000,185.93],
[1193270400000,182.78],
[1193356800000,184.70],
[1193616000000,185.09],
[1193702400000,187.00],
[1193788800000,189.95],
/* Nov 2007 */
[1193875200000,187.44],
[1193961600000,187.87],
[1194220800000,186.18],
[1194307200000,191.79],
[1194393600000,186.30],
[1194480000000,175.47],
[1194566400000,165.37],
[1194825600000,153.76],
[1194912000000,169.96],
[1194998400000,166.11],
[1195084800000,164.30],
[1195171200000,166.39],
[1195430400000,163.95],
[1195516800000,168.85],
[1195603200000,168.46],
[1195776000000,171.54],
[1196035200000,172.54],
[1196121600000,174.81],
[1196208000000,180.22],
[1196294400000,184.29],
[1196380800000,182.22],
/* Dec 2007 */
[1196640000000,178.86],
[1196726400000,179.81],
[1196812800000,185.50],
[1196899200000,189.95],
[1196985600000,194.30],
[1197244800000,194.21],
[1197331200000,188.54],
[1197417600000,190.86],
[1197504000000,191.83],
[1197590400000,190.39],
[1197849600000,184.40],
[1197936000000,182.98],
[1198022400000,183.12],
[1198108800000,187.21],
[1198195200000,193.91],
[1198454400000,198.80],
[1198627200000,198.95],
[1198713600000,198.57],
[1198800000000,199.83],
[1199059200000,198.08],
/* Jan 2008 */
[1199232000000,194.84],
[1199318400000,194.93],
[1199404800000,180.05],
[1199664000000,177.64],
[1199750400000,171.25],
[1199836800000,179.40],
[1199923200000,178.02],
[1200009600000,172.69],
[1200268800000,178.78],
[1200355200000,169.04],
[1200441600000,159.64],
[1200528000000,160.89],
[1200614400000,161.36],
[1200960000000,155.64],
[1201046400000,139.07],
[1201132800000,135.60],
[1201219200000,130.01],
[1201478400000,130.01],
[1201564800000,131.54],
[1201651200000,132.18],
[1201737600000,135.36],
/* Feb 2008 */
[1201824000000,133.75],
[1202083200000,131.65],
[1202169600000,129.36],
[1202256000000,122.00],
[1202342400000,121.24],
[1202428800000,125.48],
[1202688000000,129.45],
[1202774400000,124.86],
[1202860800000,129.40],
[1202947200000,127.46],
[1203033600000,124.63],
[1203379200000,122.18],
[1203465600000,123.82],
[1203552000000,121.54],
[1203638400000,119.46],
[1203897600000,119.74],
[1203984000000,119.15],
[1204070400000,122.96],
[1204156800000,129.91],
[1204243200000,125.02],
/* Mar 2008 */
[1204502400000,121.73],
[1204588800000,124.62],
[1204675200000,124.49],
[1204761600000,120.93],
[1204848000000,122.25],
[1205107200000,119.69],
[1205193600000,127.35],
[1205280000000,126.03],
[1205366400000,127.94],
[1205452800000,126.61],
[1205712000000,126.73],
[1205798400000,132.82],
[1205884800000,129.67],
[1205971200000,133.27],
[1206316800000,139.53],
[1206403200000,140.98],
[1206489600000,145.06],
[1206576000000,140.25],
[1206662400000,143.01],
[1206921600000,143.50]
];
        /*for (var i = 0; i < 10; i++) {
             rnd.push(Math.floor(Math.random() * 20) + 1);
        }*/
        $scope.highchartsNG.series.push({
            data: rnd
        });
    };

    $scope.removeRandomSeries = function () {
        var seriesArray = $scope.highchartsNG.series;
        var rndIdx = Math.floor(Math.random() * seriesArray.length);
        seriesArray.splice(rndIdx, 1);
    };

    $scope.options ={
                    /*chart: {
                        type: 'line'
                    },*/
                                rangeSelector: {enabled: true},
                                navigator:{enabled:true}

                };

    $scope.swapChartType = function () {
        if (this.highchartsNG.options.chart.type === 'line') {
            this.highchartsNG.options.chart.type = 'bar';
        } else {
            this.highchartsNG.options.chart.type = 'line';
        }
    };

    $scope.highchartsNG = {
        options: {
            chart: {
                type: 'bar'
            }
        },
        series: [{
            data: [10, 15, 12, 8, 7]
        }],
        title: {
                    text: 'Hello'
                },
                loading: false, 
                useHighStocks: true
    };

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
        