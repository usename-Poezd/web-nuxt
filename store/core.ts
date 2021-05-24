import {ActionTree, MutationTree} from 'vuex'

const SET_KINDS = 'SET_KINDS';

export const state = () => ({
  kinds: []
});

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  [SET_KINDS]: (state, kinds) => state.kinds = kinds
};

export const actions: ActionTree<RootState, RootState> = {
  async load({ commit }) {
    const kind = await this.$api.$get('kinds');
  }
};
