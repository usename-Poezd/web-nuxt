import {MutationTree, ActionTree, GetterTree} from "vuex";

export const AUTH_MUTATIONS = {
  SET_USER: 'SET_USER',
  SET_PAYLOAD: 'SET_PAYLOAD',
  LOGOUT: 'LOGOUT',
};

export type AuthState = {
  access_token: string,
  refresh_token: string,
  user: any,
}

export const state = (): AuthState => ({
  access_token: '', // JWT access token
  refresh_token: '', // JWT refresh token,
  user: null
});

export const mutations: MutationTree<AuthState> = {
  // store the logged in user in the state
  [AUTH_MUTATIONS.SET_USER] (state, user) {
    state.user = user;
  },

  // store new or updated token fields in the state
  [AUTH_MUTATIONS.SET_PAYLOAD] (state, { access_token, refresh_token = null }) {
    state.access_token = access_token;

    // refresh token is optional, only set it if present
    if (refresh_token) {
      state.refresh_token = refresh_token
    }
  },

  // clear our the state, essentially logging out the user
  [AUTH_MUTATIONS.LOGOUT] (state) {
    state.user = null;
    state.access_token = '';
    state.refresh_token = '';
  },
};

export const actions: ActionTree<AuthState, AuthState> = {
  async me({ commit, state }) {
    const {access_token} = state;

    // make an API call to login the user with an email address and password
    const data = await this.$api.me(access_token);

    // commit the user and tokens to the state
    commit(AUTH_MUTATIONS.SET_USER, data);
  },

  async login ({ commit, dispatch }, loginData) {
    // make an API call to login the user with an email address and password
    const { user, ...payload } = await this.$api.login(loginData);

    // commit the user and tokens to the state
    commit(AUTH_MUTATIONS.SET_USER, user);
    commit(AUTH_MUTATIONS.SET_PAYLOAD, payload);
  },

  // given the current refresh token, refresh the user's access token to prevent expiry
  async refresh ({ commit, state }) {
    const { refresh_token } = state;

    // make an API call using the refresh token to generate a new access token
    const { user, ...payload } = await this.$api.refresh(refresh_token);

    commit(AUTH_MUTATIONS.SET_USER, user);
    commit(AUTH_MUTATIONS.SET_PAYLOAD, payload);
  },

  // logout the user
  logout ({ commit, state }) {
    commit(AUTH_MUTATIONS.LOGOUT)
  },
};

export const getters: GetterTree<AuthState, AuthState> = {
  // determine if the user is authenticated based on the presence of the access token
  isAuthenticated: (state) => {
    return !!state.access_token
  },
};
