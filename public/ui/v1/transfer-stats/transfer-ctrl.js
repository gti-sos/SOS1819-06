/* global angular */

angular.module("TransferStatsApp").controller("MainCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("MainCtrl initialized");
    var API = "/api/v1/transfer-stats";
    refresh();
    function refresh() {
        console.log("Requesting transfer stats to <" + API + ">...");
        $http.get(API).then(function(response) {
            console.log("Data Received:" + JSON.stringify(response.data, null, 2));
            $scope.transferstats = response.data;
        });
    };
    $scope.addTransferStat = function() {
        var newTransferStat = $scope.newTransferStat;
        console.log("Adding a new transfer stat:" + JSON.stringify(newTransferStat, null, 2));
        $http.post(API, newTransferStat).then(function(response) {
            console.log("POST Response:" + response.status + " " + response.data);
            refresh();
        });

    };
    
    $scope.EditTransferStat = function(Ucountry,Useason,Uteam,Umoneyspent,Umoneyentered,Unumberofsignings,Unumberoffarewells){
        console.log("Editing"+" "+Ucountry+" "+Useason+" "+Uteam);
        $http.put(API+"/"+Ucountry+"/"+Useason+"/"+Uteam,{
           country:Ucountry,
           season:Useason,
           team:Uteam,
           moneyentered:Umoneyentered,
           moneyspent:Umoneyspent,
           numberofsignings:Unumberofsignings,
           numberoffarewells:Unumberoffarewells
        }).then(function(response){
           console.log("PUT Response:" + response.status + " " + response.data);
           refresh();
        });
    };
    

    $scope.deleteTransferStat = function(country, season, team) {
        console.log("Deleting transfer stat with country:"+country+", season:"+season+"and team:"+team);
        $http.delete(API+"/"+country+"/"+season+"/"+team).then(function(response){
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
