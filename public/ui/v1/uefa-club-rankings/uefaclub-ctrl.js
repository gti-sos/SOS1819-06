/* global angular*/

angular

    .module("UefaClubApp")

    .controller("UefaClubRankings-ctrl", ["$scope", "$http", function($scope, $http) {

        console.log("ctrl initialized");

        var API = "/api/v1/uefa-club-rankings";

        function refresh() {
            $http.get(API).then(function(response) {
                $scope.uefaclubrankings = response.data;
            });
        }

        refresh();

        $scope.loadInitialData = function() {
            $http.get(API + "/loadInitialData").then(function(response) {
                $scope.uefaclubrankings = response.data;
                refresh();
            });
        };

        $scope.buscarPais = function() {
            var country = $scope.inputPais;
            console.log("ver recurso : <" + country + ">");
            $http.get(API + "/" + country)
                .then(function(response) {
                    $scope.uefaclubrankings = response.data;
                })
                .catch(function(data) {
                    console.log(data.status);
                    refresh();
                    $scope.message = data.statusText + " : El recurso " + country + " no existe";
                });
        };

        $scope.update = function(uefaclub) {
            console.log("PUT : " + API + "/" + uefaclub.team + "/" + uefaclub.season);
            $http.put(API + "/" + uefaclub.team + "/" + uefaclub.season, {
                country: uefaclub.country,
                season: uefaclub.season,
                points: uefaclub.points,
                ptsseason: uefaclub.ptsseason,
                ptsbeforeseason: uefaclub.ptsbeforeseason,
                team: uefaclub.team
            }).then(function(response) {
                console.log("Put response : " + response.status + " " + response.data);
                refresh();
                $scope.message = response.statusText;

            });
        };

        $scope.delete = function(uefaclub) {
            console.log("deleting uefaclub <" + uefaclub.team + uefaclub.season + ">");
            $http.delete(API + "/" + uefaclub.team + "/" + uefaclub.season)
                .then(function(response) {
                    console.log("delete response" + response.statusText);
                    $scope.message = response.statusText;
                    refresh();

                });
        };

        $scope.add = function() {
            var newUefaClub = $scope.newUefaClub;

            console.log("adding uefaclub " + JSON.stringify(newUefaClub, null, 2));

            $http.post(API, newUefaClub)
                .then(function(response) {

                    console.log("post response " + response.statusText);

                    $scope.message = response.statusText;

                    $scope.newPopStat = "";

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
                    $scope.message = response.statusText;
                    refresh();
                });
        };

        $scope.ver = function() {
            var offset = $scope.offset;
            var limit = $scope.limit;
            console.log("ver de " + offset + " a " + limit);
            console.log("<" + API + "?limit=" + limit + "?offset=" + offset + ">");
            $http.get(API + "?limit=" + limit + "?offset=" + offset)
                .then(function(response) {
                    $scope.uefaclubrankings = response.data;
                    $scope.message = response.statusText;
                });
        };

    }]);
