/* global angular*/

angular

    .module("UefaClubApp")

    .controller("UefaClubRankingsEdit-ctrl", ["$scope", "$http", function($scope, $http) {

        console.log("ctrl initialized");
        var API = "/api/v1/uefa-club-rankings";
        function refresh() {
            $http.get(API).then(function(response) {
                $scope.uefaclubrankings = response.data;
            });
        }

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
                $scope.message = "Equipo editado con éxito";

            });

        };
    }]);
