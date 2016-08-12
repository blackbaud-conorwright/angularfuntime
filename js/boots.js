angular
.module("stache", ["sky", "ui.bootstrap"])
.run(["$rootScope", "bbWait", function ($rootScope, bbWait) {
   $rootScope.$on("bbBeginWait", function (e, opts) {
       e.stopPropagation();
       bbWait.beginPageWait(opts);
   });

   $rootScope.$on("bbEndWait", function (e, opts) {
       e.stopPropagation();
       bbWait.endPageWait(opts);
   });
}]);

/*global angular, alert*/
(function () {
    'use strict';
    var app = angular.module('stache');
    app.controller('TestController', function ($scope) {
    });
    app.service('Session', Session);
    function Session($q, $window){
        this.authenticate = function(username, password){
          return $q.when([]).then(function(user){
            $window.localStorage.setItem('currentUser', JSON.stringify(user));
            return user;
          });
        };
        this.rehydrate = function(){
          Session.currentUser = JSON.parse($window.localStorage.getItem('currentUser'));
          Session.isAuthenticated = Session.currentUser != null;
        };
        this.currentUser = null;
        Session.isAuthenticated = false;
    };
    Session.$inject = ['$q', '$window'];
    app.controller('SessionController', function($scope, Session){
      $scope.login = function(username, password){
        alert('hello ' + username + ':' + password);
      };
      $scope.isAuthenticated = Session.isAuthenticated;
    });

    app.service("Stories", function(){
      return {
        stories: [{
          image: "http://unsplash.it/100/100",
          id: 1,
          votes: 0,
          text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae, eligendi, aperiam, quae, aut officia a voluptatibus fuga ab vel facere similique natus quod unde consequuntur quibusdam error fugiat amet mollitia."
        },
        {
          image: "http://unsplash.it/100/100",
          id: 2,
          votes: 0,
          text: "Don't vote for me"
        }]
      };
    });

    app.controller('StoryController', function($scope, $http, Stories){
      $scope.stories = Stories;
      $scope.vote = function(target){
        $http({
          url: "https://morning-oasis-6754.herokuapp.com/stories/143/story_votes.json",
          type: "POST",
          data: {
            "story_vote": {
              "vote_type": "story",
              "story_id": target,
              "submitter_id": 1
            }
          }
        }).then(function(response){
          console.log(response);
          console.log("got a vote for: "+target);
          $scope.stories.stories[target-1].votes+=1;
        });
      }
    });

  }());
