angular
    .module("ManagerApp")
    .controller("integrations-uefa-club-ctrl", ["$scope", "$http", function($scope, $http) {
        console.log("Integrations Controller initialized");

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
                    "title": {
                        "text": "Integration Api Externa 1"
                    },
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
                        },{
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
                        },{
                            "values": [responseUefa.data[0].team ,
                                responseUefa.data[1].team ,
                                responseUefa.data[2].team ,
                                responseUefa.data[3].team ,
                                responseUefa.data[4].team ,
                                responseUefa.data[5].team ,
                                responseUefa.data[6].team ,
                                responseUefa.data[7].team ,
                                responseUefa.data[8].team ,
                            ],"text": "Team"
                        },{
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
                        }
                    ]
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
                    "title": {
                        "text": "Integration Api Externa 2"
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
