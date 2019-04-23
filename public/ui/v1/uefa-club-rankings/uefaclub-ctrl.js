/* global angular */

angular.module("UefaClubApp").controller("MainCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("MainCtrl initialized");
    var API = "/api/v1/uefa-club-rankings";
    refresh();
    function refresh() {
        console.log("Requesting uefa club ranking to <" + API + ">...");
        $http.get(API).then(function(response) {
            console.log("Data Received:" + JSON.stringify(response.data, null, 2));
            $scope.uefaclubs = response.data;
        });
    };
    $scope.addUefaClub = function() {
        var newUefaClub = $scope.newUefaClub;
        console.log("Adding a new uefa club:" + JSON.stringify(newUefaClub, null, 2));
        $http.post(API, newUefaClub).then(function(response) {
            console.log("POST Response:" + response.status + " " + response.data);
            refresh();
        });

    };
    
    $scope.EditUefaClub = function(EditTeam,EditSeason,EditCountry,EditPoints,EditPtsseason,EditPtsbeforeseason){
        console.log("Editing"+" "+EditTeam+" "+EditSeason);
        $http.put(API+"/"+EditTeam+"/"+EditSeason,{
           points:EditPoints,
           ptsseason:EditPtsseason,
           ptsbeforeseason:EditPtsbeforeseason
        }).then(function(response){
           console.log("PUT Response:" + response.status + " " + response.data);
           refresh();
        });
    };
    

    $scope.deleteUefaClub = function(team, season) {
        console.log("Deleting uefaClub with team:"+team+" and season:"+season);
        $http.delete(API+"/"+team+"/"+season).then(function(response){
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