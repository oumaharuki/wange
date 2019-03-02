import * as actions from './actions';
import mutations from './mutations';
import * as getters from './getters';
import state from './state';
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  namespaced: true,
  mutations,
  actions,
  state,
  getters
});
// export default {
//     namespaced: true,
//     mutations,
//     actions,
//     state,
//     getters
// };
