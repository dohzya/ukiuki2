(function () {
  var window = this;
  var document = window.document;

  function createTag(container, name, fn) {
    var tag = document.createElement(name);
    fn(tag);
    container.appendChild(tag);
    return tag;
  }

  function imagePopup(img, images) {
    var alt = img.getAttribute('alt');
    var url = img.getAttribute('data-url');
    var index = images.indexOf(img);

    return createTag(document.body, 'div', function (gb) {
      gb.className = 'gallery-popup';

      if (index > 0 && index <= images.length) {
        createTag(gb, 'div', function (leftArrow) {
          leftArrow.className = 'gallery-popup-arrow gallery-popup-arrow-left';
          leftArrow.onclick = function () {
            document.body.removeChild(gb);
            imagePopup(images[index - 1], images);
          };
        });
      }

      if (index >= 0 && index < images.length-1) {
        createTag(gb, 'div', function (rightArrow) {
          rightArrow.className = 'gallery-popup-arrow gallery-popup-arrow-right';
          rightArrow.onclick = function () {
            document.body.removeChild(gb);
            imagePopup(images[index + 1], images);
          };
        });
      }

      createTag(gb, 'div', function (imageWrapper) {
        imageWrapper.className = 'gallery-popup-image';
        createTag(imageWrapper, 'img', function (imageTag) {
          imageTag.setAttribute('src', url);
          imageTag.setAttribute('alt', alt);
        });
      });

      createTag(gb, 'div', function (captionWrapper) {
        captionWrapper.className = 'gallery-popup-caption';
        createTag(captionWrapper, 'p', function (captionTag) {
          captionTag.innerText = alt;
        });
      });

      gb.onclick = function () {
        document.body.removeChild(gb);
      };
    });
  }

  function setupGallery() {
    var gallery = Array.from(document.querySelectorAll('.gallery'));
    gallery.forEach(function (gallery) {
      var images = Array.from(gallery.querySelectorAll('img'));
      gallery.addEventListener('click', function (e) {
        if (e.target && e.target.tagName === 'IMG') {
          var img = e.target;
          imagePopup(img, images);
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    setupGallery();
  });

})();
