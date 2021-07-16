<template>
  <div>
    <modals-container/>
    <Header v-if="!$device.isMobile"/>
    <HeaderMenu :class="!headerMenuShow ? 'hidden' : ''"/>
    <Nuxt :class="headerMenuShow ? 'hidden' : ''"/>
    <MobileHeader v-if="$device.isMobile"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapState} from 'vuex';

export default Vue.extend({
  computed: {
    ...mapState('core', [
      'headerMenuShow'
    ])
  },

  head: () => ({
    title: 'Чат'
  })
})
</script>
