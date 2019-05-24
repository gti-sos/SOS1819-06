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
                    categories: response.data.map(function(d) { return d["team"] + " " + d["season"] }),
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
                    var paises = response.data.map(function(d) { return d["country"] });
                    var fichajes = response.data.map(function(d) { return d["numberofsignings"] });
                    
                    var a = [];
                    a.push(['Country', 'Signed Players']);
                    for (var i = 0; i < paises.length; i++) {
                        a.push([paises[i], fichajes[i]]);
                    }
                    
                    var data = google.visualization.arrayToDataTable(a);
                    
                    var options = {region: 150};
            
                    var chart = new google.visualization.GeoChart(document.getElementById('transfermap'));
            
                    chart.draw(data, options);
                  }            
                    });
    }]);
