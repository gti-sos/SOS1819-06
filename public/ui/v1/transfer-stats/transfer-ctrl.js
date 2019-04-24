/* global angular */

angular.module("TransferStatsApp").controller("MainCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("MainCtrl initialized");
    var API = "/api/v1/transfer-stats";
    refresh();
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    function refresh() {
        console.log("Requesting transfer stats to <" + API + ">...");
        $http.get(API).then(function(response) {
            console.log("Data Received:" + JSON.stringify(response.data, null, 2));
            $scope.transferstats = response.data;
        });
    }
    
    $scope.loadInitialData = function() {
            $http.get(API + "/loadInitialData").then(function(response) {
                $scope.transferstats = response.data;
                $scope.message = "La carga de datos ha sido realizada correctamente";
                refresh();
            });
        };
        
        
    $scope.addTransferStat = function() {
        var newTransferStat = $scope.newTransferStat;
        console.log("Adding a new transfer stat:" + JSON.stringify(newTransferStat, null, 2));
        $http.post(API, newTransferStat).then(function(response) {
            console.log("POST Response:" + response.status + " " + response.data);
            $scope.message = "El recurso ha sido añadido correctamente";

            $scope.newPopStat = "";
            refresh();
        }).catch(function(data) {
                    console.log(data.status);
                    $scope.message = "Ya existe un recurso con esos datos. Por favor, introduce unos datos correctos";
                });

    };
    
    $scope.EditTransferStat = function(Ucountry,Useason,Uteam,Umoneyspent,Umoneyentered,Unumberofsignings,Unumberoffarewells){
        console.log("Editing"+" "+Ucountry+" "+Useason+" "+Uteam);
        $http.put(API+"/"+Ucountry+"/"+Uteam+"/"+Useason,{
           country:Ucountry,
           season:Useason,
           team:Uteam,
           moneyspent:Umoneyspent,
           moneyentered:Umoneyentered,
           numberofsignings:Unumberofsignings,
           numberoffarewells:Unumberoffarewells
        }).then(function(response){
           console.log("PUT Response:" + response.status + " " + response.data);
           refresh();
           $scope.message = "El recurso " + Ucountry + Uteam + Useason + " ha sido actualizado";
        });
    };
    

    $scope.deleteTransferStat = function(country, team, season) {
        console.log("Deleting transfer stat with country:"+country+", season:"+season+"and team:"+team);
        $http.delete(API+"/"+country+"/"+team+"/"+season).then(function(response){
             console.log("Delete Response:" + response.status + " " + response.data);
             refresh();
             $scope.message = "El recurso " + country + team + season +" ha sido borrado";
             
        });
    };
    
    $scope.deleteAll = function() {
            $http.delete(API)
                .then(function(response) {
                    console.log("delete all response" + response.statusText);
                    $scope.message = "Se han borrado todos los datos con éxito";
                    refresh();
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
        
$scope.formVisibility=false;
$scope.ShowForm=function(){
    $scope.formVisibility=true;
    console.log($scope.formVisibility);
};
$scope.HideForm=function(){
    $scope.formVisibility=false;
    console.log($scope.formVisibility);
};


$scope.ver = function() {
            var offset = $scope.offset;
            var limit = $scope.limit;
            console.log("ver de " + offset + " a " + limit);
            console.log("<" + API + "?limit=" + limit + "?offset=" + offset + ">");
            $http.get(API + "?limit=" + limit + "?offset=" + offset)
                .then(function(response) {
                    $scope.transferstats = response.data;
                    $scope.message = response.statusText;
                });
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
