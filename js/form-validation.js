'use strict';

(function () {
  var placeType = document.querySelector('#type');
  var placePrice = document.querySelector('#price');

  var timeFildset = document.querySelector('.ad-form__element--time');
  var timein = timeFildset.querySelector('#timein');
  var timeout = timeFildset.querySelector('#timeout');

  var adForm = document.querySelector('.ad-form');

  var onPlaceTypeChange = function () {
    if (placeType.value === 'bungalo') {
      placePrice.placeholder = 0;
      placePrice.min = 0;
    } else if (placeType.value === 'flat') {
      placePrice.placeholder = 1000;
      placePrice.min = 1000;
    } else if (placeType.value === 'house') {
      placePrice.placeholder = 5000;
      placePrice.min = 5000;
    } else if (placeType.value === 'palace') {
      placePrice.placeholder = 10000;
      placePrice.min = 10000;
    }
  };

  var onFormElementChange = function () {
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
  };

  timein.addEventListener('change', function () {
    timeout.value = timein.value;
  });

  timeout.addEventListener('change', function () {
    timein.value = timeout.value;
  });

  adForm.addEventListener('change', onFormElementChange);
  placeType.addEventListener('change', onPlaceTypeChange);
})();
