'use strict';

var NUMBER_OF_ADS = 8;
var PLACE_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS_NUMBERS = [1, 2, 3];
var GUESTS_NUMBERS = [1, 2, 3];
var PLACE_CHECKIN = ['12:00', '13:00', '14:00'];
var PLACE_CHECKOUT = ['12:00', '13:00', '14:00'];
var PLACE_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PLACE_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var switchToActiveState = function () {
  var map = document.querySelector('.map');
  map.classList.remove('map--faded');
};

var getRandomElement = function (elements) {
  return elements[Math.floor(Math.random() * elements.length)];
};

var getRandomIndex = function (elements) {
  return Math.floor(Math.random() * elements.length);
};

var getRandomNumberInInterval = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var shuffleArray = function (elements) {
  elements.sort();
  elements.slice(getRandomIndex(elements));
  return elements;
};

var generateSimilarAd = function (quantity) {
  var similarAds = [];
  for (var i = 1; i <= quantity; i++) {
    var COORDINATE_X = getRandomNumberInInterval(0, 1200);
    var COORDINATE_Y = getRandomNumberInInterval(130, 630);
    var item = {
      author: {
        avatar: 'img/avatars/user0' + i + '.png'
      },
      offer: {
        title: '',
        address: COORDINATE_X + ', ' + COORDINATE_Y,
        price: getRandomNumberInInterval(1000, 100000),
        type: getRandomElement(PLACE_TYPES),
        rooms: getRandomElement(ROOMS_NUMBERS),
        guests: getRandomElement(GUESTS_NUMBERS),
        checkin: getRandomElement(PLACE_CHECKIN),
        checkout: getRandomElement(PLACE_CHECKOUT),
        features: shuffleArray(PLACE_FEATURES),
        description: '',
        photos: shuffleArray(PLACE_PHOTOS)
      },
      location: {
        x: COORDINATE_X,
        y: COORDINATE_Y
      }
    };
    similarAds.push(item);
  }
  return similarAds;
};

var getPin = function (element) {
  var pin = document.querySelector('#pin').content.querySelector('.map__pin');
  var ad = pin.cloneNode(true);
  // ad.style = 'left: 100px; top: 100px;';
  // Это работает ↑
  // А это он почему-то не понимает ↓
  ad.style = 'left: ' + element.location.x - 25 + ' px; top: ' + element.location.y - 70 + ' px;';
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

switchToActiveState();
var similarAds = generateSimilarAd(NUMBER_OF_ADS);
renderPins(similarAds);
