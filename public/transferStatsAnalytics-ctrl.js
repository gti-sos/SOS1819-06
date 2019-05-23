angular
    .module("ManagerApp")
    .controller("transferStatsAnalytics-ctrl", ["$scope", "$http", function($scope, $http) {
        console.log("Transfer Stats Analytics Controller initialized");
        $http.get("/api/v1/transfer-stats").then(function(response) {
        
            Highcharts.chart('transferstatsanalytics', {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'Transfer Stats Analytics'
                },
                subtitle: {
                    text: 'Source: <a href="https://www.transfermarkt.es/transfers/einnahmenausgaben/statistik/a/ids/a/sa//saison_id/2018/saison_id_bis/2018/land_id/0/nat/0/pos//w_s//intern/0/plus/1">Transfermarkt.com</a>'
                },
                xAxis: {
                    categories: response.data.map(function(d) { return d["team"] }),
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
                    data: response.data.map(function(d) { return d["moneyspent"] })
                }, {
                    name: 'Dinero Ingresado',
                    data: response.data.map(function(d) { return d["moneyentered"] })
                }]
            }); 
            
                  google.charts.load('current', {
                    'packages':['geochart'],
                    // Note: you will need to get a mapsApiKey for your project.
                    // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
                    'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
                  });
                  google.charts.setOnLoadCallback(drawRegionsMap);
            
                  function drawRegionsMap() {
                    var paises = response.data.map(function(d) { return d["country"] })
                    var fichajes = response.data.map(function(d) { return d["numberofsignings"] })
                    
                    var data = google.visualization.arrayToDataTable([
                      ['Country', 'Signed Players'],
                      [paises[0], fichajes[0]],
                      [paises[1], fichajes[1]],
                      [paises[2], fichajes[2]],
                      [paises[3], fichajes[3]],
                      [paises[4], fichajes[4]],
                      [paises[5], fichajes[5]],
                      [paises[6], fichajes[6]],
                      [paises[7], fichajes[7]],
                      [paises[8], fichajes[8]],
                      [paises[9], fichajes[9]],
                    ]);
                    
                    var options = {region: 150};
            
                    var chart = new google.visualization.GeoChart(document.getElementById('transfermap'));
            
                    chart.draw(data, options);
                  }            
                    });
    }]);
