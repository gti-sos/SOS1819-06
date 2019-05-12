/* global angular */

angular.module("ManagerApp").controller("transferstatsListCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("transferstatsListCtrl initialized");
    var API = "/api/v1/transfer-stats";
    refresh();
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.alerts = [];

    function refresh() {
        console.log("Requesting transfer stats to <" + API + ">...");
        $http.get(API).then(function(response) {
            console.log("Data Received:" + JSON.stringify(response.data, null, 2));
            $scope.transferstats = response.data;
        });
    };
    $scope.showData = function() {
        refresh()
        //$scope.formVisibility = false;
        //console.log($scope.formVisibility);
        $scope.alerts = [];
        $scope.alerts.push({ msg: "Mostrando todos los datos" });
    };
    $scope.loadInitial = function() {
        console.log("Load Initial Data");
        $http.get(API + "/loadInitialData").then(function(response) {
            console.log("Load Initial data:" + JSON.stringify(response.status, null, 2));
            refresh();
            $scope.alerts = [];
            $scope.alerts.push({ msg: "Datos cargados con éxito" });
        }, function(response) {
            console.log(response.status);
            $scope.alerts = [];
            $scope.alerts.push({ msg: "No se pueden cargar los datos: La lista de elementos no está vacía" });

        });
    };
    
    /////////////////////////////////////////////Searchs//////////////////////////////////////////////////////
    $scope.findCountryTeamSeason = function(country, team, season) {
        var url = "/" + country + "/" + team + "/" + season;
        console.log("Requesting transfer stats to <" + url + ">...");
        $http.get(API + url).then(function(response) {
            console.log(response.status);
            console.log("Data Received:" + JSON.stringify(response.data, null, 2));
            var data = [];
            data.push(response.data);
            $scope.transferstats = data;
            $scope.alerts = [];
            $scope.alerts.push({ msg: "Operación realizada con éxito" });
        }, function(response) {
            if (typeof country == 'undefined' || country == "" || country == null || typeof season == 'undefined' || season == "" || season == null ||typeof team == 'undefined' || team == "" || team == null) {
                $scope.alerts = [];
                $scope.alerts.push({ msg: "Busque por los tres campos o se mostrarán todos los datos" });
                refresh();
            }
            else {
                console.log(response.status);
                refresh();
                $scope.alerts = [];
                $scope.alerts.push({ msg: "Error: El dato con los campos: " + country + " " + team + " " + season + " no fue encontrado" });
            }
        });
    };
    
    $scope.buscarEquipo = function() {
            var team = $scope.inputEquipo;
            console.log("ver recurso : <" + team + ">");
            $http.get(API + "/?team=" + team)
                .then(function(response) {
                    $scope.transferstats = response.data;
                })
                .catch(function(data) {
                    console.log(data.status);
                    refresh();
                    $scope.message = data.statusText + " : El recurso " + team + " no existe";
                });
        };

    $scope.fromTo = function(from, to) {
        console.log("Requesting transfer stats to <" + API + "/" + "?from=" + from + "&to=" + to + ">...");
        $http.get(API + "/" + "?from=" + from + "&to=" + to).then(function(response) {
            if (typeof from == 'undefined' || from == "" || from == null || typeof to == 'undefined' || to == "" || to == null) {
                $scope.alerts = [];
                $scope.alerts.push({ msg: "Busque por ambos campos o se mostrarán todos los datos" });
                refresh();
            }
            else {
                console.log(response.status);
                console.log("Data Received:" + JSON.stringify(response.data, null, 2));
                $scope.transferstats = response.data;
                $scope.alerts = [];
                $scope.alerts.push({ msg: "Operación realizada con éxito" });
            }
        }, function(response) {
            console.log(response.status);
            refresh();
            $scope.alerts = [];
            $scope.alerts.push({ msg: "Error: No hay estadísticas desde " + from + " hasta " + to });
        });
    };

    $scope.fromToPoints = function(fromPoints, toPoints) {
        console.log("Requesting uefa country ranking to <" + API + "/" + "?fromPoints=" + fromPoints + "&toPoints=" + toPoints + ">...");
        $http.get(API + "/" + "?fromPoints=" + fromPoints + "&toPoints=" + toPoints).then(function(response) {
            if (typeof fromPoints == 'undefined' || fromPoints == "" || fromPoints == null || typeof toPoints == 'undefined' || toPoints == "" || toPoints == null) {
                $scope.alerts = [];
                $scope.alerts.push({ msg: "Busque por ambos campos o se mostrarán todos los datos" });
                refresh();
            }else{
            console.log(response.status);
            console.log("Data Received:" + JSON.stringify(response.data, null, 2));
            $scope.uefacountries = response.data;
            $scope.alerts = [];
            $scope.alerts.push({ msg: "Operación realizada con éxito" });
        }
        }, function(response) {
                console.log(response.status);
                refresh();
                $scope.alerts = [];
                $scope.alerts.push({ msg: "Error: No hay países con un rango de puntos desde " + fromPoints + " hasta " + toPoints });
        });
    };
    
    $scope.numberTeams = function(teams) {
        console.log("Requesting uefa country ranking to <" +API + "/" + "?numberOfTeams=" + teams+ ">...");
        $http.get(API + "/" + "?numberOfTeams=" + teams).then(function(response) {
            if (typeof teams == 'undefined' || teams == "" || teams == null) {
                $scope.alerts = [];
                $scope.alerts.push({ msg: "Busque por el número de equipos o se mostrarán todos los datos" });
                refresh();
            }else{
            console.log(response.status);
            console.log("Data Received:" + JSON.stringify(response.data, null, 2));
            $scope.uefacountries = response.data;
            $scope.alerts = [];
            $scope.alerts.push({ msg: "Operación realizada con éxito" });
        }
        }, function(response) {
                console.log(response.status);
                refresh();
                $scope.alerts = [];
                $scope.alerts.push({ msg: "Error: No hay países con " + teams + " equipos "});
        });
    };
    
    $scope.findPosition = function(position) {
        console.log("Requesting uefa country ranking to <" +API + "/" + "?rankingPosition=" + position+ ">...");
        $http.get(API + "/" + "?rankingPosition=" + position).then(function(response) {
            if (typeof position == 'undefined' || position == "" || position == null) {
                $scope.alerts = [];
                $scope.alerts.push({ msg: "Busque por la posición en el ranking o se mostrarán todos los datos" });
                refresh();
            }else{
            console.log(response.status);
            console.log("Data Received:" + JSON.stringify(response.data, null, 2));
            $scope.uefacountries = response.data;
            $scope.alerts = [];
            $scope.alerts.push({ msg: "Operación realizada con éxito" });
        }
        }, function(response) {
                console.log(response.status);
                refresh();
                $scope.alerts = [];
                $scope.alerts.push({ msg: "Error: No hay países en la posición " + position});
        });
    };

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    $scope.addTransferStat = function() {
        var newTransferStat = $scope.newTransferStat;
        console.log("Adding a new transfer stat:" + JSON.stringify(newTransferStat, null, 2));
        $http.post(API, newTransferStat).then(function(response) {
            console.log("POST Response:" + response.status + " " + response.data);
            refresh();
            $scope.alerts = [];
            $scope.alerts.push({ msg: "Elemento: " + newTransferStat.country + " " + newTransferStat.team + " " + newTransferStat.season + " creado con éxito" });

        }, function(response) {
            console.log(response.status);
            $scope.alerts = [];
            $scope.alerts.push({ msg: "Error: Comprueba los campos añadidos" });

        });

    };


    $scope.deleteTransferStat = function(country, team, season) {

        console.log("Deleting transferStat with country:" + country + "team: " + team + " and season:" + season);
        $http.delete(API + "/" + country + "/" + team + "/" + season).then(function(response) {
            console.log("Delete Response:" + response.status + " " + response.data);
            refresh();
            $scope.alerts = [];
            $scope.alerts.push({ msg: country + " " + team + " de la temporada " + season + " " + "borrado correctamente" });

        });
    };

    $scope.deleteAll = function() {
        console.log("Deleting All");
        $http.delete(API).then(function(response) {
            console.log("Delete Response:" + response.status + " " + response.data);
            refresh();
            $scope.alerts = [];
            $scope.alerts.push({ msg: "Todos los elementos borrados correctamente" });

        });
    };


    $scope.formVisibility = false;
    $scope.showForm = function() {
        $scope.formVisibility = true;
        console.log($scope.formVisibility);
    };

    $scope.hideForm = function() {
        $scope.formVisibility = false;
        console.log($scope.formVisibility);
    };

    $scope.setPage = function(index) {
        $scope.currentPage = index - 1;
    };



}]).filter("startFrom", function() {
    return function(input, start) {
        start = +start;
        return input.slice(start);
    };
});
