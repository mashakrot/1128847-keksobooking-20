'use strict';

(function () {
  window.activeState = {
    switchToActiveState: function () {
      var adFormParts = window.inactiveState.adForm.querySelectorAll('fieldset');
      var mapFiltersSelects = window.inactiveState.mapFilters.querySelectorAll('select');
      var mapFiltersFieldsets = window.inactiveState.mapFilters.querySelectorAll('fieldset');

      window.inactiveState.map.classList.remove('map--faded');
      window.inactiveState.adForm.classList.remove('ad-form--disabled');

      window.address.fillAddressFieldActiveState();
      adFormParts.forEach(function (part) {
        part.disabled = false;
      });
      mapFiltersSelects.forEach(function (part) {
        part.disabled = false;
      });
      mapFiltersFieldsets.forEach(function (part) {
        part.disabled = false;
      });

      window.renderPins(window.similarAds);

      window.inactiveState.mapPinMain.removeEventListener('mousedown', window.callback.onMapPinMouseDown);
      window.inactiveState.mapPinMain.removeEventListener('keydown', window.callback.onMapPinEnterPress);
    }
  };
})();
