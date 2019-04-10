/* global angular */

var app = angular.module("MiniPostmanApp");

app.controller("MainCtrl", ["$scope","$http", function ($scope,$http){
                console.log("MainCtrl initialized");
                $scope.url = "/api/v1/transfer-stats";
            
                
                $scope.send = function(){
                    $http.get($scope.url).then(function (response){
                        $scope.status = response.status;
                        $scope.data = JSON.stringify(response.data,null,2);
                    }, function (error){
                        $scope.status = error.status;
                        $scope.data = "";
                    });
                };
                
                $scope.post = function(){
                    $http.post($scope.url,$scope.body).then(function (response){
                        $scope.status = response.status;
                        $scope.data = "";
                    }, function (error){
                        $scope.status = error.status;
                        $scope.data = "";
                    });
                };
                
                $scope.put = function(){
                    $http.put($scope.url,$scope.body).then(function (response){
                        $scope.status = response.status;
                        $scope.data = "";
                    }, function (error){
                        $scope.status = error.status;
                        $scope.data = "";
                    });
                };
                
                $scope.delete = function(){
                    $http.delete($scope.url).then(function(response){
                        $scope.status = response.status;
                        $scope.data = "";
                    }, function (error){
                        $scope.status = error.status;
                        $scope.data = "";
                    });
                };
}]);