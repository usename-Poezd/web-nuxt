<template>
  <main class="container">
    <div class="md:py-8 py-4">
      <nav class="text-black font-bold mb-4 text-xs" aria-label="Breadcrumb">
        <ol class="list-none p-0 inline-flex">
          <li class="flex items-center">
            <NuxtLink to="/">Главная</NuxtLink>
            <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
          </li>
          <li class="flex items-center">
            <NuxtLink :to="`/shops/${$route.params.shop}`">{{ $route.params.shop }}</NuxtLink>
            <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
          </li>
          <li>
            <span class="text-gray-500" aria-current="page">Товары {{$route.params.shop}}</span>
          </li>
        </ol>
      </nav>

      <div class="flex md:flex-row flex-col md:items-center justify-between mb-8">
        <div class="flex items-center">
          <h1 class="text-3xl font-bold mr-1">Товары {{$route.params.shop}}</h1>
          <div class="text-sm text-gray-600">{{meta.page.total}}</div>
        </div>
      </div>
      <slot name="headerFilter"/>
    </div>
    <div class="flex justify-end mb-3 md:px-2">
    <div class="md:mr-0 mr-2 md:w-3/12 w-full">
      <VueSelect
        @input="(val) => $router.push({
                path: $route.path,
                query: {
                  ...$route.query,
                  sort: val ? val.value : '',
                  page: 1
                }
              })"
        class="forms-select"
        :filterable="false"
        :searchable="false"
        placeholder="Сортировать по..."
        :options="sortOptions"
        :value="sortOptions.find((item) => item.value === sort)"
        :calculate-position="withPopper"
      />
    </div>
    <button
      v-if="!$device.isDesktop"
      @click="$modal.show('filter')"
      class="shadow text-sm font-bold inline-block rounded-lg p-2 cursor-pointer duration-200 transition bg-white hover:bg-gray-100"
    >
      <FontAwesomeIcon icon="sliders-h" size="lg"/>
    </button>
  </div>
    <div class="flex flex-wrap">
      <div v-if="!products.length" class="flex flex-col items-center my-20 w-full">
        <FontAwesomeIcon icon="times" size="5x" class="text-red-500"/>
        <p class="font-bold text-xl">Тавары не найдены</p>
      </div>
      <ProductCard
        class="lg:w-3/12 md:w-4/12 sm:w-6/12 w-full"
        v-for="product in products"
        :key="'product-' + product.id"
        :product="product"
      />
    </div>
    <div class="w-full ml-auto pt-3">
      <Pagination :currentPage="meta.page.currentPage" :lastPage="meta.page.lastPage"/>
    </div>
  </main>
</template>

<script lang="ts">
    import Vue from "vue";
    import {withPopper} from "~/utils";
    import {IProduct} from "~/types";
    import {MetaType} from "~/services";

    export default Vue.extend({

      watchQuery: true,

      data: () => ({
        products: [] as Array<IProduct>,
        sortOptions: [{label: 'Сначала дешевле', value: 'price'}, {label: 'Сначала дороже', value: '-price'}],
        meta: {
          page: {}
        } as MetaType,
        sort: ''
      }),

      methods: {
        withPopper
      },

      async asyncData({ params, $api, query }) {
        const {products, meta} = await $api.getProducts({
          include: 'preview,kind,subcategory',
          query: {
            page: {
              size: 20,
              number: query.page
            },
            sort: query.sort,
            filter: {
              shop: params.shop,
              price: query.price,
              sex: query.sex
            }
          }
        });

        return {
          products,
          meta,
          sort: query.sort
        }
      },

      head() {
        return {
          title: 'Все товары ' + this.$route.params.shop
        }
      }
    });
</script>
