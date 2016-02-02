angular.module('starter.controllers', [])

.controller('ApplicationController', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/news.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

})

.controller("FeedController", function($http, $scope) {
  $scope.items = [];
  var defaultNum = 5;

  function getData(num) {
    return $http.get("http://ajax.googleapis.com/ajax/services/feed/load", {
        params: { "v": "1.0", "num": num, "q": "http://probasketballtalk.nbcsports.com/feed/" }
      })
      .success(function(data) {
//        console.log("ERROR: " + data.responseData.feed.entries[0].title);
        $scope.items = data.responseData.feed.entries;
      })
      .error(function(data) {
        console.log("ERROR: " + data);
      });
  };

  $scope.init = function() {
    getData(defaultNum);
  };

  $scope.doRefresh = function() {
    getData(defaultNum)
    .finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
  };

  $scope.loadMore = function() {
    getData($scope.items.length + defaultNum);
    $scope.$broadcast('scroll.infiniteScrollComplete');
  };

  $scope.$on('$stateChangeSuccess', function() {
    $scope.loadMore();
  });

  $scope.browse = function(v) {
    window.open(v, "_system", "location=yes");
  };
})
;
