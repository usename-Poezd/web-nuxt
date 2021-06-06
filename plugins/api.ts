import { Plugin } from '@nuxt/types'
import {ApiService, ApiServiceType} from "~/services";
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
