import { Plugin } from '@nuxt/types'
import {Store} from 'vuex';
import {ApiService, ApiServiceType} from "~/services";
import {NuxtAxiosInstance} from "@nuxtjs/axios";
import {RootState} from "~/store";
declare module 'vue/types/vue' {
  // this.$myInjectedFunction inside Vue components
  interface Vue {
    $api: ApiServiceType
  }
}

declare module '@nuxt/types' {
  // nuxtContext.app.$myInjectedFunction inside asyncData, fetch, plugins, middleware, nuxtServerInit
  interface NuxtAppOptions {
    $api: ApiServiceType
  }
  // nuxtContext.$myInjectedFunction
  interface Context {
    $api: ApiServiceType
  }
}

declare module 'vuex/types/index' {
  // this.$myInjectedFunction inside Vuex stores
  interface Store<S> {
    $api: ApiServiceType
  }
}

const modAxios = (axios: NuxtAxiosInstance, store: Store<RootState>, redirect: any) => {
  const IGNORED_PATHS = ['/api/auth/v2/login', '/api/auth/v2/register', '/api/auth/v2/logout', '/api/auth/v2/refresh'];

  axios.onRequest((config) => {
    // check if the user is authenticated
    if (store.state.auth.access_token) {
      // set the Authorization header using the access token
      config.headers.Authorization = 'Bearer ' + store.state.auth.access_token
    }

    return config
  });

  axios.onError((error) => {
    return new Promise(async (resolve, reject) => {
      // ignore certain paths (i.e. paths relating to authentication)
      // @ts-ignore
      const isIgnored = IGNORED_PATHS.some(path => error.config.url.includes(path));

      // get the status code from the response
      const statusCode = error.response ? error.response.status : -1;

      // only handle authentication errors or errors involving the validity of the token
      if ((statusCode === 401) && !isIgnored) {
        // API should return a reason for the error, represented here by the text_code property

        // Example API response:
        // {
        //   status: 'failed',
        //   text_code: 'TOKEN_EXPIRED',
        //   message: 'The JWT token is expired',
        //   status_code: 401
        // }

        // retrieve the text_code property from the response, or default to null
        const { data: { text_code } = { text_code: null } } = error.response || {}

        // get the refresh token from the state if it exists
        const refreshToken = store.state.auth.refresh_token

        // determine if the error is a result of an expired access token
        // also ensure that the refresh token is present
        if (text_code === 'TOKEN_EXPIRED' && refreshToken) {

          // see below - consider the refresh process failed if this is a 2nd attempt at the request
          if (error.config.hasOwnProperty('retryAttempts')) {
            // immediately logout if already attempted refresh
            await store.dispatch('auth/logout')

            // redirect the user home
            return redirect('/')
          } else {
            // merge a new retryAttempts property into the original request config to prevent infinite-loop if refresh fails
            const config = { retryAttempts: 1, ...error.config }

            try {
              // attempt to refresh access token using refresh token
              await store.dispatch('auth/refresh')

              // re-run the initial request using the new request config after a successful refresh
              // this response will be returned to the initial calling method
              return resolve(axios(config))
            } catch (e) {
              // catch any error while refreshing the token
              await store.dispatch('auth/logout')

              // redirect the user home
              return redirect('/')
            }
          }
        } else if (text_code === 'TOKEN_INVALID') {
          // catch any other JWT-related error (i.e. malformed token) and logout the user
          await store.dispatch('auth/logout');

          // redirect the user home
          return redirect('/')
        }

        return reject(error);
      }

      // ignore all other errors, let component or other error handlers handle them
      return reject(error)
    })
  });
}

const apiPlugin: Plugin = ({$axios, store, redirect, $config}, inject) => {
  modAxios($axios, store, redirect);


  // Create a custom axios instance
  const api = $axios.create({
    headers: {
      common: {
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json'
      }
    }
  });

  // Set baseURL to something different
  api.setBaseURL($axios.defaults.baseURL + 'api/v2/');
  modAxios(api, store, redirect);


  const authApi =  $axios.create({
    transformResponse: [function (data) {
      if (!data.data) {
        return data;
      }

      return data.data;
    }],
  });
  authApi.setBaseURL($axios.defaults.baseURL + 'api/auth/v2/');
  modAxios(authApi, store, redirect);


  const apiService = new ApiService(api, authApi);

  inject('api', apiService);
};

export default apiPlugin;
