import request from '../utils/request';

/**
 * 医生列表
 * @param doctorName
 * @returns {FlyPromise<any>}
 */
export function getConsultDoctorList({doctorName = ''}) {
  return request.post(`health/consult/doctor/search`, {doctorName});
}

/**
 * 获取医生服务包列表
 * @param doctorId
 */
export function getConsultServerPackageList(doctorId) {
  return request.post(`health/consult/package/search`, {doctorId});
}

/**
 * 通过id查询服务
 * @param id
 */
export function getConsultServerById(id) {
  return request.post(`health/consult/package/detail`, {id});
}

/**
 * 消息列表
 */
export function getConsultChatDoctorList() {
  return request.post(`health/consult/chat/list`);
}
