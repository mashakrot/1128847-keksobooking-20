'use strict';

(function () {
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
    var MAX_SIMILAR_ADS_COUNT = window.constants.MAX_SIMILAR_ADS_COUNT;
    var takeNumber = elements.length > MAX_SIMILAR_ADS_COUNT ? MAX_SIMILAR_ADS_COUNT : elements.length;

    mapPinsList.forEach(function (element) {
      element.remove();
    });
    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(getPin(elements[i]));
    }

    mapPins.appendChild(fragment);
  };

  var updatePins = function (elements) {
    var mapFilters = document.querySelector('.map__filters');
    var housingType = document.querySelector('#housing-type');
    renderPins(elements);

    mapFilters.addEventListener('change', function () {
      renderPins(elements.slice().filter(function (it) {
        if (housingType.value === 'any') {
          var get = true;
        } else if (it.offer.type === housingType.value) {
          get = true;
        } else {
          get = false;
        }
        return get;
      }));
    });
  };

  window.updatePins = updatePins;
})();
