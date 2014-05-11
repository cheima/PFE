'use strict';


/* Directives */



angular.module('myApp.directives', [])
        .
        directive('appVersion', ['version',
            function(version)
            {
                return function($scope, elm, attrs) {
                    elm.text(version);
                };
            }
        ])

        .directive('gChart1', function() {

            return {
                restrict: 'A',
                link: function($scope, elm, attrs)
                {
                    $scope.$watch('chart1', function() {

                        var type = $scope.chart1.type;
                        var chart = " ";
                        if (type == "1") {
                            chart = new google.visualization.LineChart(elm[0]);
                        }
                        else if (type == "2") {
                            chart = new google.visualization.BarChart(elm[0]);
                        }
                        else if (type == "3") {
                            chart = new google.visualization.ColumnChart(elm[0]);
                        }
                        else if (type == "4") {
                            chart = new google.visualization.PieChart(elm[0]);
                        }

                        chart.draw($scope.chart1.data, $scope.chart1.options);
                    }, true);
                }
            }
        }).directive('gChart', function() {

    return {
        restrict: 'A',
        link: function($scope, elm, attrs)
        {
            $scope.$watch('chart', function() {

                var type = $scope.chart.type;
                var chart = " ";
                if (type == "1") {
                    chart = new google.visualization.LineChart(elm[0]);
                }
                else if (type == "2") {
                    chart = new google.visualization.BarChart(elm[0]);
                }
                else if (type == "3") {
                    chart = new google.visualization.ColumnChart(elm[0]);
                }
                else if (type == "4") {
                    chart = new google.visualization.PieChart(elm[0]);
                }

                chart.draw($scope.chart.data, $scope.chart.options);
            }, true);
        }
    }
}).directive('gChart2', function() {

    return {
        restrict: 'A',
        link: function($scope, elm, attrs)
        {
            $scope.$watch('chart2', function() {

                var type = $scope.chart2.type;
                var chart = " ";
                if (type == "1") {
                    chart = new google.visualization.LineChart(elm[0]);
                }
                else if (type == "2") {
                    chart = new google.visualization.BarChart(elm[0]);
                }
                else if (type == "3") {
                    chart = new google.visualization.ColumnChart(elm[0]);
                }
                else if (type == "4") {
                    chart = new google.visualization.PieChart(elm[0]);
                }

                chart.draw($scope.chart2.data, $scope.chart2.options);
            }, true);
        }
    }
}).directive('gChart3', function() {

    return {
        restrict: 'A',
        link: function($scope, elm, attrs)
        {
            $scope.$watch('chart3', function() {

                var type = $scope.chart3.type;
                var chart = " ";
                if (type == "1") {
                    chart = new google.visualization.LineChart(elm[0]);
                }
                else if (type == "2") {
                    chart = new google.visualization.BarChart(elm[0]);
                }
                else if (type == "3") {
                    chart = new google.visualization.ColumnChart(elm[0]);
                }
                else if (type == "4") {
                    chart = new google.visualization.PieChart(elm[0]);
                }

                chart.draw($scope.chart3.data, $scope.chart3.options);
            }, true);
        }
    }
});


