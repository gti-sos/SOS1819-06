//Api externa 1
/*global Chartist*/
angular
    .module("ManagerApp")
    .controller("integrations-transfer-stats-ctrl", ["$scope", "$http", function($scope, $http) {
        console.log("Integrations Controller initialized");
        
        
        $http.get("https://soccer.sportsopendata.net/v1/leagues").then(function(responseExt) {
            $http.get("/api/v1/transfer-stats").then(function(responseTransfer) {
                
                //var datosExt = responseExt.data["data"]["leagues"];
                //console.log(datosExt[0]["level"]);
                console.log(responseTransfer.data);

                new Chartist.Line('#chartExt', {
                        labels: responseTransfer.data.map(function(d) { return d["team"] }),
                        series: [responseTransfer.data.map(function(d) { return d["numberofsignings"] })]
                     });
            });
        });
        
        $http.get("https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian").then(function(responseExt) {
            $http.get("/api/v1/transfer-stats").then(function(responseTransfer) {

                var ejex = [];
                for (var i in responseTransfer.data) {
                    ejex.push(responseTransfer.data.map(function(d) { return d["team"] })[i] + " " + responseTransfer.data.map(function(d) { return d["season"] })[i]);
                }
                var datos = responseExt.data["meals"];
                /*console.log("a");
                console.log(datos);
                console.log("b");
                //console.log(datos["meals"][0].strMeal);
                console.log("c");*/
                
                
                var Integration1 = {
                    "type": "scatter",
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
                    "series": [ {
                        "values": [datos[0].idMeal/100,
                            datos[1].idMeal/100,
                            datos[2].idMeal/100,
                            datos[3].idMeal/100,
                            datos[4].idMeal/100,
                            datos[5].idMeal/100,
                            datos[6].idMeal/100,
                            datos[7].idMeal/100,
                            datos[8].idMeal/100,
                        ],
                        "text": "ID Meal"
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
        
        $http.get("https://api.tvmaze.com/seasons/1/episodes").then(function(responseExt) {
            $http.get("/api/v1/transfer-stats").then(function(responseTransfer) {

                var ejex = [];
                for (var i in responseTransfer.data) {
                    ejex.push(responseTransfer.data.map(function(d) { return d["team"] })[i] + " " + responseTransfer.data.map(function(d) { return d["season"] })[i]);
                }
                var datos = responseExt.data;
                /*console.log("a");
                console.log(datos);
                console.log("b");
                //console.log(datos["meals"][0].strMeal);
                console.log("c");*/
                
                
                var Integration2 = {
                    "type": "bar",
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
                    "series": [ {
                        "values": [datos[0].number,
                            datos[1].number,
                            datos[2].number,
                            datos[3].number,
                            datos[4].number,
                            datos[5].number,
                            datos[6].number,
                            datos[7].number,
                            datos[8].number,
                        ],
                        "text": "ID Meal"
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
                    id: "APIExterna2",
                    data: Integration2,
                    height: "1000",
                    width: "100%"
                });
            });
        });
}]);