'use strict';

(function () {
  var onMapPinMouseDown = function (evt) {
    if (evt.button === 0) {
      window.activeState.switch();
    }
  };

  var onMapPinEnterPress = function (evt) {
    if (evt.key === 'Enter') {
      window.activeState.switch();
    }
  };

  window.callback = {
    mouseDown: onMapPinMouseDown,
    enterPress: onMapPinEnterPress
  };
})();
