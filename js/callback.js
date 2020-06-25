'use strict';

(function () {
  var updatePins = window.updatePins;

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

  var successHandler = function (elements) {
    updatePins(elements);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: orangeRed; color: white; height: 30px;';
    node.style.position = 'fixed';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '25px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.callback = {
    mouseDown: onMapPinMouseDown,
    enterPress: onMapPinEnterPress,
    successHandler: successHandler,
    errorHandler: errorHandler
  };
})();
