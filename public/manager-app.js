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
                .when("/uefa-club-rankings",{
                   controller: "UefaClubRankingsList-ctrl",
                   templateUrl: "uefaclubList.html"
                })
                .when("/uefa-club-rankings/edit/:team/:season",{
                   controller : "UefaClubRankingsEdit-ctrl",
                   templateUrl: "uefaclubEdit.html"
                })
                .when("/uefa-club-rankings/analytics",{
                   controller : "UefaClubAnalytics-ctrl",
                   templateUrl: "uefaclubAnalytics.html"
                })
                .when("/transfer-stats/analytics",{
                   controller : "transferStatsAnalytics-ctrl",
                   templateUrl: "transferStatsAnalytics.html"
                })
                .when("/uefa-country-rankings/analytics",{
                   controller : "UefaCountryAnalytics-ctrl",
                   templateUrl: "UefaCountryAnalytics.html"
                }).when("/analytics",{
                        controller: "groupAnalytics-ctrl",
                        templateUrl: "analytics.html"
                }).when("/integrations",{
                        templateUrl: "integration.html"
                }).when("/integrations-uefa-club-rankings",{
                        controller: "integrations-uefa-club-ctrl",
                        templateUrl: "integrations-uefa-club.html"
                })
                .when("/integrations-uefa-country-rankings",{
                        controller: "uefa-country-integrations-ctrl",
                        templateUrl: "uefa-country-integrations.html"
                })
                ;
        });

    console.log("Manager App Initialized.");