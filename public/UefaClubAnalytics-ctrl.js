angular
    .module("ManagerApp")
    .controller("UefaClubAnalytics-ctrl", ["$scope", "$http", function($scope, $http) {
        console.log("Analytics Controller initialized");
        $http.get("/api/v1/uefa-club-rankings").then(function(response) {
            var chart = new Highcharts.Chart({
                chart: {
                    renderTo: 'uefaClubAnalytic',
                    type: 'column',
                    options3d: {
                        enabled: true,
                        alpha: 15,
                        beta: 15,
                        depth: 50,
                        viewDistance: 25
                    }
                },
                title: {
                    text: 'Uefa Club Rankings'
                },
                xAxis: {
                    categories: response.data.map(function(d) { return d["team"] + " " + d["season"] })
                },
                yAxis: {
                    title: { text: null }
                },

                subtitle: {
                    text: 'Source: uefa.com'
                },
                plotOptions: {
                    column: {
                        depth: 25
                    }
                },
                series: [{
                    name: "Puntos",
                    data: response.data.map(function(d) { return d["points"] })
                }]
            });

            function showValues() {
                $('#alpha-value').html(chart.options.chart.options3d.alpha);
                $('#beta-value').html(chart.options.chart.options3d.beta);
                $('#depth-value').html(chart.options.chart.options3d.depth);
            }

            // Activate the sliders
            $('#sliders input').on('input change', function() {
                chart.options.chart.options3d[this.id] = parseFloat(this.value);
                showValues();
                chart.redraw(false);
            });

            showValues();
        });

        ////////////////////////////////////////////////////////////////////////////////
        $http.get("/api/v1/uefa-club-rankings").then(function(response2) {

            var coun;
            var points = [];
            var googleChartData = [
                ["Region", "Points"]
            ];
            for (var i = 0; i < response2.data.length; i++) {
                if (response2.data[i].season == 2018) {
                    coun = response2.data[i].country;
                    points = response2.data[i].points;
                    googleChartData.push([coun, points]);
                }
            }
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
                    },
                    region: 150
                };
                var chart = new google.visualization.GeoChart(document.getElementById('uefaclubmap'));
                chart.draw(data, options);
            }
        });

        ////////////////////////////////////////////////////////////////////////////////

        $http.get("/api/v1/uefa-club-rankings").then(function(response) {
            var datos = [];
            for (var i in response.data) {
                var dato = {
                    y: response.data.map(function(d) { return d["team"] })[i] + " " + response.data.map(function(d) { return d["season"] })[i],
                    a: response.data.map(function(d) { return d["points"] })[i]
                };
                datos.push(dato);
            }
            console.log(datos);

            new Morris.Bar({
                element: 'morris',

                data: datos,
                xkey: 'y',
                ykeys: ['a'],
                labels: ['Series A', 'Series B']
            });
        });
        
    }]);
