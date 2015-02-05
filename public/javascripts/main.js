var app = angular.module("socialBoard", [])

app.controller("MainController", ['$http', '$scope', function($http, $scope) {
  $scope.tweeters = [];

  $scope.addNewHandle = function() {
    var tweeter = { loading: true, screen_name: $scope.newHandle };
    $scope.tweeters.push(tweeter);
    $http.get("/tweeter/" + tweeter.screen_name).success(function(data) {
      tweeter.name = data.name;
      tweeter.url = data.url;
      tweeter.tweets = data.tweets;
      tweeter.retweets = data.retweets;
      tweeter.favorites = data.favorites;
      tweeter.weight = data.favorites + (1.5 * data.retweets);
      tweeter.loading = false;
    });
  };

  // $scope.tweeters.forEach(function(tweeter) {
  // });
}]);
