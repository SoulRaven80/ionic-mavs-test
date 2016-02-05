angular.module('starter.services', [])

.service('RssService', function($http) {
  this.getData = function(num, successCallback, errorCallback) {
    $http({
        method: 'GET',
        url: 'http://ajax.googleapis.com/ajax/services/feed/load',
        params: { "v": "1.0", "num": num, "q": "http://probasketballtalk.nbcsports.com/feed/" }
     }).success(function(data) {
        // With the data successfully returned, call our callback
        successCallback(standarizedData(data.responseData.feed.entries, "probasketballtalk"));
    }).error(function(data) {
        errorCallback(data);
    });
  }

  function standarizedData(entries, format) {
    var newData = [];
    if (format == "probasketballtalk") {
      angular.forEach(entries, function( entry, index ) {
        var newEntry = new Object();
        newEntry.date = new Date(entry.publishedDate);
        newEntry.title = entry.title;
        newEntry.description = entry.contentSnippet;
        newEntry.mediaurl = entry.mediaGroups[0].contents[0].url;
        newEntry.link = entry.link;

        newData[index] = newEntry;
      });
    }
    return newData;
  }
});
