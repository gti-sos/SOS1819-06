angular
  .module("ManagerApp")
  .controller("groupAnalytics-ctrl", ["$scope", "$http", function($scope, $http) {
    console.log("Group Analytics Controller initialized");
    var response = [];
    var dataAll = [];
    $http.get("/api/v1/uefa-club-rankings").then(function(responseClub) {
      for (var i in responseClub.data) {
        response.push("Uefa Club: " + responseClub.data.map(function(d) { return d["team"] + " " + d["season"] })[i]);
        dataAll.push(responseClub.data.map(function(d) { return d["points"] })[i]);
      }
      $http.get("/api/v1/uefa-country-rankings").then(function(responseCountry) {
        for (var i in responseCountry.data) {
          response.push("Uefa Country: " + responseCountry.data.map(function(d) { return d["country"] + " " + d["season"] })[i]);
          dataAll.push(responseCountry.data.map(function(d) { return d["points"] })[i]);
        }
        $http.get("/api/v1/transfer-stats").then(function(responseTransfer) {
          for (var i in responseTransfer.data) {
            response.push("Transfer-stats: " + responseTransfer.data.map(function(d) { return d["team"] + " " + d["season"] })[i])
            dataAll.push(responseTransfer.data.map(function(d) { return d["moneyspent"] })[i]);
          }


          console.log(response);
          console.log(dataAll);
          Highcharts.chart('groupal', {
            chart: {
              type: 'bar',
              height: 100+"%"
            },
            title: {
              text: 'Group Analytics'
            },
            xAxis: {
              categories: response,
              title: {
                text: null
              }
            },
            yAxis: {
              min: 0,
              title: {
                text: 'Quantity',
                align: 'high'
              },
              labels: {
                overflow: 'justify'
              }
            },
            series: [{
              name: "Uefa Data",
              data: dataAll
            }]
          });
        });
      });
    });
  }]);
