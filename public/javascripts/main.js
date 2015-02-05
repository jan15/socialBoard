var team = ["TK_codebear", "niolmccartney", "TLawesomeness", "Spinaldash", "EmileMuny", "tommyjanszen", "soyzamudio", "GrYoT", "cadenichols"];

var app = angular.module("socialBoard", [])

app.controller("MainController", ['$http', '$scope', function($http, $scope) {
  $scope.tweeters = team.map(function(handle) { return { loading: true, screen_name: handle } });

  $scope.tweeters.forEach(function(tweeter) {
    $http.get("/tweeter/" + tweeter.screen_name).success(function(data) {
      tweeter.name = data.name;
      tweeter.url = data.url;
      tweeter.tweets = data.tweets;
      tweeter.retweets = data.retweets;
      tweeter.favorites = data.favorites;
      tweeter.weight = data.favorites + (1.5 * data.retweets);
      tweeter.loading = false;
    });
  });
}]);
