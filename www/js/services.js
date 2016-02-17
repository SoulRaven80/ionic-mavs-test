angular.module('starter.services', [])

.service('RssService', function($http) {
  this.getData = function(num, url, successCallback, errorCallback) {
    $http({
        method: 'GET',
        url: 'http://ajax.googleapis.com/ajax/services/feed/load',
        params: { "v": "1.0", "num": num, "q": url.uri }
     }).then(function(response) {
          // With the data successfully returned, call our callback
        successCallback(processData(response.data.responseData.feed.entries, url.filter));
     }, function(data) {
      errorCallback(data);
     });
  }

  function processData(entries, filter) {
    var newData = [];
    angular.forEach(entries, function(entry, index) {
      if ( doFilter(entry, filter) ) {
        var newEntry = new Object();
        newEntry.date = new Date(entry.publishedDate);
        newEntry.title = entry.title;
        newEntry.description = entry.contentSnippet;
        newEntry.link = entry.link;
        if (typeof entry.mediaGroups != 'undefined' &&
          typeof entry.mediaGroups[0] != 'undefined' &&
          typeof entry.mediaGroups[0].contents != 'undefined' &&
          typeof entry.mediaGroups[0].contents[0] != 'undefined') {
            newEntry.mediaurl = entry.mediaGroups[0].contents[0].url;
        }

        newData[index] = newEntry;
      }
    });
    return newData;
  }

  function doFilter(entry, filter) {
    return filter.doFilter(entry);
  }
});
