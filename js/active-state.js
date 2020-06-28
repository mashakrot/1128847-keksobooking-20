'use strict';

(function () {
  var map = window.inactiveState.map;
  var adForm = window.inactiveState.adForm;
  var adFormParts = window.inactiveState.adFormParts;
  var mapFiltersSelects = window.inactiveState.mapFiltersSelects;
  var mapFiltersFieldsets = window.inactiveState.mapFiltersFieldsets;
  var mapPinMain = window.inactiveState.mapPinMain;
  var fillActiveState = window.address.fillActiveState;
  var onMapPinMouseDown = window.callback.mouseDown;
  var onMapPinEnterPress = window.callback.enterPress;

  var load = window.backend.load;
  var errorHandler = window.callback.errorHandler;
  var successHandler = window.callback.successHandler;

  var switchToActiveState = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    fillActiveState();
    adFormParts.forEach(function (part) {
      part.disabled = false;
    });

    mapFiltersFieldsets.forEach(function (part) {
      part.disabled = false;
    });

    load(successHandler, errorHandler);

    mapFiltersSelects.forEach(function (part) {
      part.disabled = false;
    });

    mapPinMain.removeEventListener('mousedown', onMapPinMouseDown);
    mapPinMain.removeEventListener('keydown', onMapPinEnterPress);
  };

  window.activeState = {
    switch: switchToActiveState
  };
})();
