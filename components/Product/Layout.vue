<template>
  <div class="container">
    <div class="md:py-8 py-4">
      <div class="flex md:flex-row flex-col md:items-center justify-between mb-8">
        <div class="flex items-center">
          <h1 class="text-3xl font-bold mr-1">
            <slot name="headerTitle"/>
          </h1>
          <div class="text-sm text-gray-600">{{meta.page.total}}</div>
        </div>
        <span v-if="$route.name === 'category-slug' && $route.fullPath === $route.path" class="link cursor-pointer text-sm" @click.prevent="() => {setTableView(true); $router.go(0)}">В старый дизайн</span>
      </div>
      <slot name="headerFilter"/>
    </div>
    <div class="flex flex-wrap items-start">
      <slot name="filter" v-if="!$device.isMobile"/>
      <modal
        v-else
        classes="full-modal"
        name="filter"
        :scrollable="true"
        width="100%"
        height="100%"
      >
        <div class="py-3 border-b relative flex justify-center">
          <h3 class="font-bold">Фильтры</h3>
          <div class="absolute top-3 right-2.5 cursor-pointer">
            <FontAwesomeIcon icon="times" size="lg" @click="$modal.hide('filter')"/>
          </div>
        </div>
        <div class="container">
          <slot name="filter"/>
        </div>
      </modal>

      <div class="md:w-10/12 w-full">
        <div class="flex justify-between mb-3 md:px-2">
          <button
            v-if="!$device.isMobile && kind"
            @click.prevent="openMorphsTable"
            class="shadow text-sm font-bold inline-block rounded-lg p-2 cursor-pointer duration-200 transition bg-white hover:bg-gray-100"
          >
            Открыть таблицу морф
          </button>
          <div class="md:mr-0 mr-2 md:w-3/12 w-full">
            <VueSelect
              @input="(val) => $router.push({
                path: $route.path,
                query: {
                  ...$route.query,
                  page: 1,
                  sort: val ? val.value : ''
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
            v-if="$device.isMobile"
            @click="$modal.show('filter')"
            class="shadow text-sm font-bold inline-block rounded-lg p-2 cursor-pointer duration-200 transition bg-white hover:bg-gray-100"
          >
            <FontAwesomeIcon icon="sliders-h" size="lg"/>
          </button>
        </div>
        <div v-if="$device.isMobile && kind" class="flex justify-between mb-3 md:px-2">
          <button
            @click.prevent="openMorphsTable"
            class="w-full shadow text-sm font-bold inline-block rounded-lg p-2 cursor-pointer duration-200 transition bg-white hover:bg-gray-100"
          >
            Открыть таблицу морф
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
      </div>
      <div class="md:w-10/12 w-full ml-auto pt-3">
        <Pagination :currentPage="meta.page.currentPage" :lastPage="meta.page.lastPage"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue';
  import {withPopper} from "~/utils";
  import Table from "~/components/Morphs/Table.vue";
import {IKind, IProduct} from "~/types";
  import {mapMutations} from "vuex";
  import {SET_TABLE_CATEGORY_VIEW} from "~/store/core";
import {MetaType} from "~/services";

  export default Vue.extend({
    data: () => ({
      sortOptions: [{label: 'Сначала дешевле', value: 'price'}, {label: 'Сначала дороже', value: '-price'}],
    }),

    methods: {
      ...mapMutations({
        setTableView: `core/${SET_TABLE_CATEGORY_VIEW}`
      }),
      withPopper,

      openMorphsTable() {
        this.$router
        this.$modal.show(Table, {
          kind: this.kind
        }, {
          name: 'morphs-table',
          adaptive: true,
          class: 'table-modal',
          height: 'auto',
          scrollable: true
        })
      }
    },

    props: {
      products: Array as PropType<Array<IProduct>>,
      meta: Object as PropType<MetaType>,
      kind: Object as PropType<IKind>,
      sort: String
    }
  });
</script>
