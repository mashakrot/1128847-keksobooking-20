'use strict';

(function (element) {
  var mapFiltersContainer = window.inactiveState.map.querySelector('.map__filters-container');
  var card = document.querySelector('#card').content.querySelector('.popup');
  var adCard = card.cloneNode(true);
  var typesMap = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  adCard.querySelector('.popup__title').textContent = element.offer.title;
  adCard.querySelector('.popup__text--address').textContent = element.offer.address;
  adCard.querySelector('.popup__text--price').textContent = element.offer.price + 'P/ночь';
  adCard.querySelector('.popup__type').textContent = typesMap[element.offer.type];
  adCard.querySelector('.popup__text--capacity').textContent = element.offer.rooms + ' ' + window.card.roomsFlexNormalize(element.offer.rooms) + ' для ' + element.offer.guests + ' ' + window.card.guestsFlexNormalize(element.offer.guests) + '.';
  adCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + element.offer.checkin + ' выезд до ' + element.offer.checkout + '.';
  adCard.querySelector('.popup__description').textContent = element.offer.description;
  adCard.querySelector('.popup__avatar').src = element.author.avatar;

  window.card.renderPopupFeatures(adCard, element);
  window.card.renderPopupPhotos(adCard, element);

  mapFiltersContainer.insertAdjacentElement('beforebegin', adCard);
})(/* window.similarAds[0] */);
