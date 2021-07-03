<template>
  <div>
    <nav class="text-black font-bold mb-4 text-xs" aria-label="Breadcrumb">
      <ol class="list-none p-0 inline-flex">
        <li class="flex items-center">
          <NuxtLink to="/profile">Профиль</NuxtLink>
          <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
        </li>
        <li>
          <span class="text-gray-500" aria-current="page">Мои разведения</span>
        </li>
      </ol>
    </nav>

    <div class="flex flex-wrap items-center justify-end mb-4">
      <div class="md:w-3/12 w-9/12 md:pl-4 pl-0">
        <VueSelect
          class="forms-select"
          @input="(val) => $router.push({
                path: $route.path,
                query: {
                  ...$route.query,
                  kind: val ? val.value : ''
                }
              })"
          :filterable="false"
          :searchable="false"
          placeholder="Сортировать по..."
          :options="kinds.map(k => ({label: k.titleRus, value: k.slug}))"
          :value="kinds.map(k => ({label: k.titleRus, value: k.slug})).find((item) => item.value === kind)"
          :calculate-position="withPopper"
        />
      </div>
      <div class="md:w-2/12 w-3/12 md:pl-4 pl-2">
        <NuxtLink
          to="/profile/divorces/add"
          class="w-full text-sm text-center text-white font-bold inline-block rounded-lg py-2 px-3 cursor-pointer duration-200 transition bg-green-600 hover:bg-green-700"
        >
          <span v-if="!$device.isMobile">Добавить разведение</span>
          <FontAwesomeIcon v-else icon="plus"/>
        </NuxtLink>
      </div>
    </div>
    <DivorceShop
      v-for="divorce in divorces"
      :key="`divorce-${divorce.id}`"
      :divorce="divorce"
      @delete="(id) => {
        const idx = divorces.findIndex(p => p.id === id)
        divorces.splice(idx, 1)
      }"
    />

    <div class="pt-4">
      <Pagination :currentPage="meta.page.currentPage" :lastPage="meta.page.lastPage"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapState} from "vuex";
import {withPopper} from "~/utils";

export default Vue.extend({
  middleware: ['auth'],
  layout: 'profile',

  watchQuery: ['kind', 'page', 'sort'],

  data: () => ({
    q: ''
  }),

  computed: {
    ...mapState('core', ['kinds'])
  },

  methods: {
    withPopper
  },

  async asyncData({store, query, $api}) {
    const {divorces, meta} = await $api.getDivorces({
      include: 'male.gene,male.trait,male.trait.traitGroup,female.gene,female.trait,female.trait.traitGroup,kind,subcategory,exitPhotos',
      query: {
        page: {
          size: 20,
          number: query.page
        },
        sort: '-cb',
        filter: {
          shop: store.state.auth.user.companyName,
          kind: query.kind
        }
      }
    });

    return {
      divorces,
      meta,
      kind: query.kind
    }
  }
})
</script>
