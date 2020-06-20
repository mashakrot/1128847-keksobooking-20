'use strict';

(function () {
  // То есть теперь этот файл надо удалить?

  var getRandomNumberInInterval = window.math.randomNumberInInterval;
  var getRandomElement = window.math.randomElement;
  var sliceArray = window.math.slice;
  var shuffleArray = window.math.shuffle;

  var generateSimilarAds = function (quantity) {
    var similarAds = [];
    for (var i = 1; i <= quantity; i++) {
      var coordinateX = getRandomNumberInInterval(window.constants.LOCATION_X_MIN, window.constants.LOCATION_X_MAX);
      var coordinateY = getRandomNumberInInterval(window.constants.LOCATION_Y_MIN, window.constants.LOCATION_Y_MAX);
      var item = {
        author: {
          avatar: 'img/avatars/user0' + i + '.png'
        },
        offer: {
          title: '',
          address: coordinateX + ', ' + coordinateY,
          price: getRandomNumberInInterval(1000, 100000),
          type: getRandomElement(window.constants.PLACE_TYPES),
          rooms: getRandomElement(window.constants.ROOMS_NUMBERS),
          guests: getRandomElement(window.constants.GUESTS_NUMBERS),
          checkin: getRandomElement(window.constants.PLACE_CHECKINS),
          checkout: getRandomElement(window.constants.PLACE_CHECKOUTS),
          features: sliceArray(shuffleArray(window.constants.PLACE_FEATURES)),
          description: '',
          photos: sliceArray(shuffleArray(window.constants.PLACE_PHOTOS))
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

  window.generateSimilarAds = generateSimilarAds;
})();
