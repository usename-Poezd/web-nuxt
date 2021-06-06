import {ActionTree, MutationTree, GetterTree} from 'vuex';
import {IKind} from "~/types";

const SET_KINDS = 'SET_KINDS';
const SET_HEADER_MENU_SHOW = 'SET_HEADER_MENU_SHOW';
const SET_SCROLL_Y = 'SET_SCROLL_Y';

export type RootState = {
  kinds: Array<IKind>,
  headerMenuShow: boolean,
  scrollY: number,
}

export const state = (): RootState => ({
  kinds: [],
  headerMenuShow: false,
  scrollY: 0
});

export const getters: GetterTree<RootState, RootState> = {
  activeKinds: (state) => state.kinds.filter( k => k.active),
  kinds: (state) => state.kinds,
  headerMenuShow: state => state.headerMenuShow
};

export const mutations: MutationTree<RootState> = {
  [SET_KINDS]: (state, kinds) => state.kinds = kinds,
  [SET_HEADER_MENU_SHOW]: (state, value: boolean) => state.headerMenuShow = value,
  [SET_SCROLL_Y]: (state, value: number) => state.scrollY = value,
};

export const actions: ActionTree<RootState, RootState> = {
  async load({ commit }) {
    const kinds = await this.$api.getKinds();
    commit(SET_KINDS, kinds)
  },

  toggleHeaderMenu({ commit, state }) {
    if (!state.headerMenuShow) {
      commit(SET_SCROLL_Y, window.scrollY);

      window.scrollTo(0,0);
    }

    commit(SET_HEADER_MENU_SHOW, !state.headerMenuShow);

    if (!state.headerMenuShow) {
      window.scrollTo(0, state.scrollY);
    }
  }
};
