'use strict';

(function () {
  var PIN_HEIGHT = window.constants.PIN_HEIGHT;
  var PIN_WIDTH = window.constants.PIN_WIDTH;
  var PIN_HALF_WIDTH = window.constants.PIN_HALF_WIDTH;
  var MAP_MIN_TOP = window.constants.MAP_MIN_TOP;
  var MAP_MAX_TOP = window.constants.MAP_MAX_TOP;
  var MAP_MIN_LEFT = window.constants.MAP_MIN_LEFT;

  var MAP_LEFT_BORDER = MAP_MIN_LEFT - PIN_WIDTH / 2;
  var MAP_TOP_BORDER = MAP_MIN_TOP - PIN_HEIGHT;
  var MAP_BOTTOM_BORDER = MAP_MAX_TOP - PIN_HEIGHT;

  var body = document.querySelector('body');
  var map = document.querySelector('.map');
  var pinMain = document.querySelector('.map__pin--main');
  var addressInput = document.querySelector('#address');

  var INACTIVE_STATE_PIN_LEFT = pinMain.offsetLeft;
  var INACTIVE_STATE_PIN_TOP = pinMain.offsetTop;

  var fillAddressFieldInactiveState = function () {
    var pinLeft = Math.floor(INACTIVE_STATE_PIN_LEFT + PIN_HALF_WIDTH);
    var pinTop = Math.floor(INACTIVE_STATE_PIN_TOP + PIN_HALF_WIDTH);

    addressInput.value = pinLeft + ', ' + pinTop;
  };

  var fillAddressFieldActiveState = function () {
    var left = pinMain.offsetLeft;
    var top = pinMain.offsetTop;
    var pinLeft = Math.floor(left + PIN_HALF_WIDTH);
    var pinTop = Math.floor(top + PIN_HEIGHT);

    addressInput.value = pinLeft + ', ' + pinTop;
  };

  var onMapPinMouseDown = function (evt) {
    if (evt.button === 0) {
      if (map.classList.contains('map--faded')) {
        window.activeState.switch();
      }

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

        var pinMaxLeft = body.clientWidth - (PIN_WIDTH / 2);
        var newPointX = pinMain.offsetLeft - shift.x;
        if (newPointX < MAP_LEFT_BORDER) {
          newPointX = MAP_LEFT_BORDER;
        }
        if (newPointX > pinMaxLeft) {
          newPointX = pinMaxLeft;
        }

        var newPointY = pinMain.offsetTop - shift.y;
        if (newPointY < MAP_TOP_BORDER) {
          newPointY = MAP_TOP_BORDER;
        }

        if (newPointY > MAP_BOTTOM_BORDER) {
          newPointY = MAP_BOTTOM_BORDER;
        }

        pinMain.style.top = newPointY + 'px';
        pinMain.style.left = newPointX + 'px';
        fillAddressFieldActiveState();
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
