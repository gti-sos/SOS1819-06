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
                .when("/transfer-stats",{
                   controller: "transferstatsListCtrl",
                   templateUrl: "transferstatsList.html"
                })
                .when("/transfer-stats/edit/:country/:team/:season",{
                   controller : "transferstatsEditCtrl",
                   templateUrl: "transferstatsEdit.html"
                })
                ;
        });

    console.log("Manager App Initialized.");