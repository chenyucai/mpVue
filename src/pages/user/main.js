import Vue from 'vue';
import Page from './index.vue';

const page = new Vue(Page);
page.$mount();

export default {
  config: {
    navigationBarTitleText: '我'
  }
}
