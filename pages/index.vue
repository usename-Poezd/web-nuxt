<template>
  <main>
    <div class="bg-gray-200 py-8">
      <div class="container flex items-center justify-between">
        <div class="w-8/12">
          <h1 class="md:text-3xl text-xl font-bold mb-3">Breeders Zone - это маркетплейс для продажи животных</h1>
          <p class="md:text-base text-sm font-semibold mb-5">Зарегестрируйтесь и найдите свое животное за пару кликов</p>
          <NuxtLink to="/auth/registration" class="p-3 transition hover:bg-green-700 bg-green-600 rounded-lg text-white outline-none appearance-none font-semibold">
            Зарегестрироваться
          </NuxtLink>
        </div>
        <div class="md:w-56 w-24 md:h-56 h-24 rounded-full bg-white overflow-hidden relative">
          <img src="https://breeders-zone.s3.us-east-2.amazonaws.com/media/cache/b0/ce/11.jpg" alt="" class="img-fluid rounded-full absolute bottom-0">
        </div>
      </div>
    </div>
    <div class="container mt-4">
      <div>
        <div class="flex items-center justify-between mb-4">
          <h2 class="font-bold text-2xl">Категории:</h2>
          <button @click.prevent="toggleAllKindsShow" class="outline-none appearance-none text-gray-300 font-semibold text-md md:pr-3">{{allKindsShow ? 'Все' : 'Активные'}}</button>
        </div>
        <div class="flex flex-wrap">
          <NuxtLink
            v-for="kind in (allKindsShow ? kinds : activeKinds)"
            :key="'kind-' + kind.id"
            :to="'/category/' + kind.slug"
            class="lg:w-3/12 md:w-4/12 sm:w-6/12 w-full mb-4 sm:px-3 px-0"
          >
            <div class="flex flex-col rounded bg-gray-100 transition hover:text-green-600 py-3 xl:px-0 px-3 h-full">
              <div class="rounded">
                <img
                  :data-src="kind.logoSquare"
                  :alt="kind.titleRus"
                  class="rounded mx-auto lazyload"
                >
              </div>
              <div class="text-center font-semibold mt-auto pt-2">
                {{kind.titleRus}}
              </div>
            </div>

          </NuxtLink>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapGetters, mapState} from 'vuex';
import {SEO_MUTATIONS} from "~/store/seo";

export default Vue.extend({
  data: () => ({
    allKindsShow: false,
  }),

  async asyncData({$api, store}) {
    const seoOption = await $api.getSeoOption('default');
    store.commit(`seo/${SEO_MUTATIONS.SET_SEO_OPTION}`, seoOption)
  },

  head() {
    const {option} = this.$store.state.seo;
    return {
      title: option.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: option.description
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: option.keywords
        }
      ]
    }
  },

  computed: {
    ...mapState('core', [
      'kinds'
    ]),
    ...mapGetters('core', [
      'activeKinds'
    ])
  },

  methods: {
    toggleAllKindsShow() {
      this.allKindsShow = !this.allKindsShow;
    }
  }
})
</script>
