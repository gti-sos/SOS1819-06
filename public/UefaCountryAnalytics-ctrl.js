/*global angular*/
/*global Highcharts*/
/*global google*/
/*global uv*/
angular
    .module("ManagerApp")
    .controller("UefaCountryAnalytics-ctrl", ["$scope", "$http", function($scope, $http) {

        console.log("main Controller initialized");

        var API = "/api/v1/uefa-country-rankings";
        console.log("Requesting uefa country ranking to <" + API + ">...");
        $http.get(API).then(function(response) {
            console.log("Data Received:" + JSON.stringify(response.data, null, 2));

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
        var tabla=[];
      
        for (var i in response.data) {
                var dataChart=" [ "+'"'+response.data.map(function(d) { return d["country"] })[i]+'"'+","+
                response.data.map(function(d) { return d["teams"] })[i]+" ] ";
                tabla.replace('" ',"");
                tabla.replace('" ',"");
                 console.log(dataChart);   
                tabla.push(dataChart);
            }
              console.log(tabla);   
              google.charts.load('current', {
        'packages':['geochart'],
        // Note: you will need to get a mapsApiKey for your project.
        // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
        'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
      });
      google.charts.setOnLoadCallback(drawRegionsMap);
      
      

      function drawRegionsMap() {
        var data = google.visualization.arrayToDataTable(tabla);

        var options = {};

        var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

        chart.draw(data, options);
      }
            

        });
        
        
        
        

    }]);
