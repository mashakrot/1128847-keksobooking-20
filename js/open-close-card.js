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

  var openCard = function (elements) {
    var mapPins = document.querySelector('.map__pins');
    var mapPinsList = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    var mapPinsArray = Array.from(mapPinsList);


    mapPinsArray.forEach(function (element) {


      var onPinClick = function () {
        var index = mapPinsArray.indexOf(element);
        var mapCards = document.querySelectorAll('.map__card');
        mapCards[0].remove();

        renderCard(elements[index]);

        closeCard();

        // Вот как ты и сказал я сначала удаляю, а потом отрисовываю, но он не находит mapCard и не отрисовывает карточку
        // Предыдущий вариант хоть работал
      };

      var onPinKeyDown = function (evt) {
        if (evt.key === 'Enter') {
          var index = mapPinsArray.indexOf(element);

          renderCard(elements[index]);

          closeCard();

          var mapCards = document.querySelectorAll('.map__card');
          if (mapCards.length === 2) {
            mapCards[0].remove();
          }
        }
      };

      element.addEventListener('click', onPinClick);
      element.addEventListener('keydown', onPinKeyDown);
    });
  };


  var closeCard = function () {
    var mapCards = document.querySelectorAll('.map__card');
    var popupClose = document.querySelectorAll('.popup__close');

    popupClose.forEach(function (element) {
      element.addEventListener('click', onPopupCloseClick);
    });

    if (mapCards) {
      window.addEventListener('keydown', onPopupEscPress);
    }
  };


  window.openCard = openCard;
})();
