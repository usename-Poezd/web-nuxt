<template>
  <div :style="!$device.isDesktop && 'padding-bottom: 56px;'">
    <LazyHydrate when-visible>
      <ModalsContainer/>
    </LazyHydrate>
    <LazyHydrate on-interaction="click">
      <Header/>
    </LazyHydrate>
    <LazyHydrate never :trigger-hydration="headerMenuShow">
      <HeaderMenu v-if="headerMenuShow"/>
    </LazyHydrate>
    <Nuxt  v-if="!headerMenuShow"/>
    <LazyHydrate never :trigger-hydration="!$device.isDesktop">
      <MobileHeader v-if="!$device.isDesktop"/>
    </LazyHydrate>
    <LazyHydrate never>
      <Footer/>
    </LazyHydrate>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapActions, mapMutations, mapState} from 'vuex';
import {getFirebaseToken, setFirebaseToken} from "~/utils";
import {AUTH_MUTATIONS} from "~/store/auth";
// @ts-ignore
import LazyHydrate from 'vue-lazy-hydration';

export default Vue.extend({
  components: {
    LazyHydrate,
    Header: () => import('~/components/Headers/Header'),
    HeaderMenu: () => import('~/components/Headers/HeaderMenu'),
    MobileHeader: () => import('~/components/Headers/MobileHeader'),
    Footer: () => import('~/components/Footer')
  },

  computed: {
    ...mapState('core', [
      'headerMenuShow',
      'kinds'
    ]),
    ...mapState('auth', [
      'user'
    ])
  },

  methods: {
    ...mapMutations({
      setUserUnreadChats: `auth/${AUTH_MUTATIONS.SET_USER_UNREAD_CHATS}`
    }),
    ...mapActions('core', ['fetchKinds'])
  },

  mounted() {
    setFirebaseToken(this.$api)
      .then(async () => {
        await this.$fire.auth.signInWithCustomToken(getFirebaseToken());

        const chatIds = Object.keys((await this.$fire.database.ref(`users/${this.user.id}`).get()).toJSON() || {});

        chatIds.map((chatId: string) => {
          this.$fire.database.ref(`chats/${chatId}/message`).on('value', (snapshot) => {
            const data = snapshot.val();

            if (data.creator !== String(this.user.id) && !data.checked) {
              this.setUserUnreadChats({
                [chatId]: true
              })
            } else {
              this.setUserUnreadChats({
                [chatId]: false
              })
            }
          })
        })
      })
  }
})
</script>
