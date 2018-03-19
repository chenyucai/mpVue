import {doRequest} from "../utils/http";

/**
 * 下单
 * @param {string} goodsId - 商品ID
 * @param {string} goodsKind - 商品服务类型；01-问诊图文服务，02-问诊语音服务
 */
export const createOrder = ({goodsId, goodsKind}) => doRequest('/api/order/create', {goodsId, goodsKind});

/**
 * 获取支付验签
 * @param payMode
 * @param orderId
 * @param deviceId
 * @param redirect
 */
export const getPaySign = ({
  payMode,
  orderId,
  deviceId,
  redirect
}) => doRequest('/api/order/paying/sign', {
  payMode,
  orderId,
  deviceId,
  redirect
});

/**
 * 获取订单列表
 * @param orderStates - 订单状态：01-未支付、02-已支付（待使用）、03-使用中、04-已退款、05-已完成
 * @param endTime
 * @param pageSize
 */
export const getOrderList = ({
  orderStates = [],
  endTime = '',
  pageSize = 15
}) => doRequest('/api/order/search', {
  orderStates,
  endTime,
  pageSize
});

/**
 * 问诊咨询中医生列表
 */
export const getConsultPurchasedDoctors = () => doRequest('/api/order/doctors/search');

/**
 * 查询订单
 * @param hospitalId
 * @param doctorId
 */
export const getOrderByHosIdAndDocId = (hospitalId, doctorId) => doRequest('/api/order/latest', {hospitalId, doctorId});
