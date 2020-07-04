'use strict';

(function () {
  var PIN_HEIGHT = window.constants.PIN_HEIGHT;
  var PIN_WIDTH = window.constants.PIN_WIDTH;
  var MAP_MIN_TOP = window.constants.MAP_MIN_TOP;
  var MAP_MAX_TOP = window.constants.MAP_MAX_TOP;
  var MAP_MIN_LEFT = window.constants.MAP_MIN_LEFT;
  var SCREEN_MAX_WIDTH = window.constants.SCREEN_MAX_WIDTH;

  var pinMain = document.querySelector('.map__pin--main');
  var addressInput = document.querySelector('#address');

  var fillAddressFieldInactiveState = function () {
    var left = parseInt(pinMain.style.left, 10);
    var top = parseInt(pinMain.style.top, 10);
    var pinLeft = Math.floor(left + PIN_WIDTH / 2);
    var pinTop = Math.floor(top + PIN_WIDTH / 2);

    addressInput.value = pinLeft + ', ' + pinTop;
  };

  var fillAddressFieldActiveState = function () {
    var left = parseInt(pinMain.style.left, 10);
    var top = parseInt(pinMain.style.top, 10);
    var pinLeft = Math.floor(left + PIN_WIDTH / 2);
    var pinTop = Math.floor(top + PIN_HEIGHT);

    addressInput.value = pinLeft + ', ' + pinTop;
  };

  var onMapPinMouseDown = function (evt) {
    if (evt.button === 0) {
      window.activeState.switch();


      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
        pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
        fillAddressFieldActiveState();

        if (screen.width >= SCREEN_MAX_WIDTH) {
          var pinMaxLeft = SCREEN_MAX_WIDTH - (PIN_WIDTH / 2);
        } else {
          pinMaxLeft = screen.width - (PIN_WIDTH / 2);
        }

        var top = parseInt(pinMain.style.top, 10);
        if (top <= MAP_MIN_TOP || top >= MAP_MAX_TOP) {
          document.removeEventListener('mousemove', onMouseMove);
        }

        var left = parseInt(pinMain.style.left, 10);
        if (left <= MAP_MIN_LEFT || left >= pinMaxLeft) {
          document.removeEventListener('mousemove', onMouseMove);
        }
      };

      var onMouseUp = function () {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  };

  var onMapPinEnterPress = function (evt) {
    if (evt.key === 'Enter') {
      window.activeState.switch();
    }
  };

  window.move = {
    fillActiveState: fillAddressFieldActiveState,
    fillInactiveState: fillAddressFieldInactiveState,
    onMouseDown: onMapPinMouseDown,
    enterPress: onMapPinEnterPress
  };
})();
