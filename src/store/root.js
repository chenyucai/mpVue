import {getUserInfo} from "../api/common";
import {SET_USER_INFO} from "./mutation-types";
import StringUtils from "../framework/utils/StringUtils";

const state = {
  // 用户信息
  userInfo: {}
};

const getters = {
  // 用户是否注册
  isUserRegistered(state) {
    let userInfo = state.userInfo;
    return !StringUtils.isBlank(userInfo.urInfo.id);
  },
  // 医院列表map
  hospitalMap(state) {
    let map = {};
    state.consult.hospitalList.forEach(item => {
      map[item.hospitalId] = item;
    });
    return map;
  }
};

const actions = {
  // 获取用户信息
  async getUserInfo({commit}) {
    let userInfo = await getUserInfo();
    commit(SET_USER_INFO, userInfo);
  }
};

const mutations = {
  [SET_USER_INFO](state, userInfo) {
    state.userInfo = userInfo;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}
