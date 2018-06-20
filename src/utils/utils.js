export const getImageUrl = (url, imageAction = '') => {
  if (url && url.substr(0, 4) === 'http') {
    return url;
  } else {
    return `http://rcst.oss-cn-shanghai.aliyuncs.com/${url}?${imageAction}`;
  }
};

// 支付类型
export const PayMode = {
  WenXin: '01',
  AliPay: '02'
};

// 订单状态
export const OrderStateMap = {
  UnPay: '01', // 未支付
  Payed: '02', // 已支付
  Using: '03', // 使用中
  Refunding: '04', // 退款中
  Refunded: '05', // 已退款
  Finished: '06' // 已完成
};

export const goodsKindToText = (code) => {
  switch (code) {
    case '01':
      return '图文问诊';
    case '02':
      return '语音问诊';
    default:
      return '';
  }
};

export const genderToText = (code) => {
  switch (code) {
    case '01':
      return '男';
    case '02':
      return '女';
    default:
      return '';
  }
};

export const ImMessageTypes = {
  Text: 'Text',
  IMG: 'IMG',
  Audio: 'Audio',
  Video: 'Video'
};

export const doctorLevelToText = (code) => {
  return {
    '01': '主任医师',
    '02': '副主任医师',
    '03': '医师',
    '04': '护士长',
    '05': '护士',
    '06': '主治医师',
    '07': '住院医师'
  }[code];
};
