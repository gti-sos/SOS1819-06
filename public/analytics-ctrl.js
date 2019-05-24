angular
    .module("ManagerApp")
    .controller("groupAnalytics-ctrl", ["$scope", "$http", function($scope, $http) {
        console.log("Group Analytics Controller initialized");
        $http.get("/api/v1/uefa-club-rankings").then(function(responseClub) {
          $http.get("/api/v1/uefa-country-rankings").then(function(responseCountry) {
            $http.get("/api/v1/transfer-stats").then(function(responseTransfer) {
        
            Highcharts.chart('groupal', {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'Group Analytics'
                },
                xAxis: {
                    categories: responseClub.data.map(function(d) { return d["team"] + " " + d["season"] }),
                    title: {
                        text: null
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Money (millions)',
                        align: 'high'
                    },
                    labels: {
                        overflow: 'justify'
                    }
                },
                tooltip: {
                    valueSuffix: ' millions'
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    x: -40,
                    y: 80,
                    floating: true,
                    borderWidth: 1,
                    backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                    shadow: true
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: 'Dinero Gastado',
                    data: responseClub.data.map(function(d) { return d["moneyspent"] })
                }, {
                    name: 'Dinero Ingresado',
                    data: responseClub.data.map(function(d) { return d["moneyentered"] })
                }]
            });
            });
          });
        });
        }]);
