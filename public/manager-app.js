/* global angular */

    angular
        .module("ManagerApp",["ngRoute"])
        .config( function ($routeProvider){
            $routeProvider
                .when("/",{
                   templateUrl: "infoteam.html"
                })
                .when("/uefa-country-rankings",{
                   controller: "uefacountryListCtrl",
                   templateUrl: "uefacountryrankingsList.html"
                })
                .when("/uefa-country-rankings/edit/:country/:season",{
                   controller : "uefacountryEditCtrl",
                   templateUrl: "uefacountryrankingsEdit.html"
                })
                ;
        });

    console.log("Manager App Initialized.");