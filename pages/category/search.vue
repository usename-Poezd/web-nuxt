<template>
  <ProductLayout :products="products" :meta="meta" :sort="sort">
    <template #headerTitle>
      Поиск<br/>
      "{{$route.query.q}}"
    </template>

    <template #filter>
      <ProductFilter
        :morphs="meta.selectedMorphs"
        :subcategory="null"
        :minPrice="meta.minPrice"
        :maxPrice="meta.maxPrice"
      />
    </template>
  </ProductLayout>
</template>

<script lang="ts">
    import Vue from "vue";
    import qs from "qs";
    import {withPopper} from "~/utils";
    import {IProduct} from "~/types";
    import {MetaType} from "~/services";
    import ProductFilter from "~/components/Product/Filter"

    export default Vue.extend({

      watchQuery: true,

      data: () => ({
        products: [] as Array<IProduct>,
        meta: {} as MetaType,
        sort: ''
      }),

      methods: {
        withPopper
      },

      async asyncData({ query, $api, route }) {
        const {products, meta} = await $api.getProducts({
          include: 'preview,kind',
          query: {
            page: {
              size: 20,
              number: query.page
            },
            q: query.q,
            sort: query.sort,
            filter: {
              price: query.price,
              sex: query.sex,
              morphs: qs.parse(route.fullPath.replace(route.path, '').replace('?', '')).morphs,
              morph: {
                gene: query.gene,
                trait: query.trait
              }
            }
          }
        });

        return {
          products,
          meta,
          sort: query.sort
        }
      }
    });
</script>
