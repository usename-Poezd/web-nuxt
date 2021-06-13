import { Middleware } from '@nuxt/types'

const guest: Middleware = ({store, redirect}) => {
  if (store.getters['auth/isAuthenticated']) {
    redirect('/')
  }
};

export default guest
