import wx from 'wx';
import Fly from 'flyio';
import {coverData, makeRequestHeader} from "./sign";

const request = new Fly();

request.config.timeout = 10 * 1000;

if (process.env.NODE_ENV === 'development') {
  request.config.baseURL = '';
} else if (process.env.NODE_ENV === 'production') {
  request.config.baseURL = '';
}

request.interceptors.request.use(request => {
  wx.showLoading({title: '加载中...'});
  const headers = makeRequestHeader();
  const data = coverData(request.body, headers, headers['X-Client-Time']);
  request.headers = headers;
  request.body = data;
  return request;
});

/* eslint-disable handle-callback-err */
request.interceptors.response.use(
  response => {
    wx.hideLoading();
    return Promise.resolve(response.data);
  },
  err => {
    wx.hideLoading();
    wx.showToast({
      title: err.message,
      icon: 'none'
    });
    return Promise.resolve();
  }
);

export default request;
