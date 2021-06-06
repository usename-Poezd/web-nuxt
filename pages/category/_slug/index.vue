<template>
  <div class="container">
    <div class="md:py-8 py-4">
      <div class="flex items-center mb-8">
        <h1 class="text-3xl font-bold mr-1">
          {{kind.titleRus}}
        </h1>
        <div class="text-sm text-gray-600">{{meta.page.total}}</div>
      </div>
      <div v-if="kind.activeSubcategories.length" class="flex flex-wrap items-center">
        <NuxtLink
          :to="'/category/' + kind.slug + '/' + subcategory.slug"
          v-for="subcategory in kind.activeSubcategories"
          :key="'subcategory-header-page-' + subcategory.id"
          class="rounded-full bg-gray-100 transition hover:bg-gray-200 text-black mr-2 mb-2 py-1 px-2 text-sm cursor-pointer"
        >
          {{subcategory.title}}
        </NuxtLink>
      </div>
    </div>
    <div class="flex flex-wrap items-start">
      <ProductFilter
        :kind="kind"
        :morphs="meta.selectedMorphs"
        :subcategory="null"
        :minPrice="meta.minPrice"
        :maxPrice="meta.maxPrice"
      />

      <div class="md:w-10/12 w-full flex flex-wrap">
        <ProductCard
          v-for="product in products"
          :key="'product-' + product.id"
          :product="product"
        />
      </div>
      <div class="md:w-10/12 w-full ml-auto pt-3">
        <Pagination :currentPage="meta.currentPage" :lastPage="meta.lastPage"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import {IKind} from '~/types';
    import qs from "qs";

    export default Vue.extend({

      watchQuery: true,

      data: () => ({
        kind: {} as IKind,
        products: [] as Array<any>
      }),

      async asyncData({ params, query, $api, route }) {
        const kind = await $api.getKind(params.slug, {
          include: 'activeSubcategories',
        });

        const {products, meta} = await $api.getProducts({
          include: 'preview,kind',
          query: {
            page: {
              size: 20,
              number: query.page
            },
            filter: {
              kind: params.slug,
              price: query.price,
              sex: query.sex,
              morphs: qs.parse(route.fullPath.replace(route.path, '').replace('?', '')).morphs
            }
          }
        });

        return {
          kind,
          products,
          meta
        }
      }
    });
</script>
