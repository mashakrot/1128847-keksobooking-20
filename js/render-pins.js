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

    mapPinsList.forEach(function (element) {
      element.remove();
    });
    for (var i = 0; i < elements.slice(0, 5).length; i++) {
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
          return true;
        } else if (it.offer.type === housingType.value) {
          return true;
        } else {
          return false;
        }
      }));
    });
  };

  window.updatePins = updatePins;
})();
