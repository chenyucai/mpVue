import Md5 from "../framework/utils/Md5";

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

/**
 * 聊天键, A->B、B->A对话永远以患者为中心只保存 md5(companyID + patientId + doctorId)
 * @param companyId
 * @param patientId
 * @param doctorId
 */
export const makeIMChatId = (companyId, patientId, doctorId) => {
  return Md5.hex_md5(companyId + patientId + doctorId);
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
