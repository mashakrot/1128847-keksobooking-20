'use strict';

(function () {
  var renderCard = window.renderCard;

  var onPopupCloseClick = function () {
    var mapCards = document.querySelectorAll('.map__card');

    mapCards.forEach(function (card) {
      card.remove();
    });
  };

  var onPopupEscPress = function (evt) {
    var mapCards = document.querySelectorAll('.map__card');

    if (evt.key === 'Escape') {
      mapCards.forEach(function (card) {
        card.remove();
      });

      window.removeEventListener('keydown', onPopupEscPress);
    }
  };

  var setOpenListeners = function (elements) {
    var mapPins = document.querySelector('.map__pins');
    var mapPinsList = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    var mapPinsArray = Array.from(mapPinsList);


    mapPinsArray.forEach(function (element) {
      var showCard = function () {
        var index = mapPinsArray.indexOf(element);
        var mapCard = document.querySelector('.map__card');
        if (mapCard) {
          mapCard.remove();
        }

        renderCard(elements[index]);
        setCloseListeners();
      };

      var onPinClick = function () {
        showCard();
      };

      var onPinKeyDown = function (evt) {
        if (evt.key === 'Enter') {
          showCard();
        }
      };

      element.addEventListener('click', onPinClick);
      element.addEventListener('keydown', onPinKeyDown);
    });
  };


  var setCloseListeners = function () {
    var mapCards = document.querySelectorAll('.map__card');
    var popupClose = document.querySelectorAll('.popup__close');

    popupClose.forEach(function (element) {
      element.addEventListener('click', onPopupCloseClick);
    });

    if (mapCards) {
      window.addEventListener('keydown', onPopupEscPress);
    }
  };


  window.setOpenListeners = setOpenListeners;
})();
