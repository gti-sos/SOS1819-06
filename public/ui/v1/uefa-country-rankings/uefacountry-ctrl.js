/* global angular */

angular.module("UefaCountryApp").controller("MainCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("MainCtrl initialized");
    var API = "/api/v1/uefa-country-rankings";
    refresh();
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.alerts=[];
    function refresh() {
        console.log("Requesting uefa country ranking to <" + API + ">...");
        $http.get(API).then(function(response) {
            console.log("Data Received:" + JSON.stringify(response.data, null, 2));
            $scope.uefacountries = response.data;
        });
    };
    
    $scope.loadInitial=function(){
        console.log("Load Initial Data");
        $http.get(API+"/loadInitialData").then(function(response) {
            console.log("Load Initial data:" + JSON.stringify(response.status, null, 2));
            refresh();
            $scope.alerts=[];
            $scope.alerts.push({msg:"Datos cargados con éxito"});
        },function(response){
                    console.log(response.status);
                    $scope.alerts=[];
                    $scope.alerts.push({msg:"No se pueden cargar los datos: La lista de elementos no está vacía"});

});
    };
    
    $scope.findCountry = function(country,season,from,to,position,fromPoints,toPoints,teams){
            var url=API;
            if(typeof country!='undefined' || country!="" || country!=null){
                url=url+"/"+country;
            }
            console.log("Requesting uefa country ranking to <" + url + ">...");
                $http.get(url).then(function(response) {
                console.log(response.status);
                console.log("Data Received:" + JSON.stringify(response.data, null, 2));
                $scope.uefacountries = response.data;
                $scope.alerts=[];
                $scope.alerts.push({msg:"Operación realizada con éxito"});
                },function(response){
                    console.log(response.status);
                    refresh();
                    $scope.alerts=[];
                    $scope.alerts.push({msg:"Error: El dato con los campos: "+country+" "+ " no fue encontrado"});

});
    };
    
    $scope.addUefaCountry = function() {
        var newUefaCountry = $scope.newUefaCountry;
        console.log("Adding a new uefa country:" + JSON.stringify(newUefaCountry, null, 2));
        $http.post(API, newUefaCountry).then(function(response) {
            console.log("POST Response:" + response.status + " " + response.data);
            refresh();
            $scope.alerts=[];
            $scope.alerts.push({msg:"Elemento: "+newUefaCountry.country+" " +newUefaCountry.season+" creado con éxito"});
            
        },function(response){
                    console.log(response.status);
                    $scope.alerts=[];
                    $scope.alerts.push({msg:"Error: Comprueba los campos añadidos"});

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
            $scope.alerts=[];
            $scope.alerts.push({msg:Ucountry+" " +Useason+" editado correctamente"});
        },function(response){
                    console.log(response.status);
                    refresh();
                    $scope.alerts=[];
                    $scope.alerts.push({msg:"Error: Datos introducidos incorrectamente."});

});
    };
    

    $scope.deleteUefaCountry = function(country, season) {
        
        console.log("Deleting uefaCountry with country:"+country+" and season:"+season);
        $http.delete(API+"/"+country+"/"+season).then(function(response){
             console.log("Delete Response:" + response.status + " " + response.data);
             refresh();
             $scope.alerts=[];
             $scope.alerts.push({msg:country+" de la temporada "+season+" "+"borrado correctamente"});
             
        });
    };
    
    $scope.deleteAll = function() {
        console.log("Deleting All");
        $http.delete(API).then(function(response){
             console.log("Delete Response:" + response.status + " " + response.data);
             refresh();
             $scope.alerts=[];
             $scope.alerts.push({msg:"Todos los elementos borrados correctamente"});
             
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

 $scope.setPage = function(index) {
        $scope.currentPage = index - 1;
    };



}]).filter("startFrom", function() {
    return function(input, start) {
        start = +start;
        return input.slice(start);
    };
});
