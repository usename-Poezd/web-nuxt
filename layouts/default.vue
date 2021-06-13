<template>
  <div :style="$device.isMobile && 'padding-bottom: 56px;'">
    <modals-container/>
    <Header/>
    <HeaderMenu :class="!headerMenuShow ? 'hidden' : ''"/>
    <Nuxt :class="headerMenuShow ? 'hidden' : ''"/>
    <MobileHeader v-if="$device.isMobile"/>
    <Footer/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapGetters} from 'vuex';

export default Vue.extend({
  computed: {
    ...mapGetters('core', [
      'headerMenuShow'
    ])
  },
})
</script>
