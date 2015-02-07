var app = angular.module("socialBoard", []);

var handles = JSON.parse(localStorage["tweeters"] || "[]");

app.controller("MainController", ['$http', '$scope', function($http, $scope) {
  $scope.tweeters = [];

  $scope.loading = false;

  $scope.addNewHandle = function() {

    $scope.loading = true;

    if (handles.indexOf($scope.newHandle) < 0) {
      handles.push($scope.newHandle);
      localStorage["tweeters"] = JSON.stringify(handles);
    }
    if ($scope.tweeters.map(function(tweeter) { return tweeter.screen_name }).indexOf($scope.newHandle) >= 0) {
      $scope.error = "Twitter handle already exists";
      return;
    }

    var tweeter = { screen_name: $scope.newHandle };
    $http.get("/tweeter/" + tweeter.screen_name).success(function(data) {
      tweeter.name = data.name;
      tweeter.url = data.url;
      tweeter.tweets = data.tweets;
      tweeter.retweets = data.retweets;
      tweeter.favorites = data.favorites;
      tweeter.weight = data.favorites + (1.5 * data.retweets);
      $scope.error = false;
      console.log($scope.newHandle);
      $scope.newHandle = '';
      $scope.tweeters.push(tweeter);
      $scope.loading = false;
    }).error(function() {
      $scope.error = "Could not add handle";
      $scope.loading = false;
      $scope.newHandle = '';
    });
  };

  handles.forEach(function(handle) {
    $scope.newHandle = handle
    $scope.addNewHandle();
  });

}]);
