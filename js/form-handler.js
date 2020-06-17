'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  adForm.addEventListener('change', window.callback.onFormElementChange);
})();
