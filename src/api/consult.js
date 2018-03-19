import {doRequest} from "../utils/http";

/**
 * 医院列表
 * @param {string} hospitalName
 */
export const getConsultHospitalList = (hospitalName) => doRequest('/api/health/doctor/search/hospital', {hospitalName});

/**
 * 医生列表
 * @param {string} companyId
 * @param {string} doctorName
 */
export const getConsultDoctorList = ({companyId, doctorName}) => doRequest('/api/health/doctor/search', {
  companyId,
  doctorName
});

/**
 * 查询医生服务
 * @param {string} hospitalId
 * @param {string} doctorId
 */
export const getConsultDoctorServer = ({doctorId, hospitalId}) => doRequest('/api/health/doctor/serve/search', {
  attendId: doctorId,
  companyId: hospitalId
});

/**
 * 查询问诊单
 * @param orderId
 */
export const searchConsultSheet = (orderId) => doRequest('/api/consult/sheet/search', {orderId});

/**
 * 保存问诊单
 * @param {ConsultSheetRequest} model
 */
export const saveConsultSheet = (model) => doRequest('/api/consult/sheet/upsert', model);
