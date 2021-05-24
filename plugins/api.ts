import { Plugin } from '@nuxt/types'
import {ApiService, IApiService} from "~/services";
declare module 'vue/types/vue' {
  // this.$myInjectedFunction inside Vue components
  interface Vue {
    $api: IApiService
  }
}

declare module '@nuxt/types' {
  // nuxtContext.app.$myInjectedFunction inside asyncData, fetch, plugins, middleware, nuxtServerInit
  interface NuxtAppOptions {
    $api: IApiService
  }
  // nuxtContext.$myInjectedFunction
  interface Context {
    $api: IApiService
  }
}

declare module 'vuex/types/index' {
  // this.$myInjectedFunction inside Vuex stores
  interface Store<S> {
    $api: IApiService
  }
}


const apiPlugin: Plugin = (ctx, inject) => {
  // Create a custom axios instance
  const api = ctx.$axios.create({
    headers: {
      common: {
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json'
      }
    }
  });

  // Set baseURL to something different
  api.setBaseURL('http://localhost/api/v2/');

  const apiService = new ApiService(api);

  inject('api', apiService);
};

export default apiPlugin;
