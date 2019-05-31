angular
    .module("ManagerApp")
    .controller("integrations-uefa-club-ctrl", ["$scope", "$http", function($scope, $http) {
        console.log("Integrations Controller initialized");

        /////////////////////APIs Compañeros SOS/////////////////////
        ///API Country Stats
        $http.get("https://sos1819-06.herokuapp.com/api/v1/uefa-country-rankings/").then(function(response) {
            $scope.SOS1s = response.data;
        });


        //API Biofuels-production
        $http.get("https://sos1819-10.herokuapp.com/api/v2/biofuels-production").then(function(response) {
            $scope.SOS2s = response.data;
        });


        //API Transfer-stats
        $http.get("/api/v1/uefa-club-rankings").then(function(responseClub) {
            $http.get("/api/v1/transfer-stats").then(function(responseTransfer) {
                var response = [];
                var dataAll = [];
                for (var i in responseClub.data) {
                    response.push("Uefa Club: " + responseClub.data.map(function(d) { return d["team"] + " " + d["season"] })[i]);
                    dataAll.push(responseClub.data.map(function(d) { return d["points"] })[i]);
                }
                for (var i in responseTransfer.data) {
                    response.push("Transfer-stats: " + responseTransfer.data.map(function(d) { return d["team"] + " " + d["season"] })[i])
                    dataAll.push(responseTransfer.data.map(function(d) { return d["moneyspent"] })[i]);
                }
                console.log(response)
                console.log(dataAll)
                var chart = new Highcharts.Chart({
                    chart: {
                        renderTo: 'transferStats',
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
                        text: 'Transfer Stats y Uefa Club Rankings'
                    },
                    xAxis: {
                        categories: response
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
                        name: "Points and money spent",
                        data: dataAll
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
        });


        ///API Beer-consumed-stats
        $http.get("https://sos1819-04.herokuapp.com/api/v1/beer-consumed-stats").then(function(response) {
            $scope.SOS4s = response.data;
        });
        
        
        ///API Beer-consumed-stats
        $http.get("https://sos1819-02.herokuapp.com/api/v1/companies-stats/").then(function(response) {
            $scope.SOS5s = response.data;
        });
        
        
        ///API Beer-consumed-stats
        $http.get("https://sos1819-14.herokuapp.com/api/v1/deceaseds").then(function(response) {
            $scope.SOS6s = response.data;
        });
        
        
        ///API public-expenditure-education
        $http.get("https://sos1819-11.herokuapp.com/api/v2/public-expenditure-educations").then(function(response) {
            $scope.SOS7s = response.data;
        });
        
        
         ///API tourist-by-contries
        $http.get("https://sos1819-08.herokuapp.com/api/v1/tourists-by-countries/").then(function(response) {
            $scope.SOS8s = response.data;
        });
        


        /////////////////////APIs Externas/////////////////////
        //Api externa 1

        $http.get("https://swapi.co/api/starships/").then(function(responseStarships) {
            $http.get("/api/v1/uefa-club-rankings").then(function(responseUefa) {

                var ejex = [];
                for (var i in responseUefa.data) {
                    ejex.push(responseUefa.data.map(function(d) { return d["team"] })[i] + " " + responseUefa.data.map(function(d) { return d["season"] })[i]);
                }
                var datos = responseStarships.data.results;

                var Integration1 = {
                    "type": "radar",
                    "plot": {
                        "value-box": {
                            "text": "%v"
                        },
                        "tooltip": {
                            "text": "50%v"
                        }
                    },
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
                    "series": [{
                        "values": [datos[0].name,
                            datos[1].name,
                            datos[2].name,
                            datos[3].name,
                            datos[4].name,
                            datos[5].name,
                            datos[6].name,
                            datos[7].name,
                            datos[8].name,
                        ],
                        "text": "Name"
                    }, {
                        "values": [datos[0].length,
                            datos[1].length,
                            datos[2].length,
                            datos[3].length,
                            datos[4].length,
                            datos[5].length,
                            datos[6].length,
                            datos[7].length,
                            datos[8].length,
                        ],
                        "text": "Length"
                    }, {
                        "values": [responseUefa.data[0].team,
                            responseUefa.data[1].team,
                            responseUefa.data[2].team,
                            responseUefa.data[3].team,
                            responseUefa.data[4].team,
                            responseUefa.data[5].team,
                            responseUefa.data[6].team,
                            responseUefa.data[7].team,
                            responseUefa.data[8].team,
                        ],
                        "text": "Team"
                    }, {
                        "values": [responseUefa.data[0].points / 10000,
                            responseUefa.data[1].points / 10000,
                            responseUefa.data[2].points / 10000,
                            responseUefa.data[3].points / 10000,
                            responseUefa.data[4].points / 10000,
                            responseUefa.data[5].points / 10000,
                            responseUefa.data[6].points / 10000,
                            responseUefa.data[7].points / 10000,
                            responseUefa.data[8].points / 10000,
                        ],
                        "text": "Points/10000"
                    }]
                };
                zingchart.render({
                    id: "ExternalIntegration1",
                    data: Integration1,
                    height: "1000",
                    width: "100%"
                });
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
