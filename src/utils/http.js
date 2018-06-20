import {coverData, makeRequestHeader} from './sign';
import {baseUrl} from '../config/env';

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
