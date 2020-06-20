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
  var renderPins = window.renderPins;

  var load = window.backend.load;
  var URL = window.constants.URL;
  var errorHandler = window.card.errorHandler;
  var successHandler = window.card.successHandler;

  var switchToActiveState = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    fillActiveState();
    adFormParts.forEach(function (part) {
      part.disabled = false;
    });
    mapFiltersSelects.forEach(function (part) {
      part.disabled = false;
    });
    mapFiltersFieldsets.forEach(function (part) {
      part.disabled = false;
    });

    load(URL, renderPins, errorHandler);
    load(URL, successHandler, errorHandler);


    mapPinMain.removeEventListener('mousedown', onMapPinMouseDown);
    mapPinMain.removeEventListener('keydown', onMapPinEnterPress);
  };

  window.activeState = {
    switch: switchToActiveState
  };
})();
