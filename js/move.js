'use strict';

(function () {
  var pinMain = document.querySelector('.map__pin--main');
  var PIN_HEIGHT = window.constants.PIN_HEIGHT;
  var PIN_WIDTH = window.constants.PIN_WIDTH;
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
      evt.preventDefault();
      window.activeState.switch();


      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

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
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  };
  // Не знаю как ограничить область передвижения метки (пункты 4.4 и 4.5)

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
