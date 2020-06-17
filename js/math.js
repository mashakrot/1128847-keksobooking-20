'use strict';

(function () {
  window.math = {
    getRandomIndex: function (elements) {
      return Math.floor(Math.random() * elements.length);
    },

    getRandomElement: function (elements) {
      return elements[window.math.getRandomIndex(elements)];
    },

    getRandomNumberInInterval: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },

    shuffleArray: function (elements) {
      var clonedElements = elements.slice();
      for (var i = elements.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var l = clonedElements[i];
        clonedElements[i] = clonedElements[j];
        clonedElements[j] = l;
      }
      return clonedElements;
    },

    sliceArray: function (elements) {
      return elements.slice(window.math.getRandomIndex(elements));
    }
  };
})();
