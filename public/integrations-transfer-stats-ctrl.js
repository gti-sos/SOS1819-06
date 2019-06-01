//Api externa 1
/*global Chartist*/
/*global unirest*/
/*global angular*/
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
        
        //INTEGRACION SOS 3 CON PROXY (G04-happiness-stats)
        var proxyAPI = "/proxyHappiness";
        $http.get(proxyAPI).then(function(response) {
            $scope.SOS3s = response.data;
        });
        
        //INTEGRACION SOS 4 (G15-sports-competitions)
        $http.get("https://sos1819-15.herokuapp.com/api/v1/sports-competitions").then(function(response) {
            $scope.SOS4s = response.data;
        });
        
        //INTEGRACION SOS 5 (G09-climate-stats)
        $http.get("https://sos1819-09.herokuapp.com/api/v2/climate-stats").then(function(response) {
            $scope.SOS5s = response.data;
        });
        
        //INTEGRACION SOS 6 (G03-computers-attacks-stats)
        $http.get("https://sos1819-03.herokuapp.com/api/v1/computers-attacks-stats").then(function(response) {
            $scope.SOS6s = response.data;
        });
        
        //INTEGRACION SOS 7 (G11-general-public-expenses)
        $http.get("https://sos1819-11.herokuapp.com/api/v1/general-public-expenses").then(function(response) {
            $scope.SOS7s = response.data;
        });
        
        //INTEGRACION SOS 8 (G12-pollution-stats)
        var proxyAPI = "/proxyPollution";
        $http.get(proxyAPI).then(function(response){
            $scope.SOS8s = response.data;
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
        
        //INTEGRACION CON API EXTERNA INE
        $http.get("https://servicios.ine.es/wstempus/js/ES/OPERACIONES_DISPONIBLES").then(function(responseExt) {
            $http.get("/api/v1/transfer-stats").then(function(responseTransfer) {
                
                var cat1 = responseTransfer.data[0].team+ " - " + responseExt.data[0]["Nombre"];
                var val1 = responseTransfer.data[0].numberofsignings;
                var data1 = responseExt.data[0]["Id"];
                
                var cat2 = responseTransfer.data[1].team+ " - " + responseExt.data[1]["Nombre"];
                var val2 = responseTransfer.data[1].numberofsignings;
                var data2 = responseExt.data[1]["Id"];
                
                var cat3 = responseTransfer.data[2].team + " - " + responseExt.data[2]["Nombre"];
                var val3 = responseTransfer.data[2].numberofsignings;
                var data3 = responseExt.data[2]["Id"];
                
                var cat4 = responseTransfer.data[3].team+ " - " + responseExt.data[3]["Nombre"];
                var val4 = responseTransfer.data[3].numberofsignings;
                var data4 = responseExt.data[3]["Id"];
                
                var cat5 = responseTransfer.data[4].team+ " - " + responseExt.data[4]["Nombre"];
                var val5 = responseTransfer.data[4].numberofsignings;
                var data5 = responseExt.data[4]["Id"];
                
                Highcharts.chart('APIExterna4', {
                    chart: {
                        zoomType: 'xy'
                    },
                    title: {
                        text: ' '
                    },
                    subtitle: {
                        text: ' '
                    },
                    xAxis: [{
                        categories: [cat1, cat2, cat3, cat4, cat5],
                        crosshair: true
                    }],
                    yAxis: [{ // Primary yAxis
                        labels: {
                            format: '{value}',
                            style: {
                                color: Highcharts.getOptions().colors[1]
                            }
                        },
                        title: {
                            text: 'ID',
                            style: {
                                color: Highcharts.getOptions().colors[1]
                            }
                        }
                    }, { // Secondary yAxis
                        title: {
                            text: 'Number of signings',
                            style: {
                                color: Highcharts.getOptions().colors[0]
                            }
                        },
                        labels: {
                            format: '{value} players',
                            style: {
                                color: Highcharts.getOptions().colors[0]
                            }
                        },
                        opposite: true
                    }],
                    tooltip: {
                        shared: true
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'left',
                        x: 120,
                        verticalAlign: 'top',
                        y: 100,
                        floating: true,
                        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || 'rgba(255,255,255,0.25)'
                    },
                    series: [{
                        name: 'Number of signings',
                        type: 'column',
                        yAxis: 1,
                        data: [val1, val2, val3, val4, val5],
                        tooltip: {
                            valueSuffix: ' players'
                        }
                
                    }, {
                        name: 'ID',
                        type: 'spline',
                        data: [data1, data2, data3, data4, data5],
                        tooltip: {
                        }
                    }]
                });
            });
        });
        
        //INTEGRACION APIP EXTERNA WEATHER
         //$http.get("https://api.openweathermap.org/data/2.5/weather?q=Seville&appid=a58c838b9e41e87a40337f6e0b5ebc10").then(function(responseExt) {
        $http.get("https://api.openweathermap.org/data/2.5/forecast?id=524901&appid=3a65e0fea1f79cac5d4a6e3e5d94ef3d").then(function(responseExt) {     
            $http.get("/api/v1/transfer-stats").then(function(responseTransfer) {
                //var cat = responseTransfer.data[0].team;
                var val = responseTransfer.data[0].numberofsignings;
                var temp = responseExt.data["list"][0]["main"]["humidity"];
                
                var val2 = responseTransfer.data[1].numberofsignings;
                var temp2 = responseExt.data["list"][1]["main"]["humidity"];
                
                var val3 = responseTransfer.data[2].numberofsignings;
                var temp3 = responseExt.data["list"][2]["main"]["humidity"];
                
                var val4 = responseTransfer.data[3].numberofsignings;
                var temp4 = responseExt.data["list"][3]["main"]["humidity"];
                
                var val5 = responseTransfer.data[4].numberofsignings;
                var temp5 = responseExt.data["list"][4]["main"]["humidity"];
                
                var val6 = responseTransfer.data[5].numberofsignings;
                var temp6 = responseExt.data["list"][5]["main"]["humidity"];
                console.log(temp, temp2, temp3, temp4, temp5, temp6);
                Highcharts.chart('APIExterna5', {
                    chart: {
                        type: 'area'
                    },
                    title: {
                        text: 'Number of farewells and temperature'
                    },
                    
                    xAxis: {
                        allowDecimals: true,
                        labels: {
                            formatter: function () {
                                return this.value; // clean, unformatted number for year
                            }
                        }
                    },
                    yAxis: {
                        title: {
                            text: 'Nuclear weapon states'
                        },
                        labels: {
                            formatter: function () {
                                return this.value / 1000 + 'k';
                            }
                        }
                    },
                    tooltip: {
                        pointFormat: '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
                    },
                    plotOptions: {
                        area: {
                            //pointStart: 1940,
                            marker: {
                                enabled: false,
                                symbol: 'circle',
                                radius: 2,
                                states: {
                                    hover: {
                                        enabled: true
                                    }
                                }
                            }
                        }
                    },
                    series: [{
                        name: 'USA',
                        data: [
                            val, val2, val3, val4, val5, val6
                        ]
                    }, {
                        name: 'USSR/Russia',
                        data: [temp, temp2, temp3, temp4, temp5, temp6]
                    }]
                });
            });
         });
         
         //INTEGRACION CON API EXTERNA 6 (LIBRERIAS)
        $http.get("https://libraries.io/api/platforms").then(function(responseExt) {
            $http.get("/api/v1/transfer-stats").then(function(responseTransfer) {
                
                var datosExt = responseExt.data;
                var datosTransfer = responseTransfer.data;
                console.log(datosTransfer);
                
                var a1 = datosExt[7]["project_count"]/10000;
                var b1 = datosExt[8]["project_count"]/1000;
                var c1 = datosExt[9]["project_count"]/1000;
                var d1 = datosExt[10]["project_count"]/1000;
                
                var a2 = datosTransfer[0]["numberofsignings"];
                var b2 = datosTransfer[1]["numberofsignings"];
                var c2 = datosTransfer[2]["numberofsignings"];
                var d2 = datosTransfer[3]["numberofsignings"];
               
                
                
               

                new Chartist.Pie('#APIExterna6', {
                      
                      series: [a1, a2, b1, b2, c1, c2, d1, d2]
                    }, {
                      donut: true,
                      donutWidth: 150,
                      donutSolid: true,
                      startAngle: 270,
                      showLabel: true
                    });
            });
        });
}]);