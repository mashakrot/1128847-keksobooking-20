'use strict';

(function () {
  var DEBOUNCE_INTERVAL = window.constants.DEBOUNCE_INTERVAL;

  var debounce = function (callback) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        callback.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.debounce = debounce;
})();
