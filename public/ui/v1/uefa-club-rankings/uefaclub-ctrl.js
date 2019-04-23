/* global angular*/

angular

    .module("UefaClubApp")
    
    .controller("app-ctrl",["$scope", "$http", function($scope,$http){
        
        console.log("ctrl initialized");
        
        var API = "/api/v1/uefa-club-rankings";
        
        function refresh(){
            $http.get(API).then(function(response){
            
                $scope.uefaclub = response.data;
            });
        }
        
        refresh();
        
        $scope.add = function(){
            var newUefaClub= $scope.newUefaClub;
                
                console.log("adding stats "+JSON.stringify(newUefaClub,null,2));
                
                $http.post(API, newUefaClub)
                     .then(function(response){
                    
                    console.log("post response "+ response.statusText);
                    
                    $scope.message = response.statusText;
                    
                    $scope.newPopStat="";
                    
                    refresh();
                })
                    .catch(function(data){
                        console.log(data.status);
                        $scope.message = data.statusText+" : Añade un recurso con campos correctos";
                    });
        };
        
        $scope.delete = function(uefaclub){
            console.log("deleting stats <"+ uefaclub.team + uefaclub.season +">");
            $http.delete(API+"/"+uefaclub.team+"/"+uefaclub.season)
                 .then(function(response){
                     console.log("delete response"+ response.statusText);
                     $scope.message = response.statusText;
                     refresh();
                     
                 });
        };
        
        $scope.deleteall = function (){
            $http.delete(API)
                 .then(function(response){
                    console.log("delete all response"+ response.statusText);
                    $scope.message = response.statusText;
                    refresh();
                 });
        };
        
        $scope.ver = function () {
            var offset=$scope.offset;
            var limit=$scope.limit;
            console.log("ver de "+ offset +" a " + limit);
            console.log("<"+API+"?limit="+limit+"?offset="+offset+">");
            $http.get(API+"?limit="+limit+"?offset="+offset)
                 .then(function(response){
                     refresh();
                     $scope.uefaclub = response.data;
                     $scope.message = response.statusText;
                     //refresh();
                 });
        };
        
        $scope.buscarTeam = function () {
            var team = $scope.inputTeam;
            console.log("ver recurso : <"+ team + ">");
            $http.get(API+"/"+team)
                 .then(function(response){
                     $scope.uefaclub = response.data;
                     //refresh();
                 })
                 .catch(function(data){
                        console.log(data.status);
                        refresh();
                        $scope.message = data.statusText+" : El recurso "+team+" no existe";
                    });
        };
        
        $scope.update = function (uefaclub){
            console.log("updating stats <"+ uefaclub.team +">");
            $scope.updateUefacClub = uefaclub;
        };
        
        $scope.guardarUpdate = function (updateUefacClub) {
            updateUefacClub = $scope.updateUefacClub;
            console.log("PUT : "+API+"/"+updateUefacClub.team+"/"+updateUefacClub.season);
            $http.put(API+"/"+updateUefacClub.country+"/"+updateUefacClub.year,updateUefacClub)
                 .then( function(response){
                     console.log("Put response : "+response.status);
                     $scope.updateUefacClub = "";
                     refresh();
                    $scope.message = response.statusText;
                    
                });
        };
        
    }]);