angular.module('starter.services', [])

.service('RssService', function($http) {
this.getData = function(num, successCallback, errorCallback) {
    $http({
        method: 'GET',
        url: 'http://ajax.googleapis.com/ajax/services/feed/load',
        params: { "v": "1.0", "num": num, "q": "http://probasketballtalk.nbcsports.com/feed/" }
     }).success(function(data) {
        // With the data successfully returned, call our callback
        successCallback(data);
    }).error(function(data) {
        errorCallback(data);
    });
 }
});
