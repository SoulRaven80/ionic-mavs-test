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

.filter('unique', function() {
   return function(collection, keyname) {
      var output = [],
          keys = [];

      angular.forEach(collection, function(item) {
          var key = item[keyname];
          if(keys.indexOf(key) === -1) {
              keys.push(key);
              output.push(item);
          }
      });
      return output;
   };
})

.controller("FeedController", function($scope, RssService) {
  $scope.items = [];
  var defaultNum = 10;
  var urls = ['http://search.espn.go.com/rss/dallas-mavericks/',
          'http://probasketballtalk.nbcsports.com/feed/'];

  function getData(num) {
    angular.forEach(urls, function( url, index ) {
      RssService.getData(num, url,
        function (response) {
          $scope.items = $scope.items.concat(response);
        },
        function (error) {
          console.log("ERROR: " + data);
      });
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
