<template>
  <Chat/>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  layout: 'chat',
  middleware: ['auth']
})
</script>
