import { MUTATE, RANKINGLIST, HOTRECOMMENDLISTLIMIT, PAGEINDEX } from './mutation-types';

export default {
  [MUTATE](state, { data }) {
    state.data = data;
  },
  [RANKINGLIST](state, { data }) {
    state.rankingList = data;
    state.male = data.male;
    state.female = data.female;
  },
  [HOTRECOMMENDLISTLIMIT](state, { data }) {
    state.data = data;
  },
  [PAGEINDEX](state, data) {
    state.pageIndex = data
  }
}
