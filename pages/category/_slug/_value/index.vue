<template>
  <div class="container">
    <div class="md:py-8 py-4">
      <div class="flex items-center mb-8">
        <h1 class="text-3xl font-bold mr-1">
          {{subcategory.title}}
        </h1>
        <div class="text-sm text-gray-600">{{meta.page.total}}</div>
      </div>
      <div v-if="subcategory.localities.length" class="flex flex-wrap items-center">
        <NuxtLink
          v-for="locality in subcategory.localities"
          :to="{
            path: `/category/${kind.slug}/${subcategory.slug}`,
            query: {
              localities: `${$route.query.localities ? `${$route.query.localities},` : ''}${locality.id}`
            }
          }"
          :key="'locality-header-page-' + locality.title"
          class="rounded-full bg-gray-100 transition hover:bg-gray-200 text-black mr-2 mb-2 py-1 px-2 text-sm cursor-pointer"
        >
          {{locality.title}}
        </NuxtLink>
      </div>
    </div>
    <div class="flex flex-wrap items-start">
      <ProductFilter
        :kind="kind"
        :subcategory="subcategory"
        :morphs="meta.selectedMorphs"
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
    import {IKind} from "~/types";

    export default Vue.extend({

      watchQuery: true,

      data: () => ({
        kind: {} as IKind,
        subcategory: {} as any,
        products: [] as Array<any>
      }),

      async asyncData({ params, $api, query }) {
        const kind = await $api.getKind(params.slug, {
          include: 'activeSubcategories,activeSubcategories.activeLocalities'
        });

        const subcategory = await kind.activeSubcategories.find((s: any) => s.slug === params.value);
        subcategory.localities = await subcategory.activeLocalities;

        const {products, meta} = await $api.getProducts({
          include: 'preview,kind',
          query: {
            page: {
              size: 20,
              number: query.page
            },
            filter: {
              kind: params.slug,
              subcategory: params.value,
              locality: query.localities,
              price: query.price,
              sex: query.sex
            }
          }
        });

        return {
          kind,
          subcategory,
          products,
          meta
        }
      }
    });
</script>
