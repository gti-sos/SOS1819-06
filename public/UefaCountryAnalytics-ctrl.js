/*global angular*/
/*global Highcharts*/
/*global google*/
/*global uv*/
//E
angular
    .module("ManagerApp")
    .controller("UefaCountryAnalytics-ctrl", ["$scope", "$http", function($scope, $http) {
//F
        console.log("main Controller initialized");

        var API = "/api/v1/uefa-country-rankings";
        console.log("Requesting uefa country ranking to <" + API + ">...");
        $http.get(API).then(function(response) {
            console.log("Data Received:" + JSON.stringify(response.data, null, 2));
//G
            var datos = [];

            for (var i in response.data) {
                var dato = {
                    name: response.data.map(function(d) { return d["country"] })[i] + " " + response.data.map(function(d) { return d["season"] })[i],
                    y: response.data.map(function(d) { return d["points"] })[i]
                };
                datos.push(dato);
            }

            Highcharts.chart('analyticsCountry', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'Uefa Country Points'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.y}</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>',
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        }
                    }
                },
                series: [{
                    name: 'Points',
                    colorByPoint: true,
                    data: datos
                }]

            });

            //GOOGLE CHARTS
            var coun;
            var teams = [];
            var googleChartData = [
                ["Country", "Teams"]
            ];
            for (var i in response.data) {

                coun = response.data[i].country;
                if (coun == "England" || coun == "Scotland" || coun == "Wales" || coun == "Northern Ireland") {
                    coun = "United Kingdom";
                }
                teams = response.data[i].teams;
                googleChartData.push([coun, teams]);
            }
            console.log(googleChartData);
            google.charts.load('current', {
                'packages': ['geochart'],
                // Note: you will need to get a mapsApiKey for your project.
                // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
                'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
            });
            google.charts.setOnLoadCallback(drawRegionsMap);

//H

            function drawRegionsMap() {
                var data = google.visualization.arrayToDataTable(googleChartData);
//I
                var options = { region: 150 };

                var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

                chart.draw(data, options);
            }


            //TauChart
            var datos1 = [];

            for (var i in response.data) {
                var dato1 = {
                    country: response.data.map(function(d) { return d["country"] })[i] + " " + response.data.map(function(d) { return d["season"] })[i],
                    points: response.data.map(function(d) { return d["points"] })[i]
                };
                datos1.push(dato1);
            }
            
            var datasource = datos1;

            var chart = new Taucharts.Chart({
                
                data: datasource,
                type: 'bar',
                x: 'country',
                y: 'points',
                color: 'type' // there will be two lines with different colors on the chart
            });

            chart.renderTo('#bar');
//J

        });
//K

    }]);
//L