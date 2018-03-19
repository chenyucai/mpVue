import Vue from 'vue';
import initPhotoSwipe from './initPhotoSwipe';
import {getOssRcfsFile} from "../api/common";

// 图片预览
Vue.directive('preview', {
  inserted(el) {
    initPhotoSwipe(el)
  }
});

// 元素拖拽
Vue.directive('drag', {
  bind(el) {
    el.ontouchmove = function (e) {
      e.preventDefault();
      let touch = e.touches[0];
      let clientW = document.documentElement.clientWidth || document.body.clientWidth;
      let clientH = document.documentElement.clientHeight || document.body.clientHeight;
      let left = touch.clientX;
      let top = touch.clientY;
      if (touch.clientX < 0) {
        left = 0;
      }
      if (touch.clientY < 0) {
        top = 0;
      }
      if (touch.clientX > clientW - 110) {
        left = clientW - 110;
      }
      if (touch.clientY > clientH - 60) {
        top = clientH - 60;
      }
      el.style.left = left + "px";
      el.style.top = top + "px";
    };
  }
});

// 处理ajax请求的图片
Vue.directive('async-image', {
  inserted(el) {
    let fileKey = el.getAttribute('data-async');
    getOssRcfsFile(fileKey).then((url) => {
      el.src = url;
    });
  }
});
