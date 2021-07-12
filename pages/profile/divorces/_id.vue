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

  async asyncData({$api, params}) {
    const divorce = await $api.getDivorce(params.id, 'male.gene,male.trait,male.trait.traitGroup,female.gene,female.trait,female.trait.traitGroup,kind,subcategory,exitPhotos,sexPhotos,masonryPhotos');

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
