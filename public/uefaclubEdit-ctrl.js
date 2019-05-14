/* global angular */

angular.module("ManagerApp").controller("UefaClubRankingsEdit-ctrl", 
    ["$scope",
    "$http",
    "$routeParams",
    "$location",
    function($scope, $http, $routeParams,$location) {
        console.log("UefaClubRankingsEdit-ctrl initialized");
        var API = "/api/v1/uefa-club-rankings";


        var team = $routeParams.team;
        var season = $routeParams.season;

        console.log("Requesting uefa club to <" + API + "/" + team + "/" + season + ">...");
        $http.get(API + "/" + team + "/" + season).then(function(response) {
            console.log("Data Received:" + JSON.stringify(response.data, null, 2));
            $scope.uefaclub = response.data;
        });

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
                $location.path("/uefa-club-rankings");
                $scope.message = "Equipo editado con éxito";
            },
            function(response) {
                console.log(response.status);
                $scope.message = "Error: Datos introducidos incorrectamente." ;
            });

        };

    }
]);




        
 
