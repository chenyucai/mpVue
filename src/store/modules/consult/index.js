import {
  getConsultDoctorList, getConsultDoctorServer, getConsultHospitalList,
  saveConsultSheet
} from "../../../api/consult";
import {
  PUSH_CONSULT_CHAT_MSG,
  SET_CONSULT_CHAT_MSG_LIST, SET_CONSULT_CURR_CHAT_DOCTOR,
  SET_CONSULT_DOCTOR_LIST, SET_CONSULT_HOSPITAL_LIST, SET_CONSULT_LATEST_MSG_MAP, SET_CONSULT_CURR_BUY_ORDER,
  SET_CONSULT_SELECTED_DOCTOR,
  SET_CONSULT_SELECTED_HOSPITAL, SET_CONSULT_SERVER_LIST, SET_CONSULT_PURCHASED_DOCTORS, SET_CONSULT_SHEET,
  SET_CONSULT_CURR_CHAT_ORDER
} from "../../mutation-types";
import ArrayUtils from "../../../framework/utils/ArrayUtils";
import PayRequest from "../../../model/pay/pay";
import PayUtils from "../../../framework/utils/PayUtils";
const configHeader = {};
import {genderToText, getImageUrl, ImMessageTypes, makeIMChatId, PayMode} from "../../../utils/utils";
import {createOrder, getConsultPurchasedDoctors, getOrderByHosIdAndDocId, getPaySign} from "../../../api/order";

const Loading = {};
import {throwErrorMessage} from "../../../framework/framework";
import initNimSDK from "../../../utils/initNimSDK";
import {connectIM, disconnectIM, getImMessages, getLatestMessage, sendImMessage} from "../../../api/im";
import ObjectUtils from "../../../framework/utils/ObjectUtils";
import ConsultSheetRequest from "../../../model/consult/sheet";
import ImMessageRequest from "../../../model/im/message";

const state = {
  // 医院列表
  hospitalList: [],
  // 医生列表
  doctorList: [],
  // 选择的医院
  selectedHospital: {},
  // 选择的医生
  selectedDoctor: {},
  // 服务列表
  serverList: [],
  // 当前购买的订单
  currBuyOrder: {},
  // 问诊单
  consultSheet: {},
  // 聊天消息
  chatMsgList: [],
  // 当前聊天的医生
  currChatDoctor: {},
  // 当前聊天的订单
  currChatOrder: {},
  // 已购买的医生
  purchasedDoctors: [],
  // 最近的消息集合
  latestMsgMap: {}
};

const getters = {
  hospitalList(state) {
    return state.hospitalList.map(item => {
      return {...item, hospitalImg: getImageUrl(item.hospitalImg)};
    })
  },
  doctorList: state => state.doctorList,
  // 默认选择的服务
  selectedServer(state) {
    return ArrayUtils.isNullOrEmpty(state.serverList) ? [] : state.serverList[0];
  },
  // 聊天消息
  chatMsgList(state, getters, rootState) {
    let list = ObjectUtils.deepCopy(state.chatMsgList);
    return list.reverse().map(item => {
      return {
        ...item,
        // 判断是医生消息还是患者消息
        msgType: item.relationId === rootState.userInfo.id ? 'patient' : 'doctor'
      }
    });
  },
  // 咨询中医生列表
  consultingDoctorList(state) {
    return state.purchasedDoctors.map(item => {
      let chatId = makeIMChatId(item.companyId, item.patientId, item.doctorId);
      let content = '';
      let contentType = '';
      let message = state.latestMsgMap[chatId] || {};
      let letter = message.letters;
      if (!ObjectUtils.isNullOrEmpty(letter)) {
        content = letter.desc;
        contentType = letter.kinds;
      }
      return {
        ...item,
        content,
        contentType,
        // 是否有新消息
        hasNewMessage: false,
        // 是否是自己的信息
        isOwnMessage: message.relationId === item.patientId
      };
    });
  }
};

const actions = {
  // 获取医院列表
  async getHospitalList({commit}, {hospitalName = ''}) {
    let hospitals = await getConsultHospitalList(hospitalName);
    commit(SET_CONSULT_HOSPITAL_LIST, hospitals);
  },
  // 获取医生列表
  async getDoctorList({commit, state}, {doctorName = ''}) {
    let companyId = state.selectedHospital.hospitalId;
    let doctors = await getConsultDoctorList({companyId, doctorName});
    commit(SET_CONSULT_DOCTOR_LIST, doctors);
  },
  // 获取医生服务
  async getDoctorServer({commit, state}) {
    let doctorId = state.selectedDoctor.id;
    let hospitalId = state.selectedHospital.hospitalId;
    let servers = await getConsultDoctorServer({doctorId, hospitalId});
    commit(SET_CONSULT_SERVER_LIST, servers);
  },
  // 创建订单
  async createOrder({getters, commit}) {
    let goodsId = getters.selectedServer.id;
    let goodsKind = getters.selectedServer.goodsKind;
    let order = await createOrder({goodsId, goodsKind});
    commit(SET_CONSULT_CURR_BUY_ORDER, order);
  },
  // 支付
  async createPay({state}) {
    Loading.show();
    let params = await getPaySign({
      payMode: PayMode.WenXin,
      orderId: state.currBuyOrder.id,
      deviceId: configHeader.Udid(),
      redirect: window.location.href
    });
    PayUtils.createPay(new PayRequest().map({...params}), (status, msg) => {
      Loading.hide();
      if (!status) {
        throwErrorMessage(msg);
      }
    });
  },
  // 获取当前聊天的订单
  async getCurrChatOrder({state, commit}) {
    let hospitalId = state.currChatDoctor.companyId;
    let doctorId = state.currChatDoctor.doctorId;
    let order = await getOrderByHosIdAndDocId(hospitalId, doctorId);
    commit(SET_CONSULT_CURR_CHAT_ORDER, order);
  },
  // 保存问诊单
  async saveConsultSheet({state, rootState, dispatch}) {
    let model = new ConsultSheetRequest().map(ObjectUtils.deepCopy(state.consultSheet));
    if (model.verify()) {
      await saveConsultSheet(model.convert());
      let userInfo = rootState.userInfo.urInfo;
      // 发送病理消息
      let infoTpl = `
        患者信息：${userInfo.realName} ${genderToText(userInfo.gender)}${'<br>'}
        手机号：${userInfo.phone}${'<br>'}
        病理类型：${model.pathologyType}${'<br>'}
        手术日期：${model.surgeryDate}${'<br>'}
        月经状态：${model.menstrualState}${'<br>'}
        乳腺癌/卵巢癌家族史：${model.familyCancer}${'<br>'}
        咨询目的：${model.consultPurpose}${'<br>'}
        病情描述：${model.illnessSituation}
      `;
      let userInfoLetter = new ImMessageRequest().map({
        kinds: ImMessageTypes.Text,
        desc: infoTpl,
        size: infoTpl.length
      });
      let images = [];
      model.reportsInfo.forEach(item => {
        images = [...images, ...item.imgs];
      });
      let imagesLetter = new ImMessageRequest().map({
        kinds: ImMessageTypes.IMG,
        desc: ArrayUtils.toString(images),
        size: images.length
      });
      await dispatch('sendMessage', {letter: userInfoLetter});
      if (!ArrayUtils.isNullOrEmpty(imagesLetter)) {
        await dispatch('sendMessage', {letter: imagesLetter});
      }
    }
  },
  // 连接IM
  async connectIM({state, rootState, dispatch, commit}) {
    let companyId = rootState.userInfo.companyId;
    let userId = rootState.userInfo.id;
    const nimAccount = await connectIM(companyId, userId);
    // 初始化NIM实例，连接云信
    let {appKey, account, token} = nimAccount;
    window.nim = initNimSDK({
      appKey,
      account,
      token,
      oncustomsysmsg: (sysMsg) => {
        console.log('收到自定义系统通知', sysMsg);
        // dispatch('getMessages');
        if (sysMsg.content === 'disconnect') {
          throwErrorMessage('您已断开连接');
        } else {
          try {
            let message = JSON.parse(sysMsg.content);
            commit(PUSH_CONSULT_CHAT_MSG, message);
          } catch (e) {
            console.log(e)
          }
        }
      }
    });
  },
  // 断开连接
  async disconnectIM(state, rootState) {
    console.log('disconnect')
    let companyId = rootState.userInfo.companyId;
    let userId = rootState.userInfo.id;
    disconnectIM(companyId, userId);
  },
  // 初始化聊天消息
  async initChatMessages({dispatch}) {
    await dispatch('getCurrChatOrder');
    await dispatch('getMessages');
  },
  // 获取消息
  async getMessages({state, rootState, commit}) {
    let messages = await getImMessages({
      companyId: state.currChatDoctor.companyId,
      patientId: rootState.userInfo.id,
      doctorId: state.currChatDoctor.doctorId
    });
    commit(SET_CONSULT_CHAT_MSG_LIST, messages);
  },
  // 发送消息
  async sendMessage({state, dispatch}, {letter}) {
    await sendImMessage({
      companyId: state.currChatDoctor.companyId,
      orderId: state.currChatOrder.id,
      doctorId: state.currChatDoctor.doctorId,
      letter
    });
  },
  // 获取已购买的医生
  async getConsultingDoctorList({commit}) {
    let doctors = await getConsultPurchasedDoctors();
    let chats = [];
    let companies = [];
    doctors.forEach(item => {
      companies.push(item.companyId);
      chats.push(makeIMChatId(item.companyId, item.patientId, item.doctorId));
    });
    console.log(chats, companies)
    let msgMap = await getLatestMessage(chats.join('!'), companies.join('!'));
    commit(SET_CONSULT_PURCHASED_DOCTORS, doctors);
    commit(SET_CONSULT_LATEST_MSG_MAP, msgMap);
  }
};

const mutations = {
  // 医院列表
  [SET_CONSULT_HOSPITAL_LIST](state, hospitals) {
    state.hospitalList = hospitals;
  },
  // 选择医院
  [SET_CONSULT_SELECTED_HOSPITAL](state, hospital) {
    state.selectedHospital = hospital;
  },
  // 医生列表
  [SET_CONSULT_DOCTOR_LIST](state, doctors) {
    state.doctorList = doctors;
  },
  // 选择医生
  [SET_CONSULT_SELECTED_DOCTOR](state, doctor) {
    state.selectedDoctor = doctor;
  },
  // 服务列表
  [SET_CONSULT_SERVER_LIST](state, servers) {
    state.serverList = servers;
  },
  // 问诊单
  [SET_CONSULT_SHEET](state, sheet) {
    state.consultSheet = sheet;
  },
  // 正在购买订单
  [SET_CONSULT_CURR_BUY_ORDER](state, order) {
    state.currBuyOrder = order;
  },
  // 咨询中医生列表
  [SET_CONSULT_PURCHASED_DOCTORS](state, doctors) {
    state.purchasedDoctors = doctors;
  },
  // 最近消息map
  [SET_CONSULT_LATEST_MSG_MAP](state, msgMap) {
    state.latestMsgMap = msgMap;
  },
  // 当前聊天的医生
  [SET_CONSULT_CURR_CHAT_DOCTOR](state, doctor) {
    state.currChatDoctor = doctor;
  },
  // 当前聊天的订单
  [SET_CONSULT_CURR_CHAT_ORDER](state, order) {
    state.currChatOrder = order;
  },
  // 聊天消息
  [SET_CONSULT_CHAT_MSG_LIST](state, messages) {
    state.chatMsgList = messages;
  },
  // 插入聊天信息
  [PUSH_CONSULT_CHAT_MSG](state, message) {
    state.chatMsgList.unshift(message);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
