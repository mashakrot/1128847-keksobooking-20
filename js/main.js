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

var switchToActiveState = function () {
  var map = document.querySelector('.map');
  map.classList.remove('map--faded');
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
  elements.slice(getRandomIndex(elements));
  return elements;
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
  var mapPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  elements.forEach(function (element) {
    fragment.appendChild(getPin(element));
  });

  mapPins.appendChild(fragment);
};

var persuadeWordRoom = function (element) {
  var word = '';
  if (element.offer.rooms === 1) {
    word = 'комната';
  } else if (element.offer.rooms === 2 || element.offer.rooms === 3) {
    word = 'комнаты';
  }
  return word;
};

var persuadeWordGuest = function (element) {
  var word = '';
  if (element.offer.guests === 1) {
    word = 'гостя';
  } else if (element.offer.guests === 2 || element.offer.guests === 3) {
    word = 'гостей';
  }
  return word;
};

var renderCard = function (element) {
  var card = document.querySelector('#card').content.querySelector('.popup');
  var adCard = card.cloneNode(true);

  var map = document.querySelector('.map');
  var mapFiltersContainer = map.querySelector('.map__filters-container');
  var fragment = document.createDocumentFragment();

  var typesMap = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  var renderPopupPhotos = function () {
    var popupPhotos = adCard.querySelector('.popup__photos');
    popupPhotos.innerHTML = '';
    element.offer.photos.forEach(function (photo) {
      var popupPhoto = document.createElement('img');
      popupPhoto.classList.add('popup__photo');
      popupPhoto.src = photo;
      popupPhoto.width = '45';
      popupPhoto.height = '40';
      popupPhoto.alt = 'Фотография жилья';
      fragment.appendChild(popupPhoto);
    });
    popupPhotos.appendChild(fragment);
  };

  var renderPopupFeatures = function () {
    var popupFeatures = adCard.querySelector('.popup__features');
    popupFeatures.innerHTML = '';
    element.offer.features.forEach(function (feature) {
      var newFeature = document.createElement('li');
      newFeature.classList.add('popup__feature');
      newFeature.classList.add('popup__feature--' + feature);
      fragment.appendChild(newFeature);
    });
    popupFeatures.appendChild(fragment);
  };

  adCard.querySelector('.popup__title').textContent = element.offer.title;
  adCard.querySelector('.popup__text--address').textContent = element.offer.address;
  adCard.querySelector('.popup__text--price').textContent = element.offer.price + 'P/ночь';
  adCard.querySelector('.popup__type').textContent = typesMap[element.offer.type];
  adCard.querySelector('.popup__text--capacity').textContent = element.offer.rooms + ' ' + persuadeWordRoom(element) + ' для ' + element.offer.guests + ' ' + persuadeWordGuest(element) + '.';
  adCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + element.offer.checkin + ' выезд до ' + element.offer.checkout + '.';
  adCard.querySelector('.popup__description').textContent = element.offer.description;
  adCard.querySelector('.popup__avatar').src = element.author.avatar;

  renderPopupFeatures();
  renderPopupPhotos();

  fragment.appendChild(adCard);
  map.insertBefore(fragment, mapFiltersContainer);
};

switchToActiveState();
var similarAds = generateSimilarAd(NUMBER_OF_ADS);
renderPins(similarAds);

renderCard(similarAds[1]);
