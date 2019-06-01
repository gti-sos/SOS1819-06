//Api externa 1
/*global Chartist*/
angular
    .module("ManagerApp")
    .controller("integrations-transfer-stats-ctrl", ["$scope", "$http", function($scope, $http) {
        console.log("Integrations Controller initialized");
        
        
        //INTEGRACION SOS 1 (G06-uefa-country-rankings)
        $http.get("https://sos1819-06.herokuapp.com/api/v1/uefa-country-rankings").then(function(response) {
            $scope.SOS1s = response.data;
        });
        
        //INTEGRACION SOS 2 (G10-issue-dioxid)
        $http.get("https://sos1819-10.herokuapp.com/api/v2/issue-dioxid").then(function(response) {
            $scope.SOS2s = response.data;
        });
        
        //INTEGRACION SOS 1
        $http.get("https://sos1819-06.herokuapp.com/api/v1/uefa-country-rankings").then(function(response) {
            $scope.SOS1s = response.data;
        });
        
        //INTEGRACION SOS 1
        $http.get("https://sos1819-06.herokuapp.com/api/v1/uefa-country-rankings").then(function(response) {
            $scope.SOS1s = response.data;
        });
        
        //INTEGRACION SOS 1
        $http.get("https://sos1819-06.herokuapp.com/api/v1/uefa-country-rankings").then(function(response) {
            $scope.SOS1s = response.data;
        });
        
        //INTEGRACION SOS 1
        $http.get("https://sos1819-06.herokuapp.com/api/v1/uefa-country-rankings").then(function(response) {
            $scope.SOS1s = response.data;
        });
        
        //INTEGRACION SOS 1
        $http.get("https://sos1819-06.herokuapp.com/api/v1/uefa-country-rankings").then(function(response) {
            $scope.SOS1s = response.data;
        });
        
        //INTEGRACION SOS 1
        $http.get("https://sos1819-06.herokuapp.com/api/v1/uefa-country-rankings").then(function(response) {
            $scope.SOS1s = response.data;
        });
        
        //INTEGRACION CON API EXTERNA 1 (LIGAS DE FUTBOL)
        $http.get("https://soccer.sportsopendata.net/v1/leagues").then(function(responseExt) {
            $http.get("/api/v1/transfer-stats").then(function(responseTransfer) {
                
                var datosExt = responseExt.data["data"]["leagues"];
                var datosTransfer = responseTransfer.data;
                console.log(datosTransfer);
                
                var a1 = datosExt[7]["level"];
                var b1 = datosExt[8]["level"];
                var c1 = datosExt[9]["level"];
                var d1 = datosExt[10]["level"];
                var e1 = datosExt[11]["level"];
                var f1 = datosExt[12]["level"];
                var g1 = datosExt[13]["level"];
                var h1 = datosExt[14]["level"];
                var i1 = datosExt[6]["level"];
                
                var a2 = datosTransfer[0]["numberofsignings"]/9;
                var b2 = datosTransfer[1]["numberofsignings"]/9;
                var c2 = datosTransfer[2]["numberofsignings"]/9;
                var d2 = datosTransfer[3]["numberofsignings"]/9;
                var e2 = datosTransfer[4]["numberofsignings"]/9;
                var f2 = datosTransfer[5]["numberofsignings"]/9;
                var g2 = datosTransfer[6]["numberofsignings"]/9;
                var h2 = datosTransfer[7]["numberofsignings"]/9;
                var i2 = datosTransfer[8]["numberofsignings"]/9;
                
                
                var lab = [];
                
                for (var i in responseTransfer.data) {
                    lab.push("Equipo: " + responseTransfer.data.map(function(d) { return d["team"] + " Competición: " + datosExt[i]["league_slug"] })[i]);
                    }

                new Chartist.Line('#chartExt', {
                    
                        labels: lab,
                        
                        series: [
                        [a1, b1, c1, d1, e1, f1, g1, h1, i1],
                        [a2, b2, c2, d2, e2, f2, g2, h2, i2]
                        ]
                     });
            });
        });
        
        
        //INTEGRACION API EXTERNA 2 (MENÚS DE COMIDA)
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
        
        
        //INTEGRACION CON API EXTERNA 3 (SERIES)
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