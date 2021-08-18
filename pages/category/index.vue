<template>
  <HeaderMenu :isCategories="true"/>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  async asyncData({store}) {
    await store.dispatch('core/fetchKinds', {
      query: {
        fields: {
          kinds: 'active,slug,titleRus,logoSquare'
        }
      }
    });
  }
});
</script>
