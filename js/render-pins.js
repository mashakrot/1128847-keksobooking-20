'use strict';

(function () {
  var MAX_SIMILAR_ADS_COUNT = window.constants.MAX_SIMILAR_ADS_COUNT;
  var setOpenListeners = window.setOpenListeners;
  var debounce = window.debounce;

  var getPin = function (element) {
    var pin = document.querySelector('#pin').content.querySelector('.map__pin');
    var ad = pin.cloneNode(true);

    ad.style = 'left: ' + (element.location.x - 25) + 'px; top: ' + (element.location.y - 70) + 'px;';
    ad.querySelector('img').src = element.author.avatar;
    ad.querySelector('img').alt = element.offer.title;

    return ad;
  };

  var renderPins = function (elements) {
    var mapPins = document.querySelector('.map__pins');
    var mapPinsList = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    var fragment = document.createDocumentFragment();

    mapPinsList.forEach(function (element) {
      element.remove();
    });

    elements.slice(0, MAX_SIMILAR_ADS_COUNT).forEach(function (element) {
      fragment.appendChild(getPin(element));
    });

    mapPins.appendChild(fragment);
  };

  var updatePins = function (elements) {
    var mapFilters = document.querySelector('.map__filters');

    var filterPins = function () {
      var housingType = document.querySelector('#housing-type');
      var housingPrice = document.querySelector('#housing-price');
      var housingRooms = document.querySelector('#housing-rooms');
      var housingGuests = document.querySelector('#housing-guests');
      var checkedFeatures = Array.from(document.querySelectorAll('.map__checkbox:checked'));

      var mapCards = document.querySelector('.map__card');
      if (mapCards) {
        mapCards.remove();
      }

      var filteredList = elements.slice().filter(function (it) {
        if (housingType.value === 'any') {
          return true;
        }
        return it.offer.type === housingType.value;
      });

      filteredList = filteredList.slice().filter(function (it) {
        if (housingPrice.value === 'any') {
          return true;
        }

        switch (housingPrice.value) {
          case 'low':
            return it.offer.price < 10000;
          case 'high':
            return it.offer.price > 50000;
          case 'middle':
            return it.offer.price >= 10000 && it.offer.price < 50000;
          default:
            return false;
        }
      });

      filteredList = filteredList.slice().filter(function (it) {
        if (housingRooms.value === 'any') {
          return true;
        }
        return it.offer.rooms === parseInt(housingRooms.value, 10);
      });

      filteredList = filteredList.slice().filter(function (it) {
        if (housingGuests.value === 'any') {
          return true;
        }
        return it.offer.rooms === parseInt(housingGuests.value, 10);
      });

      filteredList = filteredList.slice().filter(function (it) {
        return checkedFeatures.every(function (checkedFeature) {
          return it.offer.features.includes(checkedFeature.value);
        });
      });

      renderPins(filteredList);
      setOpenListeners(filteredList);
    };


    renderPins(elements);
    setOpenListeners(elements);

    mapFilters.addEventListener('change', debounce(filterPins));
  };

  window.updatePins = updatePins;
})();
