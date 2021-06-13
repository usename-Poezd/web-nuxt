<template>

</template>

<script lang="ts">
import Vue from 'vue'
import {mapMutations, mapState} from 'vuex';
import {AUTH_MUTATIONS} from "~/store/auth";
// @ts-ignore
import Verify from "~/components/Verify.vue";

export default Vue.extend({

  async mounted() {
    if (this.$route.query.verified === '0') {
      this.$modal.show(
        Verify,
        {
          userId: Number(this.$route.query.id)
        },
        {
          name: 'verify',
          clickToClose: false,
          adaptive: true
        });
    }

    await this.setPayload({access_token: this.access_token});
    await this.$router.push('/')
  },

  computed: {
    ...mapState('auth', ['access_token'])
  },

  methods: {
    ...mapMutations({
      setPayload: `auth/${AUTH_MUTATIONS.SET_PAYLOAD}`
    }),
  },

  async asyncData({store, query, redirect}) {
    if (query.token) {
      // @ts-ignore
      await store.commit(`auth/${AUTH_MUTATIONS.SET_PAYLOAD}`, {access_token: query.token});
      await store.dispatch('auth/me');
    }
  }
})
</script>
