import {ActionTree, Store} from 'vuex'
import {AuthState} from "~/store/auth";
import {CoreState} from "~/store/core";

export const state = () => ({

});

export type RootState = {
  auth: AuthState
  core: CoreState
};

export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit({ state, dispatch }) {
    await dispatch('core/load');

    const { access_token, refresh_token } = state.auth;

    if (access_token || refresh_token) {
      try {
        await dispatch('auth/me')
      } catch (e) {
        // catch any errors and automatically logout the user
        await dispatch('auth/logout')
      }
    }
  }
};
