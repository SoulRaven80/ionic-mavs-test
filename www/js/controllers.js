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

.controller('NewsController', function($scope, $http) {

  $scope.items = [
    { id: 1,
      date: 'Sun, 31 Jan 2016 20:30:19 +0000',
      title: 'Hoiberg says Bulls likely to stand pat at trade deadline',
      link: 'http://nba.nbcsports.com/2016/01/31/hoiberg-says-bulls-likely-to-stand-pat-at-trade-deadline/',
      description : 'They get Mike Dunleavy back soon.',
      mediaurl: 'http://nbcprobasketballtalk.files.wordpress.com/2016/01/zz03yje3zgezyzaymty1yjc5otg2nge5y2u3njfkzmuxzq-e1454268902310.jpg?w=200'
    },
    { id: 2,
      date: 'Sun, 31 Jan 2016 19:18:57 +0000',
      title: 'Rumor: Lakers believe Russell Westbrook coming in 2017',
      link: 'http://nba.nbcsports.com/2016/01/31/rumor-lakers-believe-russell-westbrook-coming-in-2017/',
      description : 'Don\'t expect this to happen but the rumor is out there.',
      mediaurl: 'http://nbcprobasketballtalk.files.wordpress.com/2016/01/cd05oddlnmnhy2mwmjrlzwqzntjhm2viytq1y2vly2yzocznpte3ytc0otviodg4zjuxmdmwm2myztm1odayodu4zgfm-e1453090153525.jpg?w=200'
    },
    { id: 3,
      date: 'Sun, 31 Jan 2016 17:30:44 +0000',
      title: 'DeMarcus Cousins leaves game with sprained ankle, X-Rays negative',
      link: 'http://nba.nbcsports.com/2016/01/31/demarcus-cousins-leaves-game-with-sprained-ankle-x-rays-negative/',
      description : 'The Kings play Monday, Cousins is day-to-day.',
      mediaurl: 'http://nbcprobasketballtalk.files.wordpress.com/2016/01/zz00njlmmjy0ymq5owqwodg5zdewmmyxywnhotbingyzza.jpg?w=200'
    },
    { id: 4,
      date: 'Sun, 31 Jan 2016 16:56:16 +0000',
      title: 'Wizards: Randy Wittman coached Saturday despite death of brother',
      link: 'http://nba.nbcsports.com/2016/01/31/wizards-randy-wittman-coached-saturday-despite-death-of-brother/',
      description : 'He\'s had a couple deaths around him this season.',
      mediaurl: 'http://nbcprobasketballtalk.files.wordpress.com/2016/01/zz00m2y1ndyznzq0otnhzge3mwm4ymy2mwmyn2ixyjbjzg-e1454106131981.jpg?w=200'
    }
  ];

//  $scope.navTitle = '<div class="title"><img src="http://forum.ionicframework.com/user_avatar/forum.ionicframework.com/mhartington/45/7574.png" /> News</div>';

  $scope.doRefresh = function() {
    $http.get('http://probasketballtalk.nbcsports.com/feed/')
     .success(function(newItems) {
       $scope.items = newItems;
     })
     .finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
//       $scope.$apply();
     });
  };
})

.controller("FeedController", function($http, $scope) {
  $scope.init = function() {
    $http.get("http://ajax.googleapis.com/ajax/services/feed/load", { params: { "v": "1.0", "q": "http://probasketballtalk.nbcsports.com/feed/" } })
      .success(function(data) {
        console.log("ERROR: " + data);
        console.log("ERROR: " + data.responseData);
        console.log("ERROR: " + data.responseData.feed);
        console.log("ERROR: " + data.responseData.feed.title);
        $scope.date = data.responseData.feed.publishedDate;
        $scope.rssTitle = data.responseData.feed.title;
        $scope.link = data.responseData.feed.link;
        $scope.description = data.responseData.feed.contentSnippet;
//        $scope.mediaurl = data.responseData.feed.mediaGroups[0].contents[0].url;
      })
      .error(function(data) {
        console.log("ERROR: " + data);
      });
  }
  $scope.browse = function(v) {
    window.open(v, "_system", "location=yes");
  }
})
;