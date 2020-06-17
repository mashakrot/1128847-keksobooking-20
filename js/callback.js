'use strict';

(function () {
  window.callback = {
    onFormElementChange: function () {
      var roomNumber = document.querySelector('#room_number');
      var placeCapacity = document.querySelector('#capacity');
      if (roomNumber.value === '1' && placeCapacity.value !== '1') {
        placeCapacity.setCustomValidity('Если комната одна, то гостей может быть не больше одного');
      } else if (roomNumber.value === '2' && (placeCapacity.value === '3' || placeCapacity.value === '0')) {
        placeCapacity.setCustomValidity('Если комнат две, то может быть 1-2 гостя');
      } else if (roomNumber.value === '3' && placeCapacity.value === '0') {
        placeCapacity.setCustomValidity('Если комнат три, то может быть 1-3 гостей');
      } else if (roomNumber.value === '100' && placeCapacity.value !== '0') {
        placeCapacity.setCustomValidity('Если комнат 100 - помещение не для гостей');
      } else {
        placeCapacity.setCustomValidity('');
      }
    },

    onMapPinMouseDown: function (evt) {
      if (evt.button === 0) {
        window.activeState.switchToActiveState();
      }
    },

    onMapPinEnterPress: function (evt) {
      if (evt.key === 'Enter') {
        window.activeState.switchToActiveState();
      }
    }
  };
})();
