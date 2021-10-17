import createPersistedState from 'vuex-persistedstate'
import cookie from 'cookie';
import { Plugin } from '@nuxt/types'


const localStorage: Plugin = ({ store, req, $cookies }) => {
  createPersistedState({
    key: 'nvcs', // choose any name for your cookie
    paths: [
      // persist the access_token and refresh_token values from the "auth" store module
      'auth.access_token',
      'auth.refresh_token',
      'core.tableCategoryView'
    ],
    storage: {
      // if on the browser, parse the cookies using js-cookie otherwise parse from the raw http request
      getItem: key => process.client ? $cookies.get(key) : cookie.parse(req.headers.cookie || '')[key],
      // js-cookie can handle setting both client-side and server-side cookies with one method
      // use isDev to determine if the cookies is accessible via https only (i.e. localhost likely won't be using https)
      setItem: (key, value) => $cookies.set(key, value, { maxAge: 60 * 60 * 24 * 14}),
      // also allow js-cookie to handle removing cookies
      removeItem: key => $cookies.remove(key)
    }
  })(store)
};

export default localStorage;
