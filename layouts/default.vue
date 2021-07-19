<template>
  <div :style="!$device.isDesktop && 'padding-bottom: 56px;'">
    <modals-container/>
    <Header/>
    <HeaderMenu :class="!headerMenuShow ? 'hidden' : ''"/>
    <Nuxt :class="headerMenuShow ? 'hidden' : ''"/>
    <MobileHeader v-if="!$device.isDesktop"/>
    <Footer/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapMutations, mapState} from 'vuex';
import {getFirebaseToken, setFirebaseToken} from "~/utils";
import {AUTH_MUTATIONS} from "~/store/auth";

export default Vue.extend({
  computed: {
    ...mapState('core', [
      'headerMenuShow'
    ]),
    ...mapState('auth', [
      'user'
    ])
  },

  methods: {
    ...mapMutations({
      setUserUnreadChats: `auth/${AUTH_MUTATIONS.SET_USER_UNREAD_CHATS}`
    })
  },

  mounted() {
    setFirebaseToken(this.$api)
      .then(async () => {
        await this.$fire.auth.signInWithCustomToken(getFirebaseToken());

        const chatIds = Object.keys((await this.$fire.database.ref(`users/${this.user.id}`).get()).toJSON() as object);

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
