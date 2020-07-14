'use strict';

(function () {
  var map = window.inactiveState.map;
  var adForm = window.inactiveState.adForm;
  var formReset = adForm.querySelector('.ad-form__reset');
  var adFormParts = window.inactiveState.adFormParts;
  var mapFiltersSelects = window.inactiveState.mapFiltersSelects;
  var mapFiltersFieldsets = window.inactiveState.mapFiltersFieldsets;
  var mapPinMain = window.inactiveState.mapPinMain;
  var fillActiveState = window.move.fillActiveState;
  var onMapPinMouseDown = window.move.mouseDown;
  var onMapPinEnterPress = window.move.enterPress;

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

  formReset.addEventListener('click', function () {
    fillActiveState();
  });

  // Вот эта ↑ часть не работает и я не знаю как сделать так что бы он после очистки формы вновь заполнял поле адреса

  window.activeState = {
    switch: switchToActiveState
  };
})();
