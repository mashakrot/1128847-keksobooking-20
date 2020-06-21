'use strict';

(function () {
  var map = window.inactiveState.map;
  var mapFiltersContainer = map.querySelector('.map__filters-container');

  var flexNormalize = function (number, forms) {
    number = Number(number);
    if (number % 10 > 100 && number % 100 < 15) {
      return forms[0];
    }
    var remainder = number % 10;
    switch (true) {
      case remainder === 0 || remainder > 4:
        return forms[0];
      case remainder === 1:
        return forms[1];
      default:
        return forms[2];
    }
  };

  var roomsFlexNormalize = function (number) {
    var forms = ['комнат', 'комната', 'комнаты'];
    return flexNormalize(number, forms);
  };

  var guestsFlexNormalize = function (number) {
    var forms = ['гостей', 'гостя', 'гостей'];
    return flexNormalize(number, forms);
  };

  var renderPopupPhotos = function (adCard, element) {
    var popupPhotos = adCard.querySelector('.popup__photos');
    var fragment = document.createDocumentFragment();
    popupPhotos.innerHTML = '';
    if (element.offer.photos.length > 0) {
      element.offer.photos.forEach(function (photo) {
        var popupPhoto = document.createElement('img');
        popupPhoto.classList.add('popup__photo');
        popupPhoto.src = photo;
        popupPhoto.width = '45';
        popupPhoto.height = '40';
        popupPhoto.alt = 'Фотография жилья';
        fragment.appendChild(popupPhoto);
      });
    } else {
      popupPhotos.classList.add('hidden');
    }
    popupPhotos.appendChild(fragment);
  };

  var renderPopupFeatures = function (adCard, element) {
    var popupFeatures = adCard.querySelector('.popup__features');
    var fragment = document.createDocumentFragment();
    popupFeatures.innerHTML = '';
    if (element.offer.features.length > 0) {
      element.offer.features.forEach(function (feature) {
        var newFeature = document.createElement('li');
        newFeature.classList.add('popup__feature');
        newFeature.classList.add('popup__feature--' + feature);
        fragment.appendChild(newFeature);
      });
    } else {
      popupFeatures.classList.add('hidden');
    }
    popupFeatures.appendChild(fragment);
  };

  var renderCard = function (element) {
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
    adCard.querySelector('.popup__text--capacity').textContent = element.offer.rooms + ' ' + roomsFlexNormalize(element.offer.rooms) + ' для ' + element.offer.guests + ' ' + guestsFlexNormalize(element.offer.guests) + '.';
    adCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + element.offer.checkin + ' выезд до ' + element.offer.checkout + '.';
    adCard.querySelector('.popup__description').textContent = element.offer.description;
    adCard.querySelector('.popup__avatar').src = element.author.avatar;

    renderPopupFeatures(adCard, element);
    renderPopupPhotos(adCard, element);

    mapFiltersContainer.insertAdjacentElement('beforebegin', adCard);
    return adCard;
  };

  renderCard(/*  */);

})();
