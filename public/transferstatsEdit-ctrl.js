/* global angular */

angular.module("ManagerApp").controller("transferstatsEditCtrl", 
    ["$scope",
    "$http",
    "$routeParams",
    "$location",
    function($scope, $http, $routeParams,$location) {
        console.log("transferstatsEditCtrl initialized");
        var API = "/api/v1/transfer-stats";


        var country = $routeParams.country;
        var season = $routeParams.season;
        var team = $routeParams.team;

        console.log("Requesting transfer stat to <" + API + "/" + country + "/" + team + "/" + season + ">...");
        $http.get(API + "/" + country + "/" + team + "/" + season).then(function(response) {
            console.log("Data Received:" + JSON.stringify(response.data, null, 2));
            $scope.transferstat = response.data;
        });

        $scope.EditTransferStat = function(country, season , team, ) {
            console.log("Editing" + " " + country + " " + team + " " + season);

            $http.put(API + "/" + country + "/" + team + "/" + season, $scope.transferstat)
            .then(function(response) {
                console.log("PUT Response:" + response.status + " " + response.data);
                $scope.alerts = [];
                $scope.alerts.push({ msg: $scope.transferstat.country + " " + $scope.transferstat.team + " " + $scope.transferstat.season + " editado correctamente" });
            
                $location.path("/transfer-stats");
            }, 
            
            function(response) {
                console.log(response.status);
                $scope.alerts = [];
                $scope.alerts.push({ msg: "Error: Datos introducidos incorrectamente." });
            });
                
        };

    }
]);
