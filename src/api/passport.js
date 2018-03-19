import {doRequest} from "../utils/http";

/**
 * 查询护照手术信息
 */
export const getPassportSurgeryInfo = () => doRequest('/api/health/passport/surgery/search');

/**
 * 保存护照手术信息
 * @param {PassportSurgeryInfoModel} model
 */
export const savePassportSurgeryInfo = (model) => doRequest('/api/health/passport/surgery/upsert', model);

/**
 * 查询护照病理信息
 */
export const getPassportPathologyInfo = () => doRequest('/api/health/passport/pathology/search');

/**
 * 保存护照病理信息
 * @param model
 */
export const savePassportPathologyInfo = (model) => doRequest('/api/health/passport/pathology/upsert', model);

/**
 * 查询护照治疗信息
 */
export const getPassportTreatmentInfo = () => doRequest('/api/health/passport/treatment/search');

/**
 * 保存护照治疗信息
 * @param model
 */
export const savePassportTreatmentInfo = (model) => doRequest('/api/health/passport/treatment/upsert', model);

/**
 * 查询护照报告信息
 */
export const getPassportReportInfo = () => doRequest('/api/health/passport/report/search');

/**
 * 保存护照报告信息
 * @param model
 */
export const savePassportReportInfo = (model) => doRequest('/api/health/passport/report/upsert', model);

/**
 * 删除一条护照报告信息
 * @param reportId
 */
export const removePassportReportInfo = (reportId) => doRequest('/api/health/passport/report/remove', {reportId});
