'use strict';

(function () {
  var addressInput = document.querySelector('#address');

  window.address = {
    fillAddressFieldInactiveState: function () {
      var left = parseInt(window.inactiveState.mapPinMain.style.left, 10);
      var top = parseInt(window.inactiveState.mapPinMain.style.top, 10);
      var pinLeft = Math.floor(left + window.constants.PIN_WIDTH / 2);
      var pinTop = Math.floor(top + window.constants.PIN_WIDTH / 2);

      addressInput.value = pinLeft + ', ' + pinTop;
    },

    fillAddressFieldActiveState: function () {
      var left = parseInt(window.inactiveState.mapPinMain.style.left, 10);
      var top = parseInt(window.inactiveState.mapPinMain.style.top, 10);
      var pinLeft = Math.floor(left + window.constants.PIN_WIDTH / 2);
      var pinTop = Math.floor(top + window.constants.PIN_HEIGHT);

      addressInput.value = pinLeft + ', ' + pinTop;
    }
  };
})();
