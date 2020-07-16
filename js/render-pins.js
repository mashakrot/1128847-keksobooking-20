'use strict';

(function () {
  var MAX_SIMILAR_ADS_COUNT = window.constants.MAX_SIMILAR_ADS_COUNT;
  var setOpenListeners = window.setOpenListeners;

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
    var housingType = document.querySelector('#housing-type');
    var housingPrice = document.querySelector('#housing-price');
    var housingRooms = document.querySelector('#housing-rooms');
    var housingGuests = document.querySelector('#housing-guests');
    var housingFeatures = document.querySelectorAll('.map__checkbox');
    renderPins(elements);
    setOpenListeners(elements);

    mapFilters.addEventListener('change', function () {
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
        var price;
        if (it.offer.price < 10000) {
          price = 'low';
        }
        if (it.offer.price > 50000) {
          price = 'high';
        }
        if (it.offer.price > 10000 && it.offer.price < 50000) {
          price = 'middle';
        }
        if (housingPrice.value === 'any') {
          return true;
        }
        return housingPrice.value === price;
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
        for (var i = 0; i < it.offer.features.length; i++) {
          if (housingFeatures[i].checked) {
            return it.offer.features[i] === housingFeatures[i].value;
          }
        }
        // if (!housingFeatures.checked) {
        return true;
        // }

      });

      renderPins(filteredList);
      setOpenListeners(filteredList);
    });
  };

  window.updatePins = updatePins;
})();
