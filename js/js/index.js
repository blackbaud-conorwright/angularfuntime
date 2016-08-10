var app = angular.module("app", []);

app.service("PandaDataService", function($http){
  return {
    stories: $http.get("./resources/stories.json")
  };
});

app.controller("PandaController", function($scope){
  $scope.pandas = ["Red", "Big"];
  $scope.addPandaText = "";
  $scope.pandaSearch = "";
  $scope.removePanda = function(index){
    $scope.pandas.splice(index, 1);
  };
  $scope.addPanda = function(panda){
    $scope.pandas.push(panda);
    $scope.addPandaText = "";
    document.getElementById("pandaInput").focus();
    return true;
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

app.directive("story-info", function(){
  
});

template = "<li class='story-item item' ng-repeat='story in stories' ng-click='removeStory($index)'>{{story.title}}</li>"
