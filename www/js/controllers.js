angular.module('starter.controllers', [])

.controller('ApplicationController', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

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
  $scope.props = [];

  $scope.settings = {
    "team.name": "Dallas Mavericks",
    "keywords":"Dallas:Mavericks:Mavs",
  };

  var defaultNum = 10;
  var initialized = false;
  var alwaysTrueFilter = new AlwaysTrueFilter();
  var keywordsFilter = new KeywordsFilter();
  var urls = [
    { uri: 'http://search.espn.go.com/rss/dallas-mavericks/', filter: alwaysTrueFilter },
    { uri: 'http://www.nba.com/rss/nba_rss.xml', filter: keywordsFilter },
    { uri: 'http://www.mavs.com/feed/', filter: alwaysTrueFilter },
    { uri: 'http://nba.nbcsports.com/feed/', filter: keywordsFilter },
    { uri: 'http://www.si.com/rss/si_nba.rss', filter: keywordsFilter },
    { uri: 'http://rss.nytimes.com/services/xml/rss/nyt/ProBasketball.xml', filter: keywordsFilter },
    { uri: 'http://www.sportsworldnews.com/rss/sections/nba.xml', filter: keywordsFilter }

//    { uri: 'http://thesmokingcuban.com/tag/dallas/feed/', filter: descriptionRequiredFilter },
//    { uri: 'http://sportspyder.com/teams/dallas-mavericks/news.xml', filter: descriptionRequiredFilter },
//    { uri: 'https://sports.yahoo.com/nba/teams/dal/rss.xml', filter: descriptionRequiredFilter },
//    { uri: 'http://probasketballtalk.nbcsports.com/feed/', filter: compositeFilter }
  ];

  function initData() {
    if (!initialized) {
      var keys = $scope.settings['keywords'].split(":");
      angular.forEach(keys, function( key, index ) {
        keywordsFilter.addKeyword(key);
      });
      initialized = true;
    }
  }

  function getData(num) {
    initData();
    angular.forEach(urls, function( url, index ) {
      RssService.getData(num, url,
        function (response) {
          $scope.items = $scope.items.concat(response);
        },
        function (error) {
          console.log("ERROR: " + error);
      });
    });

  }

  $scope.init = function() {
    initData();
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
