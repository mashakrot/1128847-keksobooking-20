'use strict';

(function () {
  var renderCard = window.renderCard;

  var openOneCard = function (elements) {
    var mapPins = document.querySelector('.map__pins');
    var mapPinsList = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    var mapPinsArray = Array.from(mapPinsList);


    mapPinsArray.forEach(function (element) {
      element.addEventListener('click', function () {
        var index = mapPinsArray.indexOf(element);
        renderCard(elements[index]);

        closeCard();

        var mapCards = document.querySelectorAll('.map__card');
        if (mapCards.length >= 2) {
          mapCards[0].remove();
        }
      });

      element.addEventListener('keydown', function (evt) {
        if (evt.key === 'Enter') {
          var index = mapPinsArray.indexOf(element);
          renderCard(elements[index]);

          closeCard();

          var mapCards = document.querySelectorAll('.map__card');
          if (mapCards.length >= 2) {
            mapCards[0].remove();
          }
        }
      });

    });
  };

  var closeCard = function () {
    var mapCards = document.querySelectorAll('.map__card');
    var popupClose = document.querySelectorAll('.popup__close');

    popupClose.forEach(function (element) {
      element.addEventListener('click', function () {
        mapCards.forEach(function (card) {
          card.remove();
        });
      });
    });

    if (mapCards) {
      window.addEventListener('keydown', function (evt) {
        if (evt.key === 'Escape') {
          mapCards.forEach(function (card) {
            card.remove();
          });
        }
      });
    }
  };


  window.openOneCard = openOneCard;
})();
