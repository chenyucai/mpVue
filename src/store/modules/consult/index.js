import {
  getConsultChatDoctorList,
  getConsultDoctorList, getConsultServerById,
  getConsultServerPackageList
} from "../../../api/consult";
import {
  SET_CONSULT_CHAT_DOCTOR_LIST,
  SET_CONSULT_DOCTOR_LIST,
  SET_CONSULT_SELECTED_DOCTOR, SET_CONSULT_SELECTED_SERVER,
  SET_CONSULT_SERVER_LIST
} from "../../mutation-types";

const state = {
  // 医生列表
  doctorList: [],
  // 所有医生
  allDoctors: [],
  // 选择的医生
  selectedDoctor: {},
  // 服务列表
  serverList: [],
  // 选择的服务
  selectedServer: {},
  // 聊天医生列表
  chatDoctorList: []
};

const getters = {
  hospitalList: state => state.hospitalList,
  doctorList: state => state.doctorList,
  serverList: state => state.serverList,
  allDoctors: state => state.allDoctors,
  chatDoctorList: state => state.chatDoctorList
};

const actions = {
  // 获取医生服务包列表
  async getServerPackageList({commit}, doctorId) {
    const list = await getConsultServerPackageList(doctorId);
    commit(SET_CONSULT_SERVER_LIST, list);
  },
  // 通过id获取服务
  async getServerById({commit}, id) {
    const server = await getConsultServerById(id);
    commit(SET_CONSULT_SELECTED_SERVER, server);
  },
  // 获取医生列表
  async getDoctorList({commit}) {
    let doctors = await getConsultDoctorList({});
    commit(SET_CONSULT_DOCTOR_LIST, doctors);
  },
  // 查询聊天医生列表
  async getChatDoctorList({commit}) {
    let chatDoctorList = await getConsultChatDoctorList();
    chatDoctorList = chatDoctorList.map(item => {
      try {
        item.latestMsg = JSON.parse(item.latestMsg);
      } catch (e) {
        item.latestMsg = '';
      }
      return item;
    });
    commit(SET_CONSULT_CHAT_DOCTOR_LIST, chatDoctorList);
  }
  // // 查询所有医生
  // async getAllDoctors({state, commit, dispatch}) {
  //   await dispatch('getHospitalList');
  //   let companyIds = state.hospitalList.map(item => item.hospitalId);
  //   const doctors = await getConsultDoctorList({companyIds});
  //   commit(SET_CONSULT_ALL_DOCTORS, doctors);
  // },
  // // 获取医生服务
  // async getDoctorServer({commit, state}) {
  //   let doctorId = state.selectedDoctor.id;
  //   let hospitalId = state.selectedDoctor.hospitalId;
  //   let servers = await getConsultDoctorServer({doctorId, hospitalId});
  //   commit(SET_CONSULT_SERVER_LIST, servers);
  //   commit(SET_CONSULT_SELECTED_SERVER, servers[0]);
  // }
};

const mutations = {
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
  // 选择的服务
  [SET_CONSULT_SELECTED_SERVER](state, server) {
    state.selectedServer = server;
  },
  // 聊天医生列表
  [SET_CONSULT_CHAT_DOCTOR_LIST](state, doctors) {
    state.chatDoctorList = doctors;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
