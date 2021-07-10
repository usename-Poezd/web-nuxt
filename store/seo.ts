import {MutationTree} from "vuex";
import {ISeoOption,} from "~/types";

export const SEO_MUTATIONS = {
  SET_SEO_OPTION: 'SET_SEO_OPTION'
};

export type SeoState = {
  option: ISeoOption
}

export const state = (): SeoState => ({
  option: {} as ISeoOption
});

export const mutations: MutationTree<SeoState> = {
  [SEO_MUTATIONS.SET_SEO_OPTION]: (state, seo: ISeoOption) => {
    state.option = {...seo}
  }
};

