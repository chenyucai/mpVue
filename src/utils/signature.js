import {testCompanyNo, testPubKey, testSignature} from '../config/env';
import Md5 from "../framework/utils/Md5";

const configHeader = {
  /** 请求数据格式，如： application/json */
  ContentType: 'application/json',

  /** 请求返回类型，如： HTML, JSON；默认返回 HTML */
  ReplyDataType: 'JSON',

  /** APP 版本， 如： V_1.0, V_2.0, V_3.0 */
  Vnum: 'V_3.0',

  /** APP 下载渠道, 如： IOSAppStore, AndroidAppMarket, WeChatSubscription */
  Channel: 'WeChatSubscription',

  /** 设备类型， 如: IOS, Android, Tablet, PC */
  Device: () => {
    return 'Mini Program';
  },

  /** 设备编号，每个设备的唯一标识，如 PC 的 MAC 地址 */
  Udid: () => {
    return Md5.b64_md5('Mini Program');
  },

  /** 请求时的客户端时间戳毫秒数 */
  ClientTime: () => {
    return new Date().getTime();
  },

  /** 验证公钥 */
  PubKey: () => {
    return testPubKey || wx.getStorageSync('pubKey') || 'H5';
  },

  /** 验证 */
  Signature: () => {
    return testSignature || wx.getStorageSync('signature') || 'H5';
  },

  /** 针对以上 Header 参数的 MD5 验签 */
  Authorization: (str) => {
    return Md5.hex_md5(str).toUpperCase();
  },

  /** 获取域名(机构编号) */
  CompanyNo: () => {
    return testCompanyNo;
  }
};

/**
 * 验签
 */
export const makeRequestHeader = () => {
  let r = configHeader;

  let typeSort = ['Content-Type', 'X-Reply-Type', 'X-Vnum', 'X-Channel', 'X-Device', 'X-Udid', 'X-Client-Time', 'X-Pub-Key', 'X-Signature'];

  let requestHeader = {};
  requestHeader['Content-Type'] = r.ContentType;
  requestHeader['X-Reply-Type'] = r.ReplyDataType;
  requestHeader['X-Vnum'] = r.Vnum;
  requestHeader['X-Channel'] = r.Channel;
  requestHeader['X-Device'] = r.Device();
  requestHeader['X-Udid'] = r.Udid();
  requestHeader['X-Client-Time'] = r.ClientTime();
  requestHeader['X-Pub-Key'] = r.PubKey();
  requestHeader['X-Signature'] = r.Signature();
  requestHeader['X-Company-No'] = r.CompanyNo();

  let authArray = [];
  for (let i = 0; i < typeSort.length; i++) {
    authArray.push('"' + typeSort[i] + '":"' + requestHeader[typeSort[i]] + '"');
  }
  let authStr = '{' + authArray.join(',') + '}';
  requestHeader['X-Authorization'] = r.Authorization(authStr);

  return requestHeader;
};

/**
 * 奇偶 + 掩值验签
 */
export const coverData = (params, reqHeader, time) => {
  params = params || 'N/A';
  let data = params === 'N/A' ? params : JSON.stringify(params);
  let keyt = time % 2 === 0
    ? reqHeader['X-Vnum'] + '￥' + data + '￥' + reqHeader['X-Udid']
    : reqHeader['X-Udid'] + '￥' + data + '￥' + reqHeader['X-Vnum'];
  return {
    time: time,
    keyt: Md5.hex_md5(keyt).toUpperCase(),
    data: data
  };
};
