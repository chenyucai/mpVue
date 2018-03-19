/* eslint-disable */
import PhotoSwipe from 'photoswipe/dist/photoswipe.min';
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default.min';

var initPhotoSwipe = function (gallerySelector) {

  // parse slide data (url, title, size ...) from DOM elements
  // (children of gallerySelector)
  var parseThumbnailElements = function (el) {
    var thumbElements = el.getElementsByTagName('figure'),
      numNodes = thumbElements.length,
      items = [],
      figureEl,
      linkEl,
      item;

    for (var i = 0; i < numNodes; i++) {

      figureEl = thumbElements[i];

      // include only element nodes
      if (figureEl.nodeType !== 1) {
        continue;
      }

      linkEl = figureEl.getElementsByTagName('img')[0];

      // use native size
      item = {
        src: figureEl.getAttribute('data-preview'),
        msrc: figureEl.getAttribute('data-preview'),
        w: linkEl.naturalWidth,
        h: linkEl.naturalHeight
      };

      item.el = figureEl; // save link to element for getThumbBoundsFn
      items.push(item);
    }

    return items;
  };

  // find nearest parent element
  var closest = function closest(el, fn) {
    return el && ( fn(el) ? el : closest(el.parentNode, fn) );
  };

  // triggers when user clicks on thumbnail
  var onThumbnailsClick = function (e) {
    // e = e || window.event;
    // e.preventDefault ? e.preventDefault() : e.returnValue = false;

    var eTarget = e.target || e.srcElement;

    // find root element of slide
    var clickedListItem = closest(eTarget, function (el) {
      return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
    });

    if (!clickedListItem) {
      return;
    }

    // find index of clicked item by looping through all child nodes
    // alternatively, you may define index via data- attribute
    var clickedGallery = clickedListItem.parentNode,
      childNodes = clickedListItem.parentNode.getElementsByTagName('figure'),
      numChildNodes = childNodes.length,
      nodeIndex = 0,
      index;

    for (var i = 0; i < numChildNodes; i++) {
      if (childNodes[i].nodeType !== 1) {
        continue;
      }

      if (childNodes[i] === clickedListItem) {
        index = nodeIndex;
        break;
      }
      nodeIndex++;
    }


    if (index >= 0) {
      // open PhotoSwipe if valid index found
      openPhotoSwipe(index, clickedGallery);
    }
    return false;
  };


  var openPhotoSwipe = function (index, galleryElement, disableAnimation, fromURL) {
    var pswpElement = document.getElementById('G_gallery'),
      gallery,
      options,
      items;

    items = parseThumbnailElements(galleryElement);

    // define options (if needed)
    options = {
      type: 'minimal',
      showHideOpacity: true,
      history: false,
      errorMsg: '<div class="pswp__error-msg">该图片无法加载</div>',

      // define gallery index (for URL)
      // galleryUID: galleryElement.getAttribute('data-pswp-uid'),

      getThumbBoundsFn: function (index) {
        // See Options -> getThumbBoundsFn section of documentation for more info
        var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
          pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
          rect = thumbnail.getBoundingClientRect();

        return {x: rect.left, y: rect.top + pageYScroll, w: rect.width};
      }

    };

    // PhotoSwipe opened from URL
    if (fromURL) {
      if (options.galleryPIDs) {
        // parse real index when custom PIDs are used
        // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
        for (var j = 0; j < items.length; j++) {
          if (items[j].pid == index) {
            options.index = j;
            break;
          }
        }
      } else {
        // in URL indexes start from 1
        options.index = parseInt(index, 10) - 1;
      }
    } else {
      options.index = parseInt(index, 10);
    }

    // exit if index not found
    if (isNaN(options.index)) {
      return;
    }

    if (options.type === 'minimal') {
      options.mainClass = 'pswp--minimal--dark';
      options.barsSize = {top: 0, bottom: 0};
      options.captionEl = false;
      options.fullscreenEl = false;
      options.shareEl = false;
      options.bgOpacity = 0.85;
      options.tapToClose = true;
      options.tapToToggleControls = false;
    }

    if (disableAnimation) {
      options.showAnimationDuration = 0;
    }

    // Pass data to PhotoSwipe and initialize it
    gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
  };

  gallerySelector.onclick = onThumbnailsClick;
};

export default initPhotoSwipe;
