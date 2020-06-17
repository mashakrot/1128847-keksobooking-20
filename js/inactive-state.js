'use strict';

(function () {
  window.inactiveState = {
    map: document.querySelector('.map'),
    adForm: document.querySelector('.ad-form'),
    mapPinMain: document.querySelector('.map__pin--main'),
    mapFilters: document.querySelector('.map__filters'),
  };

  var adFormParts = window.inactiveState.adForm.querySelectorAll('fieldset');
  var mapFiltersSelects = window.inactiveState.mapFilters.querySelectorAll('select');
  var mapFiltersFieldsets = window.inactiveState.mapFilters.querySelectorAll('fieldset');

  var mapPinsList = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  mapPinsList.forEach(function (pin) {
    pin.remove();
  });
  window.inactiveState.map.classList.add('map--faded');
  window.inactiveState.adForm.classList.add('ad-form--disabled');

  window.address.fillAddressFieldInactiveState();
  adFormParts.forEach(function (part) {
    part.disabled = true;
  });
  mapFiltersSelects.forEach(function (part) {
    part.disabled = true;
  });
  mapFiltersFieldsets.forEach(function (part) {
    part.disabled = true;
  });

  window.inactiveState.mapPinMain.addEventListener('mousedown', window.callback.onMapPinMouseDown);
  window.inactiveState.mapPinMain.addEventListener('keydown', window.callback.onMapPinEnterPress);

})();
