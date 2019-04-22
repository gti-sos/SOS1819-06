/* global angular */

angular.module("UefaCountryApp").controller("MainCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("MainCtrl initialized");
    var API = "/api/v1/uefa-country-rankings";
    refresh();
    function refresh() {
        console.log("Requesting uefa country ranking to <" + API + ">...");
        $http.get(API).then(function(response) {
            console.log("Data Received:" + JSON.stringify(response.data, null, 2));
            $scope.uefacountries = response.data;
        });
    };
    $scope.addUefaCountry = function() {
        var newUefaCountry = $scope.newUefaCountry;
        console.log("Adding a new uefa country:" + JSON.stringify(newUefaCountry, null, 2));
        $http.post(API, newUefaCountry).then(function(response) {
            console.log("POST Response:" + response.status + " " + response.data);
            refresh();
        });

    };
    
    $scope.EditUefaCountry = function(Ucountry,Useason,UrankingPosition,Upoints,Uteams){
        console.log("Editing"+" "+Ucountry+" "+Useason);
        $http.put(API+"/"+Ucountry+"/"+Useason,{
           country:Ucountry,
           season:Useason,
           rankingPosition:UrankingPosition,
           points:Upoints,
           teams:Uteams
        }).then(function(response){
           console.log("PUT Response:" + response.status + " " + response.data);
           refresh();
        });
    };
    

    $scope.deleteUefaCountry = function(country, season) {
        console.log("Deleting uefaCountry with country:"+country+" and season:"+season);
        $http.delete(API+"/"+country+"/"+season).then(function(response){
             console.log("Delete Response:" + response.status + " " + response.data);
             refresh();
             
             
        });
    };
     
    
$scope.formVisibility=false;
$scope.ShowForm=function(){
    $scope.formVisibility=true;
    console.log($scope.formVisibility);
};
$scope.HideForm=function(){
    $scope.formVisibility=false;
    console.log($scope.formVisibility);
};

}]);
