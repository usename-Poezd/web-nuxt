import {ActionTree, MutationTree, GetterTree} from 'vuex';
import {IKind, ISocial} from "~/types";

export const SET_KINDS = 'SET_KINDS';
const SET_SOCIALS = 'SET_SOCIALS';
const SET_HEADER_MENU_SHOW = 'SET_HEADER_MENU_SHOW';
const SET_SCROLL_Y = 'SET_SCROLL_Y';
const SET_KINDS_LOADING = 'SET_KINDS_LOADING';
export const SET_TABLE_CATEGORY_VIEW = 'SET_TABLE_CATEGORY_VIEW';
export const SET_REDIRECT_LINK = 'SET_REDIRECT_LINK';

export type CoreState = {
  kindsLoading: boolean,
  kinds: Array<IKind>,
  socials: Array<ISocial>
  headerMenuShow: boolean,
  scrollY: number,
  tableCategoryView: boolean,
  redirectLink: string
}

export const state = (): CoreState => ({
  kindsLoading: false,
  kinds: [],
  socials: [],
  headerMenuShow: false,
  scrollY: 0,
  tableCategoryView: false,
  redirectLink: ''
});

export const getters: GetterTree<CoreState, CoreState> = {
  activeKinds: (state): Array<IKind> => state.kinds.filter( k => k.active),
  activeKind: (state) => (slug: string): IKind|undefined => state.kinds.find( k => k.slug === slug),
};

export const mutations: MutationTree<CoreState> = {
  [SET_TABLE_CATEGORY_VIEW]: (state, payload: boolean) => state.tableCategoryView = payload,
  [SET_KINDS]: (state, kinds: Array<IKind>) => state.kinds = kinds,
  [SET_SOCIALS]: (state, socials: Array<ISocial>) => state.socials = socials,
  [SET_HEADER_MENU_SHOW]: (state, value: boolean) => state.headerMenuShow = value,
  [SET_SCROLL_Y]: (state, value: number) => state.scrollY = value,
  [SET_REDIRECT_LINK]: (state, value: string) => state.redirectLink = value,
  [SET_KINDS_LOADING]: (state, value: boolean) => state.kindsLoading = value,
};

export const actions: ActionTree<CoreState, CoreState> = {
  async load({ commit }) {
    const socials = await this.$api.getSocials();
    commit(SET_SOCIALS, socials);
  },

  async fetchKinds({ commit }, options: any = {}) {
    commit(SET_KINDS_LOADING, true);
    const kinds = await this.$api.getKinds(options);
    commit(SET_KINDS_LOADING, false);
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
