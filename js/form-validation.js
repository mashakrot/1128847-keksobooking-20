'use strict';

(function () {
  var main = document.querySelector('main');
  var placeType = document.querySelector('#type');
  var placePrice = document.querySelector('#price');

  var timeFildset = document.querySelector('.ad-form__element--time');
  var timein = timeFildset.querySelector('#timein');
  var timeout = timeFildset.querySelector('#timeout');

  var adForm = document.querySelector('.ad-form');
  var formReset = adForm.querySelector('.ad-form__reset');
  var save = window.backend.save;
  var switchToInactiveState = window.inactiveState.switch;
  var clearForm = window.inactiveState.clearForm;
  var clearFilters = window.inactiveState.clearFilters;

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

  var formSuccessHandler = function () {
    var success = document.querySelector('#success').content.querySelector('.success');
    var successMessage = success.cloneNode(true);
    main.insertAdjacentElement('afterbegin', successMessage);

    var onSuccessMessageClick = function () {
      successMessage.remove();
      window.removeEventListener('click', onSuccessMessageClick);

      clearForm();
      clearFilters();
      switchToInactiveState();
    };

    var onSuccessMessageEscPress = function (evt) {
      if (evt.key === 'Escape') {
        successMessage.remove();
        window.removeEventListener('keydown', onSuccessMessageEscPress);

        clearForm();
        clearFilters();
        switchToInactiveState();
      }
    };

    if (successMessage) {
      window.addEventListener('keydown', onSuccessMessageEscPress);
      window.addEventListener('click', onSuccessMessageClick);
    }

    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
  };

  var formErrorHandler = function () {
    var error = document.querySelector('#error').content.querySelector('.error');
    var errorMessage = error.cloneNode(true);
    main.insertAdjacentElement('afterbegin', errorMessage);

    var errorClose = document.querySelector('.error__button');

    var onErrorCloseClick = function () {
      errorMessage.remove();
      window.removeEventListener('click', onErrorCloseClick);
    };

    var onErrorMessageEscPress = function (evt) {
      if (evt.key === 'Escape') {
        errorMessage.remove();
        window.removeEventListener('keydown', onErrorMessageEscPress);
      }
    };

    if (errorMessage) {
      errorClose.addEventListener('click', onErrorCloseClick);
      window.addEventListener('click', onErrorCloseClick);
      window.addEventListener('keydown', onErrorMessageEscPress);
    }

    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
  };

  var onResetButtonClick = function () {
    clearForm();
    clearFilters();
    switchToInactiveState();
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
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
  formReset.addEventListener('click', onResetButtonClick);

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    save(new FormData(adForm), formSuccessHandler, formErrorHandler);
  });
})();
