const loading = {
  show(options) {
    const opts = Object.assign({}, {
      title: '加载中',
      mask: true
    }, options);
    return wx.showLoading(opts);
  },
  hide() {
    return wx.hideLoading();
  }
};

export default {
  install(Vue) {
    Vue.prototype.$loading = loading;
  }
}
