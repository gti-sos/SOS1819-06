//Api externa 1

        $http.get("https://swapi.co/api/starships/").then(function(responseStarships) {
            $http.get("/api/v1/transfer-stats").then(function(responseTransfer) {

                var ejex = [];
                for (var i in responseTransfer.data) {
                    ejex.push(responseTransfer.data.map(function(d) { return d["team"] })[i] + " " + responseTransfer.data.map(function(d) { return d["season"] })[i]);
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
                        "values": [responseTransfer.data[0].team,
                            responseTransfer.data[1].team,
                            responseTransfer.data[2].team,
                            responseTransfer.data[3].team,
                            responseTransfer.data[4].team,
                            responseTransfer.data[5].team,
                            responseTransfer.data[6].team,
                            responseTransfer.data[7].team,
                            responseTransfer.data[8].team,
                        ],
                        "text": "Team"
                    }, {
                        "values": [responseTransfer.data[0].moneyspent,
                            responseTransfer.data[1].moneyspent,
                            responseTransfer.data[2].moneyspent,
                            responseTransfer.data[3].moneyspent,
                            responseTransfer.data[4].moneyspent,
                            responseTransfer.data[5].moneyspent,
                            responseTransfer.data[6].moneyspent,
                            responseTransfer.data[7].moneyspent,
                            responseTransfer.data[8].moneyspent,
                        ],
                        "text": "Money Spent"
                    }]
                };
                zingchart.render({
                    id: "APIExterna",
                    data: Integration1,
                    height: "1000",
                    width: "100%"
                });
            });
        });
