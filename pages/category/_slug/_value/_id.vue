<template>
  <ProductPage v-else :product="product" :kind="kind" :subcategory="subcategory" :products="products"/>
</template>

<script lang="ts">
    import Vue from "vue";
    import {IKind} from "~/types";

    export default Vue.extend({

      data: () => ({
        kind: {} as IKind,
        subcategory: {} as any,
        product: {} as any,
        products: [] as Array<any>
      }),


      async asyncData({ params, $api, store }) {
        const product = await $api.getProduct(params.id, 'preview,images,kind,subcategory,locality,morphs.gene,morphs.trait,morphs.trait.traitGroup,shop,age');
        const kind = await store.getters["core/activeKind"](params.slug);
        const subcategory = await kind.subcategories.find((s: any) => s.slug === params.value);
        const {products} = await $api.getProducts({
          include: 'preview,kind,subcategory',
          query: {
            sort: 'random',
            page: {
              size: 5
            },
            filter: {
              kind: kind.slug,
              subcategory: subcategory.slug,
              shop: product.shop.id
            }
          }
        });

        return {
          product,
          kind,
          subcategory,
          products
        }
      }
    });
</script>
