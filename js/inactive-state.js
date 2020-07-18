'use strict';

(function () {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapFilters = document.querySelector('.map__filters');
  var adFormParts = adForm.querySelectorAll('fieldset');

  var adTitle = adForm.querySelector('#title');
  var adPrice = adForm.querySelector('#price');
  var adDescription = adForm.querySelector('#description');
  var adFeatures = adForm.querySelectorAll('.feature__checkbox');
  var filterPlaceFeatures = mapFilters.querySelectorAll('.map__checkbox');

  var mapFiltersSelects = mapFilters.querySelectorAll('select');
  var mapFiltersFieldsets = mapFilters.querySelectorAll('fieldset');
  var fillInactiveState = window.move.fillInactiveState;
  var onMapPinMouseDown = window.move.onMouseDown;
  var onMapPinEnterPress = window.move.enterPress;

  var clearInput = function (inputName, value) {
    var name = document.querySelector(inputName);
    if (name.value !== value) {
      name.value = value;
    }
  };

  var clearCheckbox = function (checkbox) {
    checkbox.forEach(function (feature) {
      if (feature.checked) {
        feature.checked = false;
      }
    });
  };

  var clearForm = function () {
    adTitle.value = '';
    adDescription.value = '';
    adPrice.value = '';
    mapPinMain.style = 'left: 570px; top: 375px;';

    adPrice.placeholder = 1000;
    adPrice.min = 1000;
    clearInput('#type', 'flat');
    clearInput('#capacity', '1');
    clearInput('#room_number', '1');
    clearInput('#timein', '12:00');
    clearInput('#timeout', '12:00');

    clearCheckbox(adFeatures);

    var previewBlock = document.querySelector('.ad-form-header__preview');
    var headerImgPreview = previewBlock.querySelector('img');
    headerImgPreview.src = 'img/muffin-grey.svg';
    headerImgPreview.width = 40;
    headerImgPreview.height = 44;
    headerImgPreview.style = 'border-radius: 0;';
    previewBlock.style = 'padding: 0 15px;';

    var formPhotos = document.querySelectorAll('.ad-form__img');
    var formPreview = document.querySelectorAll('.ad-form__photo');
    formPhotos.forEach(function (photo) {
      photo.remove();
    });
    for (var i = formPreview.length - 1; i > 0; i--) {
      formPreview[i].remove();
    }
  };

  var clearFilters = function () {
    clearInput('#housing-type', 'any');
    clearInput('#housing-price', 'any');
    clearInput('#housing-rooms', 'any');
    clearInput('#housing-guests', 'any');

    clearCheckbox(filterPlaceFeatures);
  };

  var switchToInactiveState = function () {
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

  switchToInactiveState();

  window.inactiveState = {
    map: map,
    adForm: adForm,
    mapPinMain: mapPinMain,
    mapFilters: mapFilters,
    adFormParts: adFormParts,
    mapFiltersSelects: mapFiltersSelects,
    mapFiltersFieldsets: mapFiltersFieldsets,
    switch: switchToInactiveState,
    clearForm: clearForm,
    clearFilters: clearFilters
  };
})();
