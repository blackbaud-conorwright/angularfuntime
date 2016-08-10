var app = angular.module("app", []);

app.service("PandaDataService", function($http){
  return {
    stories: $http.get("./resources/stories.json")
  };
});

app.controller("PandaController", function($scope){
  $scope.pandas = ["Red", "Big"];
  $scope.addPandaText = "";
  $scope.removePanda = function(index){
    $scope.pandas.splice(index, 1);
  };
  $scope.addPanda = function(panda){
    $scope.pandas.push(panda);
    $scope.addPandaText = "";
    document.getElementById("pandaInput").focus();
  };
});

app.controller("StoryController", function($scope, PandaDataService){
  $scope.stories = [];
  PandaDataService.stories.then(function(response){
    $scope.stories = response.data;
  });
  $scope.removeStory = function(index){
    $scope.stories.splice(index, 1);
  };
});
