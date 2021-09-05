<template>
  <DivorceEdit/>
</template>

<script lang="ts">
import Vue from 'vue'
import {IKind} from "~/types";

export default Vue.extend({
  middleware: ['auth'],
  layout: 'profile',

  async asyncData({store}) {
    if (!store.state.core.kinds.length || store.state.core.kinds.filter((i: IKind) => i.subcategories).length !== store.state.core.kinds.length) {
      await store.dispatch('core/fetchKinds', {
        include: 'subcategories,subcategories.localities',
        query: {
          fields: {
            kinds: 'active,slug,titleRus,subcategories'
          }
        }
      });
    }
  },

  head: () => ({
    title: 'Добавить разведение'
  }),
})
</script>
