import {getUserInfo, login} from "../api/common";
import {SET_USER_INFO} from "./mutation-types";

const state = {
  // 用户信息
  userInfo: {}
};

const getters = {
};

const actions = {
  // 获取用户信息
  async getUserInfo({commit}) {
    let userInfo = await getUserInfo();
    commit(SET_USER_INFO, userInfo);
  },
  async login() {
    let companyId = '57071ca7ee28d006763cd5dc';
    let openId = 'onlv_0Ys_2Tew2Hzt6RwzGIizZgY';
    await login(companyId, openId).then((data) => {
      let pubKey = data.key;
      let signature = data.value;
      wx.setStorageSync('pubKey', pubKey);
      wx.setStorageSync('signature', signature);
    });
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
