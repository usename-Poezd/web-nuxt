<template>
  <ProductLayout :products="products" :meta="meta" :sort="sort">
    <template #headerTitle>
      {{subcategory.title}}
    </template>

    <template #headerFilter>
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
    </template>

    <template #filter>
      <ProductFilter
        :kind="kind"
        :subcategory="subcategory"
        :morphs="meta.selectedMorphs"
        :minPrice="meta.minPrice"
        :maxPrice="meta.maxPrice"
      />
    </template>
  </ProductLayout>
</template>

<script lang="ts">
    import Vue from "vue";
    import {IKind} from "~/types";
    import {withPopper} from "~/utils";

    export default Vue.extend({

      watchQuery: true,

      data: () => ({
        kind: {} as IKind,
        subcategory: {} as any,
        products: [] as Array<any>,
        meta: {} as any,
        sort: ''
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
            sort: query.sort,
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
          meta,
          sort: query.sort
        }
      }
    });
</script>
