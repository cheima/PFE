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
var module = angular.module('myApp.controllers', []);

module.controller('KPIController', function($scope, $filter, $timeout, allmodules, $stateParams) {
    $scope.allvars = {};
    $scope.allvars.optionsTabs = [false, false, true, false];
    $scope.allvars.timingOption = 0;
    //$scope.allvars.charteType = 'line';
    $scope.mycalendar = null;
    $scope.allvars.selectedCarts = []; // pour le pie
    $scope.events = {};
    $scope.events.onDateChange = function() {
        $timeout(function() {
            alert("ok3:" + $scope.allvars.timingOption + ":" + $scope.allvars.optionsTabs[0] + '-' + $scope.allvars.optionsTabs[1] + '-');
        });
    };
    $scope.events.onChartClick = function() {
    };
    $scope.events.onChangeChartType = function(type) {
        alert("type:" + type);
    };
    $scope.allvars.carteType = carteToID($stateParams.carte);
    $scope.allvars.Indi_Name = $stateParams.carte;
    $scope.allvars.mss = $stateParams.mssId;
    $scope.sigunames = allmodules.query({type: $scope.allvars.carteType, mss: $stateParams.mssId});
    $scope.updateShowAll = function() {
        var list = "all," + $scope.allvars.carteType;
        return list;
        $scope.allvars.selectedCarts = [];
    };

    $scope.updateShowTop10 = function() {
        var list = "top," + $scope.allvars.carteType;
        return list;
        $scope.allvars.selectedCarts = [];
    };

    $scope.updateRange = function() {
        $scope.allvars.selectedCarts = [];
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
            $scope.allvars.selectedCarts.push($scope.sigunames[i].id);
            if ($scope.sigunames[i].id == $scope.allvars.siguSelected2)
                break;
        }
        return list;
    };

    $scope.updateOne = function() {
        var selected = $scope.allvars.siguSelected3;
        $scope.allvars.selectedCarts = [selected];
        return selected;
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

        } else if (timingOption === 0) { //last hour
            ws_options.from = 'lastHour';
            ws_options.to = '';
        } else if (timingOption === 1) { // last 4 hours
            ws_options.from = 'last4Hours';
            ws_options.to = '';
        }
        return ws_options;
    };

    // charts
    $scope.highchartsNG = {
        options: {
            plotOptions: {
                series: {
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function() {
                                var timepoint = this.category;
                                $scope.$apply(function() {
                                    var c = $scope.allvars;
                                    c.selectedPoint = "clicked:" + timepoint;
                                    $scope.events.onChartClick(timepoint);
                                });
                            }
                        }
                    }
                }
            },
            yAxis: {
                opposite: false
            },
            legend: {
                enabled: true
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
            navigator: {enabled: true},
            chart: {type: 'line'}

        },
        series: [],
        title: {
            text: 'TrafficIN'
        },
        loading: false,
        useHighStocks: true
    };
    $scope.highchartsNGPie = {
        options: {
            tooltip: {
                pointFormat: '<b>{point.y:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.y:.1f} %'
                    }
                }
            }
        },
        series: [],
        title: {
            text: 'TraffcIN'
        },
        loading: false
    };

});
module.controller('CPUController', function($scope, $timeout, detailsService) {
    $scope.show = function() {
        var c = $scope.mycalendar;
        c.show();
    };
    $scope.highchartsNG.title.text = "Traffic IN";
   $scope.highchartsNGPie.title.text = "Traffic IN";
    $scope.events.onChangeChartType = function(type) {
        if ($scope.highchartsNG) {
            $scope.highchartsNG.options.chart.type = type;
        }
    };
    $scope.events.onChartClick = function(timePoint) {
        //alert("time:"+timePoint);
        console.log("time:" + timePoint);
        var ws_options2 = {};
        ws_options2.mss = $scope.allvars.mss;
        ws_options2.indi = "allcpu";
        ws_options2.from = 'byTime';
        ws_options2.to = timePoint;
        ws_options2.list11 = "all," + $scope.allvars.carteType;
        var rangesigu = detailsService.query(ws_options2);
        rangesigu.$promise.then(showPieFromList);

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
                        var mm = moment(time["atTime"]);
                        data.push([mm.toDate().getTime(), traffic["loadCPU"]]);
                        break;
                    }
                }
            }
            series_line.push({data: data, name: siguname});

        }

        $scope.highchartsNG.series = series_line;

        // display pie chart of the last timepoint 
        // simuler un click sur le dernier point des line charts
        var mm = moment(times[times.length - 1]["atTime"]);
        $scope.events.onChartClick(mm.toDate().getTime());
    };

    var showPieFromList = function(result) {
        // $scope.allvars.selectedCarts contient la liste des modules séléctionnés.
        // result contient le traffic json de tous les modules
        var sigus = result["modules"]; // tous les modules existants de meme type
        var times = result["times"]; // liste des TimePoint = 1 seul
        var last_timeId = times[0].id;
        $scope.allvars.timeForPie = last_timeId;
        var data_pie = [];
        //boucle 1 pour trouvé le total:
        var totalLoadCPU = 0; // somme de tous les modules
        for (var s in sigus) {
            var sigu = sigus[s]; // le sigu 
            var traffics = sigu["liste"];// un seul traffic, celui de temps = temps cliqué
            var traffic = traffics[0];
            if (traffic)
                totalLoadCPU += traffic["loadCPU"];
        }
        for (var s in sigus) {
            var sigu = sigus[s]; // le sigu 
            var traffics = sigu["liste"];// un seul traffic, celui de temps = temps cliqué
            //for (var trafficKey in traffics) {
            //afficher ce module ?
            var siguincluded = false;
            if ($scope.allvars.selectedCarts.length === 0)
                siguincluded = true;
            else
                for (var j = 0; j < $scope.allvars.selectedCarts.length; j++) {
                    if ($scope.allvars.selectedCarts[j] == sigu.moduleid) {
                        siguincluded = true;
                        break;
                    }
                }
            if (siguincluded) {
                var traffic = traffics[0];
                var loadCPU = traffic["loadCPU"] / totalLoadCPU * 100;
                data_pie.push([sigu["modulename"], loadCPU]);
            }
        }
        var series_pie = [{data: data_pie, type: 'pie'}];
        $scope.highchartsNGPie.series = series_pie;


    };
    $scope.generalUpdate = function() {
        $timeout(function() {
            var ws_options = $scope.getSelectedOptions();

            //for the indi
            ws_options.indi = "allcpu";

            var rangesigu = detailsService.query(ws_options);
            if ($scope.allvars.optionsTabs[2]) { // la liste des sigus séléctionnées vient du ws
                rangesigu.$promise.then(function(result) {
                    var sigus = result["modules"];
                    $scope.allvars.selectedCarts = [];
                    for (var i = 0; i < sigus.length; i++)
                        $scope.allvars.selectedCarts.push(sigus[i].moduleid);
                    showFromList2(result);
                });
            }
            rangesigu.$promise.then(showFromList2);


        });
    };

    // affichage des courbes es l'ouverture de la page
    $scope.generalUpdate();
}
);
module.controller('TrafficController', function($scope, $timeout, detailsService) {

    $scope.highchartsNG1 = {
        options: {
            plotOptions: {
                series: {
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function() {
                                var timepoint = this.category;
                                $scope.$apply(function() {
                                    var c = $scope.allvars;
                                    c.selectedPoint = "clicked:" + timepoint;
                                    $scope.onChartClick(timepoint);
                                });
                            }
                        }
                    }
                }
            },
            yAxis: {
                opposite: false
            },
            legend: {
                enabled: true
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
            navigator: {enabled: true},
            chart: {type: 'line'}

        },
        series: [],
        title: {
            text: 'TrafficOUT'
        },
        loading: false,
        useHighStocks: true
    };
    $scope.highchartsNGPie1 = {
        options: {
            tooltip: {
                pointFormat: '<b>{point.y:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.y:.1f} %'
                    }
                }
            }
        },
        series: [],
        title: {
            text: 'TraffcOUT'
        },
        loading: false
    };

    $scope.show = function() {
        var c = $scope.mycalendar;
        c.show();
    };

    $scope.events.onChangeChartType = function(type) {
        if ($scope.highchartsNG) {
            $scope.highchartsNG.options.chart.type = type;
        }
        if ($scope.highchartsNG1) {
            $scope.highchartsNG1.options.chart.type = type;
        }

    };
    $scope.events.onChartClick = function(timePoint) {
        //alert("time:"+timePoint);
        console.log("time:" + timePoint);
        var ws_options2 = {};
        ws_options2.mss = $scope.allvars.mss;
        ws_options2.indi = "traffic";
        ws_options2.from = 'byTime';
        ws_options2.to = timePoint;
        ws_options2.list11 = "all," + $scope.allvars.carteType;
        var rangesigu = detailsService.query(ws_options2);
        rangesigu.$promise.then(showPieFromList);

    };
    var showFromList2 = function(result) {
        $scope.graphs = result;
        var sigus = result["modules"];
        var times = result["times"]; // liste des TimePoint
        var series_line = [];
        var series1_line = [];
        //for each module
        for (var s in sigus) {
            var sigu = sigus[s]; // le sigu 
            var siguname = sigu["modulename"];
            var data = []; // le data de ce sigu, à remplir par la liste des cpus
            var data1 = [];
            var traffics = sigu["liste"];
            for (var trafficKey in traffics) {
                var traffic = traffics[trafficKey];
                // chercher le timepoint
                for (var t in times) {
                    var time = times[t];
                    var timeId = time["id"];

                    if (traffic["dateExec"] == timeId) {
                        var mm = moment(time["atTime"]);
                        data.push([mm.toDate().getTime(), traffic["packetreceived"]]);
                        data1.push([mm.toDate().getTime(), traffic["packetsent"]]);

                        break;
                    }
                }
            }
            // type: $scope.allvars.chartType
            series_line.push({data: data, name: siguname});
            series1_line.push({data: data1, name: siguname});

        }

        $scope.highchartsNG.series = series_line;
        $scope.highchartsNG1.series = series1_line;

        // display pie chart of the last timepoint 
        // simuler un click sur le dernier point des line charts
        var mm = moment(times[times.length - 1]["atTime"]);
        $scope.events.onChartClick(mm.toDate().getTime());
    };

    var showPieFromList = function(result) {
        // $scope.allvars.selectedCarts contient la liste des modules séléctionnés.
        // result contient le traffic json de tous les modules
        var sigus = result["modules"]; // tous les modules existants de meme type
        var times = result["times"]; // liste des TimePoint = 1 seul
        var last_timeId = times[0].id;
        $scope.allvars.timeForPie = last_timeId;
        var data_pie = [];
        var data1_pie = [];
        //boucle 1 pour trouvé le total:
        var totalSent = 0; // somme de tous les modules
        var totalReceived = 0; // somme de tous les modules
        for (var s in sigus) {
            var sigu = sigus[s]; // le sigu 
            var traffics = sigu["liste"];// un seul traffic, celui de temps = temps cliqué
            var traffic = traffics[0];
            if (traffic) {
                totalSent += traffic["packetsent"];
                totalReceived += traffic["packetreceived"];
            }
        }
        for (var s in sigus) {
            var sigu = sigus[s]; // le sigu 
            var traffics = sigu["liste"];// un seul traffic, celui de temps = temps cliqué
            //for (var trafficKey in traffics) {
            //afficher ce module ?
            var siguincluded = false;
            if ($scope.allvars.selectedCarts.length === 0)
                siguincluded = true;
            else
                for (var j = 0; j < $scope.allvars.selectedCarts.length; j++) {
                    if ($scope.allvars.selectedCarts[j] == sigu.moduleid) {
                        siguincluded = true;
                        break;
                    }
                }
            if (siguincluded) {
                var traffic = traffics[0];
                var trafficreceived = traffic["packetreceived"] / totalReceived * 100;
                var trafficsent = traffic["packetsent"] / totalSent * 100;
                data_pie.push([sigu["modulename"], trafficreceived]);
                data1_pie.push([sigu["modulename"], trafficsent]);
            }
        }
        var series_pie = [{data: data_pie, type: 'pie'}];
        var series1_pie = [{data: data1_pie, type: 'pie'}];
        $scope.highchartsNGPie.series = series_pie;
        $scope.highchartsNGPie1.series = series1_pie;


    };
    $scope.generalUpdate = function() {
        $timeout(function() {
            var ws_options = $scope.getSelectedOptions();

            //for the indi
            ws_options.indi = "traffic";

            var rangesigu = detailsService.query(ws_options);
            if ($scope.allvars.optionsTabs[2]) { // la liste des sigus séléctionnées vient du ws
                rangesigu.$promise.then(function(result) {
                    var sigus = result["modules"];
                    $scope.allvars.selectedCarts = [];
                    for (var i = 0; i < sigus.length; i++)
                        $scope.allvars.selectedCarts.push(sigus[i].moduleid);
                    showFromList2(result);
                });
            }
            rangesigu.$promise.then(showFromList2);


        });
    };

    // affichage des courbes es l'ouverture de la page
    $scope.generalUpdate();
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
    $scope.onChartClick = function(timePoint) {
        //alert("time:"+timePoint);
        console.log("time:" + timePoint);
        var ws_options2 = {};
        ws_options2.mss = $scope.allvars.mss;
        ws_options2.indi = "bp";
        ws_options2.from = 'byTime';
        ws_options2.to = timePoint;
        ws_options2.list11 = "all," + $scope.allvars.carteType;
        var rangesigu = detailsService.query(ws_options2);
        rangesigu.$promise.then(showPieFromList);

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
                        var mm = moment(time["atTime"]);
                        var dd = mm.toDate().getTime();
                        data.push([mm.toDate().getTime(), traffic["somme"]]);
                        break;
                    }
                }
            }
            series_line.push({data: data, name: siguname, type: $scope.allvars.chartType});
        }


        $scope.highchartsNG = {
            options: {
                plotOptions: {
                    series: {
                        cursor: 'pointer',
                        point: {
                            events: {
                                click: function() {
                                    var timepoint = this.category;
                                    $scope.$apply(function() {
                                        var c = $scope.allvars;
                                        c.selectedPoint = "clicked:" + timepoint;
                                        $scope.onChartClick(timepoint);
                                    });
                                }
                            }
                        }
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
                text: 'TrafficIN'
            },
            loading: false,
            useHighStocks: true
        };
    };

    var showPieFromList = function(result) {
        // $scope.allvars.selectedCarts contient la liste des modules séléctionnés.
        // result contient le traffic json de tous les modules
        var sigus = result["modules"]; // tous les modules existants de meme type
        var times = result["times"]; // liste des TimePoint = 1 seul
        var last_timeId = times[0].id;
        $scope.allvars.timeForPie = last_timeId;
        var data_pie = [];
        //boucle 1 pour trouver le total:
        var totalSent = 0; // somme de tous les modules
        // var totalReceived = 0; // somme de tous les modules
        for (var s in sigus) {
            var sigu = sigus[s]; // le sigu 
            var traffics = sigu["liste"];// un seul traffic, celui de temps = temps cliqué
            var traffic = traffics[0];
            totalSent += traffic["somme"];
            // totalReceived += traffic["packetreceived"];
        }
        for (var s in sigus) {
            var sigu = sigus[s]; // le sigu 
            var traffics = sigu["liste"];// un seul traffic, celui de temps = temps cliqué
            //for (var trafficKey in traffics) {
            //afficher ce module ?
            var siguincluded = false;
            if ($scope.allvars.selectedCarts.length === 0)
                siguincluded = true;
            else
                for (var j = 0; j < $scope.allvars.selectedCarts.length; j++) {
                    if ($scope.allvars.selectedCarts[j] == sigu.moduleid) {
                        siguincluded = true;
                        break;
                    }
                }
            if (siguincluded) {
                var traffic = traffics[0];
                // var trafficreceived = traffic["packetreceived"] / totalReceived * 100;
                var trafficsent = traffic["somme"] / totalSent * 100;
                data_pie.push([sigu["modulename"], trafficsent]);
                // data1_pie.push([sigu["modulename"], trafficsent]);
            }
            //    break;
            //}
        }
        var series_pie = [{data: data_pie, type: 'pie'}];
        // var series1_pie = [{data: data1_pie, type: 'pie'}];
        $scope.highchartsNGPie = {
            options: {
                tooltip: {
                    pointFormat: '<b>{point.y:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.y:.1f} %'
                        }
                    }
                }
            },
            series: series_pie,
            title: {
                text: 'BandWidth'
            },
            loading: false
        };
    };
    $scope.generalUpdate = function() {
        $timeout(function() {
            var ws_options = $scope.getSelectedOptions();

            //for the indi
            ws_options.indi = "bp";

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

module.controller('ModalInstanceCtrl', function($scope, $location, $modalInstance, login, authentification) {

    $scope.allvars = {};
    $scope.selected = {
    };
    
   
    $scope.redirect = function(path){
      /*  if(($scope.allvars.user === authentif.username) && ($scope.allvars.pwd === authentif.password))
       $location.path(path);
       else 
       alert("Please check your details");*/
        var authentification = $scope.allvars.user +","+$scope.allvars.pwd+",";
        var authentif = authentification.$promise.query({authentification: authentification});
         alert(authentif);
         
          $location.path(path);
    };

    $scope.submit = function() {
        var list = "";
        list = list + $scope.allvars.ip + "," + $scope.allvars.log + "," + $scope.allvars.pw;
        $scope.log = login.query({username: list});
        //alert(list);
        $modalInstance.close(0);
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
});
//tabsCtrl
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
        for (var msskey = 0; msskey < allmss.length; msskey++) {
            var thismss = allmss[msskey];
            $scope.mainvars.tabs.push({heading: thismss.login, route: thismss.log, active: false});
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
