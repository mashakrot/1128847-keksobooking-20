'use strict';

(function () {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapFilters = document.querySelector('.map__filters');
  var adFormParts = adForm.querySelectorAll('fieldset');

  var adTitle = adForm.querySelector('#title');
  var adType = adForm.querySelector('#type');
  var adPrice = adForm.querySelector('#price');
  var adRoomNumber = adForm.querySelector('#room_number');
  var adCapacity = adForm.querySelector('#capacity');
  var adTimein = adForm.querySelector('#timein');
  var adTimeout = adForm.querySelector('#timeout');
  var adDescription = adForm.querySelector('#description');
  var adFeatures = adForm.querySelectorAll('.feature__checkbox');

  var mapFiltersSelects = mapFilters.querySelectorAll('select');
  var mapFiltersFieldsets = mapFilters.querySelectorAll('fieldset');
  var fillInactiveState = window.move.fillInactiveState;
  var onMapPinMouseDown = window.move.onMouseDown;
  var onMapPinEnterPress = window.move.enterPress;

  var clearForm = function () {
    adTitle.value = '';
    adDescription.value = '';
    adPrice.value = '';
    mapPinMain.style = 'left: 570px; top: 375px;';

    if (adType.value !== 'flat') {
      adType.value = 'flat';
    }

    if (adRoomNumber.value !== '1') {
      adRoomNumber.value = '1';
    }

    if (adCapacity.value !== '1') {
      adCapacity.value = '1';
    }

    adFeatures.forEach(function (feature) {
      if (feature.checked) {
        feature.checked = false;
      }
    });

    if (adTimein.value !== '12:00') {
      adTimein.value = '12:00';
    }

    if (adTimeout.value !== '12:00') {
      adTimeout.value = '12:00';
    }
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

  window.inactiveState = {
    map: map,
    adForm: adForm,
    mapPinMain: mapPinMain,
    mapFilters: mapFilters,
    adFormParts: adFormParts,
    mapFiltersSelects: mapFiltersSelects,
    mapFiltersFieldsets: mapFiltersFieldsets,
    switchToInactiveSate: switchToInactiveSate,
    clearForm: clearForm
  };
})();
