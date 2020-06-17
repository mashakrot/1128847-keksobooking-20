'use strict';

(function (quantity) {
  var similarAds = [];
  for (var i = 1; i <= quantity; i++) {
    var coordinateX = window.math.getRandomNumberInInterval(window.constants.LOCATION_X_MIN, window.constants.LOCATION_X_MAX);
    var coordinateY = window.math.getRandomNumberInInterval(window.constants.LOCATION_Y_MIN, window.constants.LOCATION_Y_MAX);
    var item = {
      author: {
        avatar: 'img/avatars/user0' + i + '.png'
      },
      offer: {
        title: '',
        address: coordinateX + ', ' + coordinateY,
        price: window.math.getRandomNumberInInterval(1000, 100000),
        type: window.math.getRandomElement(window.constants.PLACE_TYPES),
        rooms: window.math.getRandomElement(window.constants.ROOMS_NUMBERS),
        guests: window.math.getRandomElement(window.constants.GUESTS_NUMBERS),
        checkin: window.math.getRandomElement(window.constants.PLACE_CHECKINS),
        checkout: window.math.getRandomElement(window.constants.PLACE_CHECKOUTS),
        features: window.math.sliceArray(window.math.shuffleArray(window.constants.PLACE_FEATURES)),
        description: '',
        photos: window.math.sliceArray(window.math.shuffleArray(window.constants.PLACE_PHOTOS))
      },
      location: {
        x: coordinateX,
        y: coordinateY
      }
    };
    similarAds.push(item);
  }
  window.similarAds = similarAds;
  return similarAds;
})(window.constants.NUMBER_OF_ADS);
