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

.controller("FeedController", function($scope, RssService) {
  $scope.items = [];
  var defaultNum = 5;

  function getData(num) {
    return RssService.getData(num,
      function (response) {
        $scope.items = response;
      },
      function (error) {
        console.log("ERROR: " + data);
    });
  }

  $scope.init = function() {
    getData(defaultNum);
  };

  $scope.doRefresh = function() {
    getData(defaultNum);
     // Stop the ion-refresher from spinning
     $scope.$broadcast('scroll.refreshComplete');
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
