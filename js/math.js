'use strict';

(function () {
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

  window.math = {
    randomIndex: getRandomIndex,
    randomElement: getRandomElement,
    randomNumberInInterval: getRandomNumberInInterval,
    shuffle: shuffleArray,
    slice: sliceArray
  };
})();
