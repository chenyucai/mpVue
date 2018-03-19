import {doRequest, encJsonp} from "../utils/http";
const getJsonpDomain = {};
import Md5 from "../framework/utils/Md5";

/**
 * 获取云信账号
 * @param {string} companyId - 机构ID
 * @param {string} relationId - 关联业务用户ID, PatientID/DoctorID/OperatorID
 */
export const connectIM = (companyId, relationId) => encJsonp(getJsonpDomain() + '/message/api/im/connect', {
  companyId,
  relationId
});

/**
 * 断开连接
 * @param {string} companyId - 机构ID
 * @param {string} relationId - 关联业务用户ID, PatientID/DoctorID/OperatorID
 */
export const disconnectIM = (companyId, relationId) => encJsonp(getJsonpDomain() + '/message/api/im/disconnect', {
  companyId,
  relationId
});

/**
 * 查询聊天信息
 * @param {string} companyId
 * @param {string} patientId
 * @param {string} doctorId
 * @param {timestamp | *} endTime
 */
export const getImMessages = ({
  companyId,
  patientId,
  doctorId,
  endTime = ''
}) => {
  // 聊天键, A->B、B->A对话永远以患者为中心只保存 md5(CompanyID + AID + BID), AID为患者id
  let chatting = Md5.hex_md5(companyId + patientId + doctorId);
  return encJsonp(getJsonpDomain() + '/message/api/im/messages', {companyId, chatting, endTime});
};

/**
 * 在线问诊发送消息
 * @param {string} companyId
 * @param {string} orderId
 * @param {string} doctorId
 * @param {ImMessageRequest} letter
 */
export const sendImMessage = ({
  companyId,
  orderId,
  doctorId,
  letter
}) => doRequest('/api/intelli/chatting', {companyId, orderId, doctorId, letter});

/**
 * 查询最新聊天信息， chats 消息键多个以!分隔，companies 机构ID多个以!分隔；chats与companies位值要对应
 * @param chats
 * @param companies
 */
export const getLatestMessage = (chats, companies) => encJsonp(getJsonpDomain() + '/message/api/im/latest/msg', {chats, companies});
