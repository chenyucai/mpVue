import request from '../utils/request';

/**
 * 获取用户信息
 * @returns {FlyPromise<any>}
 */
export function getUserInfo() {
  return request.post(`user/info/search`);
}

/**
 * 登录
 * @param companyId
 * @param openId
 * @returns {FlyPromise<any>}
 */
export function login(companyId, openId) {
  return request.get(`access/login?companyId=${companyId}&openId=${openId}`)
}
