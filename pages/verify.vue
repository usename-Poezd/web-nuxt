<template>
  <main class="container lg:my-14 my-7">
    <div v-if="success" class="flex flex-col items-center">
      <FontAwesomeIcon icon="check-circle" size="4x" class="text-green-500"/>
      <div class="text-lg text-green-500 font-bold">Вы успешно подтвердили почту</div>
    </div>
    <div v-else class="flex flex-col items-center">
      <FontAwesomeIcon icon="times" size="4x" class="text-red-500"/>
      <div class="text-lg text-red-500 font-bold">Не удалось подтвердить почту</div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapGetters, mapState} from 'vuex';
import {SEO_MUTATIONS} from "~/store/seo";

export default Vue.extend({

  data: () => ({
    success: false
  }),

  async asyncData({$api, query}) {
    try {
      const success = await $api.verify({
        type: query.type,
        token: query.token
      });

      return {
        success
      }
    } catch (e) {
      return {
        success: false
      }
    }
  },
})
</script>
