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

    var removeFns = [];
    function removeFn() {
      removeFns.forEach(function (fn) { fn(); });
    }

    return createTag(document.body, 'div', function (gb) {
      removeFns.push(function () {
        document.body.removeChild(gb);
      });
      gb.className = 'gallery-popup';

      if (index > 0 && index <= images.length) {
        createTag(gb, 'div', function (leftArrow) {
          leftArrow.className = 'gallery-popup-arrow gallery-popup-arrow-left';
          createTag(leftArrow, 'span', function (arrow) {
            arrow.innerText = '<';
          });
          function previous() {
            removeFn();
            imagePopup(images[index - 1], images);
          }
          leftArrow.onclick = previous;
          function keyHandler(e) {
            if (e.key == 'ArrowLeft') {
              previous();
            }
            if (e.key == 'Escape') {
              removeFn();
            }
          }
          document.addEventListener('keydown', keyHandler);
          removeFns.push(function () {
            document.removeEventListener('keydown', keyHandler);
          });
        });
      }

      if (index >= 0 && index < images.length-1) {
        createTag(gb, 'div', function (rightArrow) {
          rightArrow.className = 'gallery-popup-arrow gallery-popup-arrow-right';
          createTag(rightArrow, 'span', function (arrow) {
            arrow.innerText = '>';
          });
          function next() {
            removeFn();
            imagePopup(images[index + 1], images);
          }
          rightArrow.onclick = next;
          function keyHandler(e) {
            if (e.key == 'ArrowRight') {
              next();
            }
            if (e.key == 'Escape') {
              removeFn();
            }
          }
          document.addEventListener('keydown', keyHandler);
          removeFns.push(function () {
            document.removeEventListener('keydown', keyHandler);
          });
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

      gb.onclick = removeFn;
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
