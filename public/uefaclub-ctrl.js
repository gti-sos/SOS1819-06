/*global angular*/
var app=angular.module("MiniPostmanApp");
app.controller("MainCtrl",["$scope","$http",function($scope,$http){
                  console.log("MainCtrl initialized");
                  $scope.url="/api/v1/uefa-club-rankings";
                  
                  $scope.send = function(){
                      $http.get($scope.url).then(function(response){
                      $scope.data=JSON.stringify(response.data,null,2);
                  });
                  };
                  
              }]);