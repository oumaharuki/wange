import { MUTATE } from './mutation-types';

// export default actions; demo
export function set({ commit }, data) {
  commit(MUTATE, { data });
}
