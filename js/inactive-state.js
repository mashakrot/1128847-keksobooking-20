'use strict';

(function () {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapFilters = document.querySelector('.map__filters');
  var adFormParts = adForm.querySelectorAll('fieldset');
  var mapFiltersSelects = mapFilters.querySelectorAll('select');
  var mapFiltersFieldsets = mapFilters.querySelectorAll('fieldset');
  var fillInactiveState = window.address.fillInactiveState;
  var onMapPinMouseDown = window.callback.onMapPinMouseDown;
  var onMapPinEnterPress = window.callback.onMapPinEnterPress;

  window.inactiveState = {
    map: map,
    adForm: adForm,
    mapPinMain: mapPinMain,
    mapFilters: mapFilters,
    adFormParts: adFormParts,
    mapFiltersSelects: mapFiltersSelects,
    mapFiltersFieldsets: mapFiltersFieldsets
  };

  var switchToInactiveSate = function () {
    var mapPinsList = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    mapPinsList.forEach(function (pin) {
      pin.remove();
    });
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');

    fillInactiveState();
    adFormParts.forEach(function (part) {
      part.disabled = true;
    });
    mapFiltersSelects.forEach(function (part) {
      part.disabled = true;
    });
    mapFiltersFieldsets.forEach(function (part) {
      part.disabled = true;
    });

    mapPinMain.addEventListener('mousedown', onMapPinMouseDown);
    mapPinMain.addEventListener('keydown', onMapPinEnterPress);
  };

  switchToInactiveSate();
})();
