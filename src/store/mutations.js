import { MUTATE } from './mutation-types';

export default {
    [MUTATE](state, { data }) {
      console.log(data);
      state.data = data;
    },
};
