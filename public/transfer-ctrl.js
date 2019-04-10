/*global angular*/

var app = angular.module("MiniPostmanApp");

app.controller("MainCtrl", ["$scope", "$http", function ($scope, $http){
                
                console.log("MainCtrl ready");
                
                $scope.url = "/api/v1/uefa-club-rankings";
                
                $scope.nombre = "Africa";
                
                $scope.anyo = "1960";
                
                $scope.emisiones = "1,05";
                
                $scope.load = function (){
                    
                    $http.get("/api/v1/issue-dioxid/loadInitialData").then(function (response){
                        
                        $scope.data = JSON.stringify(response.data, null, 2);
                        
                    }, function (error){
                        
                        $scope.data = JSON.stringify(error.data, null, 2);
                        
                    });
                };
                
                $scope.get = function (){
                    
                    $http.get($scope.url).then(function (response){
                        
                        $scope.data = JSON.stringify(response.data, null, 2);
                        
                    }, function (error){
                        
                        $scope.data = JSON.stringify(error.data, null, 2);
                        
                    });
                };
                
                $scope.post = function (){
                    
                    var objeto = ({
                    
                        nombre_del_pais: $scope.nombre,
                        año: $scope.anyo,
                        emisiones_de_co2: $scope.emisiones
                    });
                    
                    $http.post($scope.url, objeto).then(function (response){
                        
                        $scope.data2 = JSON.stringify(response.data, null, 2);
                        
                    }, function (error){
                        
                        $scope.data2 = JSON.stringify(error.data, null, 2);
                        
                    });
                };
                
                $scope.put = function (){
                    
                    var objeto = ({
                    
                        nombre_del_pais: $scope.nombre,
                        año: $scope.anyo,
                        emisiones_de_co2: $scope.emisiones
                    });
                    
                    $http.put($scope.url, objeto).then(function (response){
                        
                        $scope.data2 = JSON.stringify(response.data, null, 2);
                        
                    }, function (error){
                        
                        $scope.data2 = JSON.stringify(error.data, null, 2);
                        
                    });
                };
                
                $scope.delete = function (){
                    
                    $http.delete($scope.url).then(function (response){
                        
                        $scope.data = JSON.stringify(response.data, null, 2);
                        
                    }, function (error){
                        
                        $scope.data = JSON.stringify(error.data, null, 2);
                        
                    });
                };
}]);