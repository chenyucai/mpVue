const originJsonp = {};
import {coverData, makeRequestHeader} from './signature';
import {baseUrl} from '../config/env';
import Md5 from "../framework/utils/Md5";

export const doRequest = (url, params, options) => {
  const header = makeRequestHeader();
  const data = coverData(Object.assign({}, params), header, header['X-Client-Time']);

  return new Promise((resolve, reject) => {
    wx.request({
      method: 'POST',
      url: baseUrl + url,
      header,
      data,
      success: (response) => {
        const res = response.data;
        if (res.result) {
          resolve(res.data)
        } else {
          wx.showToast({
            icon: 'none',
            title: res.msg,
            duration: 3000
          });
          reject(res)
        }
      },
      fail: (res) => {
      }
    })
  });
};

export const blob = (url, params) => {
  const header = makeRequestHeader();
  const data = coverData(Object.assign({}, params), header, header['X-Client-Time']);

  return wx.request({
    method: 'POST',
    responseType: 'blob',
    baseURL: baseUrl,
    url: url,
    header,
    data
  }).then((res) => {
    return new Promise((resolve, reject) => {
      resolve((window.URL || window.webkitURL).createObjectURL(res.data));
    });
  });
};

export function jsonp(url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data);

  return new Promise((resolve, reject) => {
    return originJsonp(url, Object.assign({}, option), (err, res) => {
      if (!err) {
        resolve(res.data || res)
      } else {
        reject(err)
      }
    })
  })
}

export function param(data) {
  const timestamp = new Date().getTime();
  data = {...data, '@T': timestamp};
  let url = '';
  for (let k in data) {
    let value = data[k] !== undefined ? data[k] : '';
    url += '&' + k + '=' + encodeURIComponent(value)
  }
  return url ? url.substring(1) : ''
}

export function encJsonp(url, data, option) {
  let params = param(data);
  url += (url.indexOf('?') < 0 ? '?' : '&') + params;
  let defOpt = {
    param: '@C',
    name: encryp(params)
  };

  return new Promise((resolve, reject) => {
    return originJsonp(url, Object.assign({}, defOpt, option), (err, res) => {
      if (res.result) {
        resolve(res.data || res)
      } else {
        reject(err)
      }
    })
  })
}

export function encryp(params) {
  return '_' + Md5.hex_md5(params.split('').reverse().join('')).toUpperCase().substr(1);
}
