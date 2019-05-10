/* global angular */

angular.module("ManagerApp").controller("uefacountryEditCtrl", 
    ["$scope",
    "$http",
    "$routeParams",
    "$location",
    function($scope, $http, $routeParams,$location) {
        console.log("uefacountryEditCtrl initialized");
        var API = "/api/v1/uefa-country-rankings";


        var country = $routeParams.country;
        var season = $routeParams.season;

        console.log("Requesting uefa country to <" + API + "/" + country + "/" + season + ">...");
        $http.get(API + "/" + country + "/" + season).then(function(response) {
            console.log("Data Received:" + JSON.stringify(response.data, null, 2));
            $scope.uefacountry = response.data;
        });

        $scope.EditUefaCountry = function(country, season, ) {
            console.log("Editing" + " " + country + " " + season);

            $http.put(API + "/" + country + "/" + season, $scope.uefacountry)
            .then(function(response) {
                console.log("PUT Response:" + response.status + " " + response.data);
                $scope.alerts = [];
                $scope.alerts.push({ msg: $scope.uefacountry.country + " " + $scope.uefacountry.season + " editado correctamente" });
            
                $location.path("/uefa-country-rankings");
            }, 
            
            function(response) {
                console.log(response.status);
                $scope.alerts = [];
                $scope.alerts.push({ msg: "Error: Datos introducidos incorrectamente." });
            });
                
        };

    }
]);
