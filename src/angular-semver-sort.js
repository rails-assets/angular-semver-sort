;angular.module('semverSort', []).filter('semverSort', [
  '$window', '$log', function($window, $log) {
    'use strict';

    var semver = $window.semver;

    var WARNING_FALLBACK = '`semverSort` will fall back to alphabetical sorting.';
    var WARNING_UNAVAILABLE = 'Semver library is unvailable. ' + WARNING_FALLBACK;
    var WARNING_NONSEMVER = 'This collection contains non-semver strings. ' + WARNING_FALLBACK;

    var sortAlphabetically = function(collection, prop) {
      var items = collection.slice(0);
      return !prop ? items.sort() : items.sort(function(A, B) {
        var a = A[prop], b = B[prop];
        if ( a > b ) return 1;
        if ( a < b ) return -1;
        return 0;
      });
    };

    if ( !(semver && 'SEMVER_SPEC_VERSION' in semver) ) {
      $log.warn(WARNING_UNAVAILABLE);
      return sortAlphabetically;
    }

    var areItemsValid = function(collection, prop) {
      var items = !prop ? collection : collection.map(function(item) {
        return item[prop];
      });
      return items.every(function(item) {
        return semver.valid(item, true);
      });
    };

    return function(collection, prop) {
      if ( !areItemsValid(collection, prop) ) {
        $log.warn(WARNING_NONSEMVER);
        return sortAlphabetically(collection, prop);
      }

      var items = collection.slice(0);
      return !prop ? semver.sort(items, true) : items.sort(function(A, B) {
        return semver.compare(A[prop], B[prop], true);
      });
    };
  }
]);
