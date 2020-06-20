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
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < elements.length; i++) {
      fragment.appendChild(getPin(elements[i]));
    }

    mapPins.appendChild(fragment);
  };

  window.renderPins = renderPins;
})();
