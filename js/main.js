'use strict';

var NUMBER_OF_ADS = 8;
var PLACE_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS_NUMBERS = [1, 2, 3];
var GUESTS_NUMBERS = [1, 2, 3];
var PLACE_CHECKINS = ['12:00', '13:00', '14:00'];
var PLACE_CHECKOUTS = ['12:00', '13:00', '14:00'];
var PLACE_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PLACE_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var LOCATION_X_MIN = 0;
var LOCATION_X_MAX = 1200;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;
var PIN_WIDTH = 65;
var PIN_HEIGHT = 87;

var map = document.querySelector('.map');
var mapPinMain = document.querySelector('.map__pin--main');
var mapPins = document.querySelector('.map__pins');
var adForm = document.querySelector('.ad-form');
var adFormParts = adForm.querySelectorAll('fieldset');
var addressInput = document.querySelector('#address');


var mapFilters = document.querySelector('.map__filters');
var mapFiltersSelects = mapFilters.querySelectorAll('select');
var mapFiltersFieldsets = mapFilters.querySelectorAll('fieldset');

var inactiveState = function () {
  fillAddressFieldInactiveState();
  adFormParts.forEach(function (part) {
    part.disabled = true;
  });
  mapFiltersSelects.forEach(function (part) {
    part.disabled = true;
  });
  mapFiltersFieldsets.forEach(function (part) {
    part.disabled = true;
  });
};

var switchToActiveState = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');

  fillAddressFieldActiveState();
  adFormParts.forEach(function (part) {
    part.disabled = false;
  });
  mapFiltersSelects.forEach(function (part) {
    part.disabled = false;
  });
  mapFiltersFieldsets.forEach(function (part) {
    part.disabled = false;
  });

  renderPins(similarAds);
};

var onMapPinClick = function (evt) {
  if (evt.which === 1) {
    switchToActiveState();
  }
};

var onMapPinEnterPress = function (evt) {
  if (evt.key === 'Enter') {
    switchToActiveState();
  }
};

var getRandomIndex = function (elements) {
  return Math.floor(Math.random() * elements.length);
};

var getRandomElement = function (elements) {
  return elements[getRandomIndex(elements)];
};

var getRandomNumberInInterval = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var shuffleArray = function (elements) {
  var clonedElements = elements.slice();
  for (var i = elements.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var l = clonedElements[i];
    clonedElements[i] = clonedElements[j];
    clonedElements[j] = l;
  }
  return clonedElements;
};

var sliceArray = function (elements) {
  return elements.slice(getRandomIndex(elements));
};

var generateSimilarAd = function (quantity) {
  var similarAds = [];
  for (var i = 1; i <= quantity; i++) {
    var coordinateX = getRandomNumberInInterval(LOCATION_X_MIN, LOCATION_X_MAX);
    var coordinateY = getRandomNumberInInterval(LOCATION_Y_MIN, LOCATION_Y_MAX);
    var item = {
      author: {
        avatar: 'img/avatars/user0' + i + '.png'
      },
      offer: {
        title: '',
        address: coordinateX + ', ' + coordinateY,
        price: getRandomNumberInInterval(1000, 100000),
        type: getRandomElement(PLACE_TYPES),
        rooms: getRandomElement(ROOMS_NUMBERS),
        guests: getRandomElement(GUESTS_NUMBERS),
        checkin: getRandomElement(PLACE_CHECKINS),
        checkout: getRandomElement(PLACE_CHECKOUTS),
        features: sliceArray(shuffleArray(PLACE_FEATURES)),
        description: '',
        photos: sliceArray(shuffleArray(PLACE_PHOTOS))
      },
      location: {
        x: coordinateX,
        y: coordinateY
      }
    };
    similarAds.push(item);
  }
  return similarAds;
};

var getPin = function (element) {
  var pin = document.querySelector('#pin').content.querySelector('.map__pin');
  var ad = pin.cloneNode(true);

  ad.style = 'left: ' + (element.location.x - 25) + 'px; top: ' + (element.location.y - 70) + 'px;';
  ad.querySelector('img').src = element.author.avatar;
  ad.querySelector('img').alt = element.offer.title;

  return ad;
};

var renderPins = function (elements) {
  var fragment = document.createDocumentFragment();

  elements.forEach(function (element) {
    fragment.appendChild(getPin(element));
  });

  mapPins.appendChild(fragment);
};

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
};

var checkGuestsAndRooms = function () {
  var roomNumber = document.querySelector('#room_number');
  var placeCapacity = document.querySelector('#capacity');

  if (roomNumber.value === 1 && placeCapacity.value !== 1) {
    placeCapacity.setCustomValidity('Если комната одна, то гостей может быть не больше одного');
  } else if (roomNumber.value === 2 && (placeCapacity.value !== 3 || placeCapacity.value !== 0)) {
    placeCapacity.setCustomValidity('Если комнат две, то может быть 1-2 гостя');
  } else if (roomNumber.value === 3 && placeCapacity.value === 0) {
    placeCapacity.setCustomValidity('Если комнат три, то может быть 1-3 гостей');
  } else if (roomNumber.value === 100 && placeCapacity.value !== 0) {
    placeCapacity.setCustomValidity('Если комнат 100 - помещение не для гостей');
  }
  // Я уверена что тут все не так, но ничего другого не придумалось. Оно ↑ не работает
};

var fillAddressFieldInactiveState = function () {
  var left = mapPinMain.style.left.slice(0, mapPinMain.style.left.length - 2);
  var top = mapPinMain.style.top.slice(0, mapPinMain.style.top.length - 2);
  var pinLeft = Math.floor(left / 1 + PIN_WIDTH / 2);
  var pinTop = Math.floor(top / 2 + PIN_WIDTH / 2);

  addressInput.value = pinLeft + ', ' + pinTop;
};

var fillAddressFieldActiveState = function () {
  var left = mapPinMain.style.left.slice(0, mapPinMain.style.left.length - 2);
  var top = mapPinMain.style.top.slice(0, mapPinMain.style.top.length - 2);
  var pinLeft = Math.floor(left / 1 + PIN_WIDTH / 2);
  var pinTop = Math.floor(top / 1 + PIN_HEIGHT);

  addressInput.value = pinLeft + ', ' + pinTop;
};


inactiveState();

var similarAds = generateSimilarAd(NUMBER_OF_ADS);

mapPinMain.addEventListener('mousedown', onMapPinClick);
mapPinMain.addEventListener('keydown', onMapPinEnterPress);

checkGuestsAndRooms();

var mapFiltersContainer = map.querySelector('.map__filters-container');
renderCard(/* similarAds[0] */);

