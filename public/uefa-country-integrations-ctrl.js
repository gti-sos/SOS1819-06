angular
    .module("ManagerApp")
    .controller("uefa-country-integrations-ctrl", ["$scope", "$http", function($scope, $http) {
        console.log("Integrations Controller initialized");

        /////////////////////APIs Compañeros SOS/////////////////////
        ///API Companies
        $http.get("https://sos1819-03.herokuapp.com/api/v1/companies/").then(function(response) {
            $scope.SOS1s = response.data;
        });


        //API Suicide-rates
        $http.get("https://sos1819-04.herokuapp.com/api/v1/suicide-rates").then(function(response) {
            $scope.SOS2s = response.data;
        });

        ///API expenses-of-countries-in-education-and-culture
        $http.get("https://sos1819-08.herokuapp.com/api/v1/expenses-of-countries-in-education-and-culture").then(function(response) {
            $scope.SOS3s = response.data;
        });

        ///API scorers-stats
        $http.get("https://sos1819-02.herokuapp.com/api/v1/scorers-stats").then(function(response) {
            $scope.SOS4s = response.data;
        });

        ///API Elements
        //$http.get("https://sos1819-14.herokuapp.com/api/v1/scorers-stats").then(function(response) {
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
                for (var i = 0; i < 5; i++) {

                    var dato2 = {
                        country: response.data[i].name,
                        PopulationOrPoints: response.data[i].population
                    };
                    datos2.push(dato2);
                }
                for (var i in responseCountry.data) {
                    var dato1 = {
                        country: "Uefa Country: " + responseCountry.data.map(function(d) { return d["country"] + " " + d["season"] })[i],
                        PopulationOrPoints: responseCountry.data.map(function(d) { return d["points"] })[i]
                    };
                    datos2.push(dato1);
                }
                console.log(datos2);

                var chart = new Taucharts.Chart({
                    data: datos2,
                    type: 'scatterplot',
                    x: 'country',
                    y: 'PopulationOrPoints',
                    color: 'country',
                    size: 'PopulationOrPoints',
                    plugins: [Taucharts.api.plugins.get('tooltip')(), Taucharts.api.plugins.get('legend')()]
                });
                chart.renderTo('#externa1');


            });
        });


        //API externa 2
        var goals = {
            method: 'GET',
            url: "https://montanaflynn-fifa-world-cup.p.mashape.com/goals",
            headers: {
                "X-Mashape-Key": "0uC0eKCfqkmsh8caooJtABP2PuXVp1Vxp36jsnZXumtItm27QN",
                "Accept": "application/json"
            }
        };
        $http(goals).then(function(responseGoals) {
            $http.get("/api/v1/uefa-club-rankings").then(function(responseUefa) {
                var ejex = [];
                for (var i in responseUefa.data) {
                    ejex.push(responseUefa.data.map(function(d) { return d["team"] })[i] + " " + responseUefa.data.map(function(d) { return d["season"] })[i]);
                }
                var Integration2 = {
                    "type": "area",
                    "legend": {
                        "toggle-action": "hide",
                        "header": {
                            "text": "Legend Header"
                        },
                        "item": {
                            "cursor": "pointer"
                        },
                        "draggable": true,
                        "drag-handler": "icon"
                    },
                    "scale-x": {
                        "values": ejex,
                    },
                    "series": [{
                            "values": [responseGoals.data[0].minute,
                                responseGoals.data[1].minute,
                                responseGoals.data[2].minute,
                                responseGoals.data[3].minute,
                                responseGoals.data[4].minute,
                                responseGoals.data[5].minute,
                                responseGoals.data[6].minute,
                                responseGoals.data[7].minute,
                                responseGoals.data[8].minute
                            ],
                            "text": "Minutos"
                        },
                        {
                            "values": [responseGoals.data[0].team_id,
                                responseGoals.data[1].team_id,
                                responseGoals.data[2].team_id,
                                responseGoals.data[3].team_id,
                                responseGoals.data[4].team_id,
                                responseGoals.data[5].team_id,
                                responseGoals.data[6].team_id,
                                responseGoals.data[7].team_id,
                                responseGoals.data[8].team_id
                            ],
                            "text": "Team id"
                        },
                        {
                            "values": [
                                responseUefa.data[0].points / 1000,
                                responseUefa.data[1].points / 1000,
                                responseUefa.data[2].points / 1000,
                                responseUefa.data[3].points / 1000,
                                responseUefa.data[4].points / 1000,
                                responseUefa.data[5].points / 1000,
                                responseUefa.data[6].points / 1000,
                                responseUefa.data[7].points / 1000,
                                responseUefa.data[8].points / 1000,
                            ],
                            "text": "Puntos/1000"
                        }
                    ]
                };
                zingchart.render({
                    id: "ExternalIntegration2",
                    data: Integration2,
                    height: "480",
                    width: "100%"
                });
            });
        });
    }]);
