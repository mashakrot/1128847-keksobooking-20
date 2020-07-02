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

  var onPinClick = function (elements, mapPinsArray, element) {
    var index = mapPinsArray.indexOf(element);
    var mapCards = document.querySelectorAll('.map__card');
    mapCards[0].remove();

    renderCard(elements[index]);

    closeCard();

    // Вот как ты и сказал я сначала удаляю, а потом отрисовываю, но он не находит mapCard и не отрисовывает карточку
    // Предыдущий вариант хоть работал
  };
  // Вот я вынесла всю эту часть в отдельную функцию но теперь ничего неработает. Дальше Я ничего не меняла так как на этом шаге уже не работает

  var openCard = function (elements) {
    var mapPins = document.querySelector('.map__pins');
    var mapPinsList = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    var mapPinsArray = Array.from(mapPinsList);


    mapPinsArray.forEach(function (element) {
      element.addEventListener('click', onPinClick(elements, mapPinsArray, element));

      element.addEventListener('keydown', function (evt) {
        if (evt.key === 'Enter') {
          var index = mapPinsArray.indexOf(element);

          renderCard(elements[index]);

          closeCard();

          var mapCards = document.querySelectorAll('.map__card');
          if (mapCards.length === 2) {
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
      element.addEventListener('click', onPopupCloseClick);
    });

    if (mapCards) {
      window.addEventListener('keydown', onPopupEscPress);
    }
  };


  window.openCard = openCard;
})();
