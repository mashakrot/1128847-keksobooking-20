'use strict';

(function () {
  var PIN_WIDTH = window.constants.PIN_WIDTH;
  var PIN_HEIGHT = window.constants.PIN_HEIGHT;
  var addressInput = document.querySelector('#address');
  var mapPinMain = document.querySelector('.map__pin--main');

  var fillAddressFieldInactiveState = function () {
    var left = parseInt(mapPinMain.style.left, 10);
    var top = parseInt(mapPinMain.style.top, 10);
    var pinLeft = Math.floor(left + PIN_WIDTH / 2);
    var pinTop = Math.floor(top + PIN_WIDTH / 2);

    addressInput.value = pinLeft + ', ' + pinTop;
  };

  var fillAddressFieldActiveState = function () {
    var left = parseInt(mapPinMain.style.left, 10);
    var top = parseInt(mapPinMain.style.top, 10);
    var pinLeft = Math.floor(left + PIN_WIDTH / 2);
    var pinTop = Math.floor(top + PIN_HEIGHT);

    addressInput.value = pinLeft + ', ' + pinTop;
  };

  window.address = {
    fillInactiveState: fillAddressFieldInactiveState,
    fillActiveState: fillAddressFieldActiveState
  };
})();
