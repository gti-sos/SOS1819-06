angular
    .module("ManagerApp")
    .controller("UefaClubAnalytics-ctrl", ["$scope", "$http", function($scope, $http) {
        console.log("Analytics Controller initialized");
        $http.get("/api/v1/uefa-club-rankings").then(function(response) {
        Highcharts.chart('uefaclubanalytics', {

            title: {
                text: 'Uefa Clubs Ranking by poitns, 2016-2018'
            },

            subtitle: {
                text: 'Source: uefa.com'
            },

            yAxis: {
                title: {
                    text: 'Points'
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },

            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointStart: 2016
                }
            },

            series: [{
                name: 'Madrid',
                data: response.data.map(function(d) { return d["points"] })
            }, {
                name: 'Bayern',
                data: response.data.map(function(d) { return d["points"] })
            }, {
                name: 'Juventus',
                data: response.data.map(function(d) { return d["points"] })
            }],

            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }

        });
        });
    }]);
