'use strict';

(function () {
  var MAX_SIMILAR_ADS_COUNT = window.constants.MAX_SIMILAR_ADS_COUNT;
  var openOneCard = window.openOneCard;

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
    renderPins(elements);
    openOneCard(elements);

    mapFilters.addEventListener('change', function () {
      var filteredList = elements.slice().filter(function (it) {
        if (housingType.value === 'any') {
          return true;
        }
        return it.offer.type === housingType.value;
      });
      renderPins(filteredList);
      openOneCard(filteredList);
    });
  };

  window.updatePins = updatePins;
})();
