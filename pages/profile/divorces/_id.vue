<template>
  <DivorceEdit :divorce="divorce" @change="val => divorce = val"/>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapActions, mapState} from "vuex";
import {IKind, IMorph} from "~/types";
import moment from "moment";
import {withPopper} from "~/utils";
import {diffArrays} from "diff";

export default Vue.extend({
  middleware: ['auth'],
  layout: 'profile',

  data() {
    return {
      divorce: {} as any
    }
  },

  async asyncData({$api, params, store}) {
    const divorce = await $api.getDivorce(params.id, 'male.gene,male.trait,male.trait.traitGroup,female.gene,female.trait,female.trait.traitGroup,kind,subcategory,exitPhotos,sexPhotos,masonryPhotos');

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

    return {
      divorce
    }
  },

  head() {
    return {
      // @ts-ignore
      title: this.divorce.title
    }
  },
})
</script>
