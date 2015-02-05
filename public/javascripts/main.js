var team = ["niolmccartney", "TLawesomeness", "Spinaldash", "EmileMuny", "tommyjanszen", "soyzamudio", "GrYoT", "cadenichols"];

var app = angular.module("socialBoard", [])

app.controller("MainController", ['$http', '$scope', function($http, $scope) {
  $scope.ready = true;
  $scope.tweeters = [];
}]);
