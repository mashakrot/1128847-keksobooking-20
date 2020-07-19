'use strict';

(function () {
  var FILES_TYPES = window.constants.FILES_TYPES;
  var PREVIEW_PHOTO_WIDTH = window.constants.PREVIEW_PHOTO_WIDTH;
  var MAX_PLACE_PHOTOS_COUNT = window.constants.MAX_PLACE_PHOTOS_COUNT;
  var headerImgInput = document.querySelector('.ad-form-header__input');
  var previewBlock = document.querySelector('.ad-form-header__preview');
  var headerImgPreview = previewBlock.querySelector('img');

  var placeImgInput = document.querySelector('.ad-form__input');
  var formPhotoContainer = document.querySelector('.ad-form__photo-container');

  var placeImgPreview = document.querySelectorAll('.ad-form__photo');
  var img = document.createElement('img');
  img.classList.add('ad-form__img');
  placeImgPreview[placeImgPreview.length - 1].appendChild(img);

  headerImgInput.addEventListener('change', function () {
    var file = headerImgInput.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILES_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        headerImgPreview.src = reader.result;
        headerImgPreview.width = PREVIEW_PHOTO_WIDTH;
        headerImgPreview.height = PREVIEW_PHOTO_WIDTH;
        headerImgPreview.style = 'border-radius: 5px;';
        previewBlock.style = 'padding: 0;';
      });

      reader.readAsDataURL(file);
    }
  });

  placeImgInput.addEventListener('change', function () {
    var file = placeImgInput.files[0];
    var fileName = file.name.toLowerCase();
    var newPlaceImgPreview = document.querySelectorAll('.ad-form__photo');

    var matches = FILES_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        if (newPlaceImgPreview.length < MAX_PLACE_PHOTOS_COUNT) {
          var previewPhotos = document.querySelectorAll('.ad-form__img');
          var preview = previewPhotos[previewPhotos.length - 1];
          var formPhoto = document.createElement('div');
          formPhoto.classList.add('ad-form__photo');
          formPhotoContainer.insertAdjacentElement('beforeend', formPhoto);

          preview.src = reader.result;
          preview.width = PREVIEW_PHOTO_WIDTH;
          preview.height = PREVIEW_PHOTO_WIDTH;
          preview.style = 'border-radius: 5px;';

          var imgPreview = document.querySelectorAll('.ad-form__photo');
          var newImg = document.createElement('img');
          newImg.classList.add('ad-form__img');
          imgPreview[imgPreview.length - 1].appendChild(newImg);
        } else {
          var lastPreviewPhotos = document.querySelectorAll('.ad-form__img');
          var lastPreview = lastPreviewPhotos[lastPreviewPhotos.length - 1];

          lastPreview.src = reader.result;
          lastPreview.width = PREVIEW_PHOTO_WIDTH;
          lastPreview.height = PREVIEW_PHOTO_WIDTH;
          lastPreview.style = 'border-radius: 5px;';
        }
      });

      reader.readAsDataURL(file);
    }
  });
})();
