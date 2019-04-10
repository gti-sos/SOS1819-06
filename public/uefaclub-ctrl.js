/*global angular*/

var app = angular.module("MiniPostmanApp");

app.controller("MainCtrl", ["$scope", "$http", function ($scope, $http){
                
                console.log("MainCtrl ready");
                
                $scope.url = "/api/v1/uefa-club-rankings";
                $scope.country = "ESP";
                $scope.season = 2018;
                $scope.points = 146000;
                $scope.ptsseason = 19000;
                $scope.ptsbeforeseason = 32000;
                $scope.team = "Madrid";
                
                $scope.load = function (){
                    
                    $http.get("/api/v1/uefa-club-rankings/loadInitialData").then(function (response){
                        
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
                        country:  $scope.country,
                        season: $scope.season,
                        points:  $scope.points,
                        ptsseason: $scope.ptsseason,
                        ptsbeforeseason: $scope.ptsbeforeseason,
                        team:  $scope.team
                    });
                    
                    $http.post($scope.url, objeto).then(function (response){
                        
                        $scope.data2 = JSON.stringify(response.data, null, 2);
                        
                    }, function (error){
                        
                        $scope.data2 = JSON.stringify(error.data, null, 2);
                        
                    });
                };
                
                $scope.put = function (){
                    
                    var objeto = ({
                        country:  $scope.country,
                        season: $scope.season,
                        points:  $scope.points,
                        ptsseason: $scope.ptsseason,
                        ptsbeforeseason: $scope.ptsbeforeseason,
                        team:  $scope.team
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