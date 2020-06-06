'use strict';

var PLACE_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS_NUMBER = [1, 2, 3];
var GUESTS_NUMBER = [1, 2, 3];
var PLACE_CHECKIN = ['12:00', '13:00', '14:00'];
var PLACE_CHECKOUT = ['12:00', '13:00', '14:00'];
var PLACE_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PLACE_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var getRandomElement = function (elements) {
  return elements[Math.floor(Math.random() * elements.length)];
};

var getRandomIndexOfElement = function (elements) {
  return Math.floor(Math.random() * elements.length);
};

var getRandomNumberInInterval = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var getNonrepeatingNumberList = function (length) {
  var list = [];
  while (list.length < length) {
    var randomNumber = Math.floor(Math.random() * length);
    var found = false;
    for (var i = 0; i < list.length; i++) {
      if (list[i] === randomNumber) {
        found = true;
        break;
      }
    }
    if (!found) {
      list[list.length] = randomNumber;
    }
  }
  return list;
};

var getRandomLengthArray = function (elements, constant) {
  elements = [];
  for (var i = 0; i < getRandomIndexOfElement(constant); i++) {
    var element = getRandomElement(constant);
    elements.push(element);
  }
  return elements;
};

var generateSimilarAd = function () {
  var similarAds = [];
  for (var i = 0; i < 8; i++) {
    var avatar = 'img/avatars/user0' + getRandomElement(getNonrepeatingNumberList(8)) + '.png';
    // Мне кажется здесь что-то не так..↑
    // var locationX = getRandomNumberInInterval(0, 1000);
    // var locationY = getRandomNumberInInterval(0, 1000);
    // да тут кажись везде не так
    var placeType = getRandomElement(PLACE_TYPES);
    var roomsNumber = getRandomElement(ROOMS_NUMBER);
    var guestNumber = getRandomElement(GUESTS_NUMBER);
    var placeCheckin = getRandomElement(PLACE_CHECKIN);
    var placeCheckout = getRandomElement(PLACE_CHECKOUT);

    var features = [];
    getRandomLengthArray(features, PLACE_FEATURES);

    var placePhotos = [];
    getRandomLengthArray(placePhotos, PLACE_PHOTOS);

    var coordinateY = getRandomNumberInInterval(130, 630);

    var item = {
      author: {
        avatar: avatar
      },
      offer: {
        title: '',
        // 'address': ,
        // Я НЕ ЗНАЮ. НЕ ЗНАЮ Я(
        // 'price': ,
        // это же просто случайно сгенерированное число? Я запуталась..
        type: placeType,
        rooms: roomsNumber,
        guests: guestNumber,
        checkin: placeCheckin,
        checkout: placeCheckout,
        features: features,
        description: '',
        photos: placePhotos
      },
      location: {
        // 'x': ,
        // то есть 'х' это непросто случайное число? нужно еще как-то узнать ширину блока?
        y: coordinateY
      }
    };
    similarAds.push(item);
  }
  return similarAds;
};

var getAd = function (element) {
  var pin = document.querySelector('#pin').content.querySelector('.map__pin');
  var ad = pin.cloneNode(true);

  // ad.style = 'left: ' + element.locationX + 20 + ' px; top: ' + element.locationY + 20 + ' px;';

  ad.querySelector('img').src = element.avatar;
  ad.querySelector('img').alt = element.title;

  return ad;
};

var renderSimilarAd = function (elements) {
  var mapPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  elements.forEach(function (element) {
    fragment.appendChild(getAd(element));
  });

  mapPins.appendChild(fragment);
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var similarAds = generateSimilarAd();

renderSimilarAd(similarAds);

