import { MUTATE,RANKINGLIST,HOTRECOMMENDLISTLIMIT } from './mutation-types';

// export default actions; demo
export function set({ commit }, data) {
  commit(MUTATE, { data });
}
//设置排行列表
export function setRankingList({ commit }, data) {
  commit(RANKINGLIST, { data });
}
//设置hotRecommendListLimit
export function sethotRecommendListLimit({ commit }, data) {
  commit(HOTRECOMMENDLISTLIMIT, { data });
}
