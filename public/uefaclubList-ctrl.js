/* global angular*/

angular

    .module("ManagerApp")

    .controller("UefaClubRankingsList-ctrl", ["$scope", "$http", function($scope, $http) {

        console.log("ctrl initialized");

        var API = "/api/v1/uefa-club-rankings";

        function refresh() {
            $http.get(API+"?limit=10&offset=0").then(function(response) {
                $scope.offset = 0;
                $scope.uefaclubrankings = response.data;
            });
        }

        refresh();

        $scope.loadInitialData = function() {
            $http.get(API + "/loadInitialData").then(function(response) {
                $scope.uefaclubrankings = response.data;
                $scope.message = "Datos cargados con exito";
                refresh();
            });
        };

        $scope.searchCountry = function() {
            var country = $scope.inputPais;
            console.log("ver recurso : <" + country + ">");
            $http.get(API + "/" + country)
                .then(function(response) {
                    $scope.uefaclubrankings = response.data;
                    $scope.message = "Busqueda con exito";
                })
                .catch(function(data) {
                    console.log(data.status);
                    refresh();
                    $scope.message = data.statusText + " : El recurso " + country + " no existe";
                });
        };

        $scope.delete = function(uefaclub) {
            console.log("deleting uefaclub <" + uefaclub.team + uefaclub.season + ">");
            $http.delete(API + "/" + uefaclub.team + "/" + uefaclub.season)
                .then(function(response) {
                    console.log("delete response" + response.statusText);
                    $scope.message = "Equipo borrado con exito";
                    refresh();

                });
        };

        $scope.add = function() {
            var newUefaClub = $scope.newUefaClub;

            console.log("adding uefaclub " + JSON.stringify(newUefaClub, null, 2));

            $http.post(API, newUefaClub)
                .then(function(response) {

                    console.log("post response " + response.statusText);

                    $scope.message = "Equipo añadido con exito";

                    refresh();
                })
                .catch(function(data) {
                    console.log(data.status);
                    $scope.message = data.statusText + " : Añade un recurso con campos correctos";
                });
        };

        $scope.deleteall = function() {
            $http.delete(API)
                .then(function(response) {
                    console.log("delete all response" + response.statusText);
                    $scope.message = "Datos borrados con exito";
                    refresh();
                });
        };

        $scope.next = function() {
            if ($scope.offset > $scope.uefaclubrankings.length) {
            }else {
                $scope.offset = $scope.offset + 10;
            }
            console.log($scope.offset);
            $http.get(API + "?limit=10" + "&offset=" + $scope.offset).then(function(response) {
                $scope.status = "Status: All is ok";
                $scope.uefaclubrankings = response.data;
                $scope.error = "";
            }, function(response) {
                console.log(response.status);
                $scope.status = response.status;
                $scope.error = "Ups, something was wrong. Try it later";
            });

        };

        $scope.back = function() {
            if ($scope.offset < 10) {
                $scope.offset = 0;
            }else {
                $scope.offset = $scope.offset - 10;
            }
            console.log($scope.offset);
            $http.get(API + "?limit=10" + "&offset=" + $scope.offset).then(function(response) {
                $scope.status = "Status: All is ok";
                $scope.uefaclubrankings = response.data;
                $scope.error = "";
            }, function(response) {
                console.log(response.status);
                $scope.status = response.status;
                $scope.error = "Ups, something was wrong. Try it later";
            });


        };

    }]);
