import { Middleware } from '@nuxt/types'

const auth: Middleware = ({store, redirect}) => {
  if (!store.getters['auth/isAuthenticated']) {
    redirect('/')
  }
};

export default auth
