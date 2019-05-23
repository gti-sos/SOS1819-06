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
        categories: ['Juventus', 'Oporto', 'Inter', 'Milan', 'Atleti', 'Chelsea', 'Madrid', 'Barcelona', 'PSG'],
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
        data: [261, 270, 240,  122, 244, 210, 115, 340, 422]
    }, {
        name: 'Dinero Ingresado',
        data: [109, 24, 163, 188, 182, 54, 98, 162, 273]
    }]
});        });
    }]);
