<template>
  <div>
    <nav class="text-black font-bold mb-4 text-xs" aria-label="Breadcrumb">
      <ol class="list-none p-0 inline-flex">
        <li class="flex items-center">
          <NuxtLink to="/profile">Профиль</NuxtLink>
          <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
        </li>
        <li>
          <span class="text-gray-500" aria-current="page">Мои товары</span>
        </li>
      </ol>
    </nav>

    <div class="flex flex-wrap items-center justify-between mb-4">
      <div class="md:w-7/12 w-full md:mb-0 mb-2 flex items-center rounded-lg bg-white shadow">
        <input
          v-model="q"
          @keydown.enter="$router.push({
                path: $route.path,
                query: {
                  ...$route.query,
                  q
                }
              })"
          type="text"
          placeholder="Поиск..."
          class="block w-full p-2 bg-white rounded outline-none appearance-none"
        >
        <button @click.prevent="$router.push({
                path: $route.path,
                query: {
                  ...$route.query,
                  q
                }
              })" class="outline-none appearance-none text-gray-500 relative top-0.5 pr-4">
          <FontAwesomeIcon class="text-xl" icon="search"/>
        </button>
      </div>
      <div class="md:w-3/12 w-9/12 md:pl-4 pl-0">
        <VueSelect
          class="rounded"
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
          to="/profile/products/add"
          class="w-full text-sm text-center text-white font-bold inline-block rounded-lg py-2 px-3 cursor-pointer duration-200 transition bg-green-600 hover:bg-green-700"
        >
          <span v-if="!$device.isMobile">Добавить товар</span>
          <FontAwesomeIcon v-else icon="plus"/>
        </NuxtLink>
      </div>
    </div>
    <ProductShop v-for="product in products" :key="`product-${product.id}`"  :product="product"/>

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
    const {products, meta} = await $api.getProducts({
      include: 'preview,kind,subcategory,morphs.gene,morphs.trait',
      query: {
        page: {
          size: 20,
          number: query.page
        },
        sort: query.sort,
        filter: {
          kind: query.kind,
          shop: store.state.auth.user.companyName
        }
      }
    });

    return {
      products,
      meta,
      kind: query.kind
    }
  }
})
</script>
