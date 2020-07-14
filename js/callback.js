'use strict';

(function () {
  var updatePins = window.updatePins;

  var successHandler = function (elements) {
    var node = document.querySelector('.error');
    if (node) {
      node.remove();
    }

    updatePins(elements);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('error');
    node.style = 'z-index: 100; margin: 0 auto; padding: 0; text-align: center; background-color: orangeRed; color: white; height: 30px;';
    node.style.position = 'fixed';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '25px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.callback = {
    successHandler: successHandler,
    errorHandler: errorHandler
  };
})();
