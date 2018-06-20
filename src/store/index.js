import Vue from 'vue';
import Vuex from 'vuex';
import consult from './modules/consult';
// import createPersistedState from 'vuex-persistedstate';
import createLogger from 'vuex/dist/logger';
import root from "./root";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

// const plugins = [createPersistedState({storage: window.sessionStorage, key: '__RC_HEALTH_STORE__'})];
// debug ? plugins.push(createLogger()) : null;

export default new Vuex.Store({
  ...root,
  modules: {
    consult
  },
  plugins: [
    createLogger()
  ],
  strict: debug
});
