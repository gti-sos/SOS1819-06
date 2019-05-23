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
                xAxis: {
                    categories: response.data.map(function(d) { return d["team"]+d["season"] }),
                    title: {
                        text: null
                    }
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

                series: [{
                    name: 'Madrid',
                    data: response.data.filter(function(d) { return d["team"] == "Madrid" }).map(function(d) { return d["points"] })
                }, {
                    name: 'Bayern',
                    data: response.data.filter(function(d) { return d["team"] == "Bayern" }).map(function(d) { return d["points"] })
                }, {
                    name: 'Juventus',
                    data: response.data.filter(function(d) { return d["team"] == "Juventus" }).map(function(d) { return d["points"] })
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

        $http.get("/api/v1/uefa-club-rankings").then(function(response2) {

            var coun;
            var points = [];
            var googleChartData = [
                ["Region", "Points"]
            ];
            for (var i = 0; i < response2.data.length; i++) {
                if(response2.data[i].season==2018){
                coun = response2.data[i].country;
                points = response2.data[i].points;
                googleChartData.push([coun, points]);
            }}
            console.log(googleChartData);


            google.charts.load('current', {
                'packages': ['geochart'],
                'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
            });
            google.charts.setOnLoadCallback(drawRegionsMap);


            function drawRegionsMap() {
                var data = google.visualization.arrayToDataTable(googleChartData);

                var options = {
                    colorAxis: {
                        minValue: 0,
                        maxValue: 10
                    }
                };
                var chart = new google.visualization.GeoChart(document.getElementById('uefaclubmap'));

                chart.draw(data, options);
            }
        });
    }]);
