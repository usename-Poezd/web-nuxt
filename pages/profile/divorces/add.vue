<template>
  <DivorceEdit/>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  middleware: ['auth'],
  layout: 'profile',
})
</script>
