'use strict';

(function () {
  // var switchToActiveState = window.activeState.activeState;
  var onMapPinMouseDown = function (evt) {
    if (evt.button === 0) {
      window.activeState.activeState();
    }
  };

  var onMapPinEnterPress = function (evt) {
    if (evt.key === 'Enter') {
      window.activeState.activeState();
    }
  };

  window.callback = {
    mouseDown: onMapPinMouseDown,
    enterPress: onMapPinEnterPress
  };
})();
