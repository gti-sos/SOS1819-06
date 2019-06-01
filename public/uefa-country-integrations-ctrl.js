angular
    .module("ManagerApp")
    .controller("uefa-country-integrations-ctrl", ["$scope", "$http", function($scope, $http) {
        console.log("Integrations Controller initialized");

        /////////////////////APIs Compañeros SOS/////////////////////
        ///API Companies
        $http.get("https://sos1819-03.herokuapp.com/api/v1/companies/").then(function(response) {
            $http.get("https://sos1819-06.herokuapp.com/api/v1/uefa-country-rankings").then(function(response2) {
                var coun;
                var countries = [];
                var companies = [];
                var points = [];
                var googleChartData = [
                    ["Country", "Companies", "Uefa Points"]
                ];
                for (var i in response.data) {
                    for (var j in response2.data) {
                        if ((response.data[i].country == response2.data[j].country) && !countries.includes(response.data[i].country) && !countries.includes(response2.data[j].country)) {
                            coun = response.data[i].country;
                            countries.push(coun);
                            if (coun == "England" || coun == "Scotland" || coun == "Wales" || coun == "Northern Ireland") {
                                coun = "United Kingdom";
                            }
                            companies = response.data[i].numberOfCompanies;
                            points = response2.data[j].points;
                            googleChartData.push([coun, companies, points]);
                        }

                    }

                }
                google.charts.load("current", { packages: ["corechart"] });
                google.charts.setOnLoadCallback(drawChart);
                console.log(googleChartData);

                function drawChart() {
                    var data = google.visualization.arrayToDataTable(googleChartData);

                    var options = {
                        title: 'Uefa Points and Companies',
                        legend: { position: 'none' },
                    };

                    var chart = new google.visualization.Histogram(document.getElementById('companies'));
                    chart.draw(data, options);
                }
            });
        });


        //API Suicide-rates
        $http.get("https://sos1819-04.herokuapp.com/api/v1/suicide-rates").then(function(response) {
            $scope.SOS2s = response.data;
        });

        ///API expenses-of-countries-in-education-and-culture
        $http.get("https://sos1819-08.herokuapp.com/api/v1/expenses-of-countries-in-education-and-culture").then(function(response) {
            $scope.SOS3s = response.data;
        });

        ///API scorers-stats & uefa country
        $http.get("https://sos1819-02.herokuapp.com/api/v1/scorers-stats").then(function(response) {
            $http.get("https://sos1819-06.herokuapp.com/api/v1/uefa-country-rankings").then(function(response2) {
                var datosSU=[];
                for (var i in response2.data) {
                    var datoSU = {
                        name: "Scorers: " + response.data.map(function(d) { return d["name"]})[i],
                        data: response.data.map(function(d) { return d["scorergoal"]})[i]
                    };
                    datosSU.push(datoSU);
                }
                
                for (var i in response2.data) {
                    var datoSU1 = {
                        name: "Uefa Country: " + response2.data.map(function(d) { return d["country"]+" "+d["season"]})[i],
                        data: response2.data.map(function(d) { return d["points"] })[i]
                    };
                    datosSU.push(datoSU1);
                }

                var chartSC = new Taucharts.Chart({
                       data: datosSU,
                       type: 'scatterplot',
                        x: 'name',
                        y: 'data',
                        color: 'name',
                        size: 'data',
                        plugins: [Taucharts.api.plugins.get('tooltip')(), Taucharts.api.plugins.get('legend')()]
                    });
                    chartSC.renderTo('#scorers');
            });
        });

        ///API Elements
        //$http.get("https://sos1819-14.herokuapp.com/api/v1/elements").then(function(response) {
        //    $scope.SOS5s = response.data;
        // });

        //API Uefa-club Integraction
        $http.get("https://sos1819-06.herokuapp.com/api/v1/uefa-club-rankings").then(function(responseClub) {
            $http.get("https://sos1819-06.herokuapp.com/api/v1/uefa-country-rankings").then(function(responseCountry) {
                var datos = [];

                for (var i in responseClub.data) {
                    var dato = {
                        name: "Uefa Club: " + responseClub.data.map(function(d) { return d["team"] + " " + d["season"] })[i],
                        y: responseClub.data.map(function(d) { return d["points"] })[i]
                    };
                    datos.push(dato);
                }

                for (var i in responseCountry.data) {
                    var dato1 = {
                        name: "Uefa Country: " + responseCountry.data.map(function(d) { return d["country"] + " " + d["season"] })[i],
                        y: responseCountry.data.map(function(d) { return d["points"] })[i]
                    };
                    datos.push(dato1);
                }
                console.log(datos)

                Highcharts.chart('clubRanking', {
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: 0,
                        plotShadow: false
                    },
                    title: {
                        text: '<br>Points<br>',
                        align: 'center',
                        verticalAlign: 'middle',
                        y: 40
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.y}</b>'
                    },
                    plotOptions: {
                        pie: {
                            dataLabels: {
                                enabled: true,
                                distance: -50,
                                style: {
                                    fontWeight: 'bold',
                                    color: 'white'
                                }
                            },
                            startAngle: -90,
                            endAngle: 90,
                            center: ['50%', '75%'],
                            size: '110%'
                        }
                    },
                    series: [{
                        type: 'pie',
                        name: 'Points',
                        innerSize: '50%',
                        data: datos
                    }]
                });

            });
        });

        ///API e-car-statics
        $http.get("https://sos1819-10.herokuapp.com/api/v1/e-car-statics").then(function(response) {
            $scope.SOS7s = response.data;
        });


        ///API populationstats
        $http.get("https://sos1819-09.herokuapp.com/api/v1/populationstats").then(function(response) {
            $scope.SOS8s = response.data;
        });

        /////////////////////APIs Externas/////////////////////
        //API EXTERNA 1
        var datos2 = [];
        $http.get("https://restcountries.eu/rest/v2/region/europe").then(function(response) {
            $http.get("https://sos1819-06.herokuapp.com/api/v1/uefa-country-rankings").then(function(responseCountry) {
                for (var i in responseCountry.data) {

                    var dato2 = {
                        y: response.data[i].population,
                        label: response.data[i].name
                    };
                    datos2.push(dato2);
                }
                for (var i in responseCountry.data) {
                    var dato1 = {
                        y: responseCountry.data.map(function(d) { return d["points"] })[i],
                        label: "Uefa Country: " + responseCountry.data.map(function(d) { return d["country"] + " " + d["season"] })[i]
                    };
                    datos2.push(dato1);
                }
                console.log(datos2);

                var chart = new CanvasJS.Chart("externa1", {
                    animationEnabled: true,
                    exportEnabled: true,
                    theme: "light1",
                    title: {
                        text: "Uefa Points and Europe Population"
                    },
                    data: [{
                        type: "pyramid",
                        yValueFormatString: "#\"\"",
                        indexLabelFontColor: "black",
                        indexLabelFontSize: 10,
                        indexLabel: "{label} - {y}",
                        dataPoints: datos2
                    }]
                });
                chart.render();


            });
        });


        //API externa 2
        var datos3 = [];
        $http.get("https://api.discogs.com/artists/1/releases").then(function(response) {
            $http.get("https://sos1819-06.herokuapp.com/api/v1/uefa-country-rankings").then(function(responseCountry) {
                for (var i in responseCountry.data) {

                    var dato3 = {
                        name: "Uefa Country: " + responseCountry.data.map(function(d) { return d["country"] + " " + d["season"] })[i],
                        y: responseCountry.data.map(function(d) { return d["points"] })[i]
                    };
                    datos3.push(dato3);
                }
                for (var i in responseCountry.data) {

                    var dato4 = {
                        name: response.data.releases[i].title,
                        y: response.data.releases[i].id
                    };
                    datos3.push(dato4);
                }
                console.log(datos3);

                Highcharts.chart('externa2', {
                    chart: {
                        type: 'waterfall'
                    },

                    title: {
                        text: 'Uefa Country Points and Artist Title Id'
                    },

                    xAxis: {
                        type: 'category'
                    },

                    yAxis: {
                        title: {
                            text: 'Points and IDs'
                        }
                    },

                    legend: {
                        enabled: false
                    },

                    tooltip: {
                        pointFormat: '<b>{point.y}</b>'
                    },

                    series: [{
                        upColor: Highcharts.getOptions().colors[2],
                        color: Highcharts.getOptions().colors[3],
                        data: datos3,
                        dataLabels: {
                            enabled: true,
                            formatter: function() {
                                return Highcharts.numberFormat(this.y / 1000, 0, ',') + 'k';
                            },
                            style: {
                                fontWeight: 'bold'
                            }
                        },
                        pointPadding: 0
                    }]
                });


            });
        });
    }]);
