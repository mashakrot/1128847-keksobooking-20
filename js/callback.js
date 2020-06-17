'use strict';

(function () {
  var onMapPinMouseDown = function (evt) {
    if (evt.button === 0) {
      window.activeState.switchToActiveState();
    }
  };

  var onMapPinEnterPress = function (evt) {
    if (evt.key === 'Enter') {
      window.activeState.switchToActiveState();
    }
  };

  window.callback = {
    onMapPinMouseDown: onMapPinMouseDown,
    onMapPinEnterPress: onMapPinEnterPress
  };
})();
