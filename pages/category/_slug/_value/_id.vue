<template>
  <ProductPage v-else :product="product" :kind="kind" :subcategory="subcategory" :products="products"/>
</template>

<script lang="ts">
    import Vue from "vue";
    import {IKind, IProduct, ISubcategory} from "~/types";
    import {SEO_MUTATIONS} from "~/store/seo";

    export default Vue.extend({

      data: () => ({
        kind: {} as IKind,
        subcategory: {} as ISubcategory,
        product: {} as IProduct,
        products: [] as Array<IProduct>
      }),


      async asyncData({ params, $api, store }) {
        const product = await $api.getProduct(params.id, 'preview,images,kind,subcategory,locality,morphs.gene,morphs.trait,morphs.trait.traitGroup,shop,age');
        const kind = await store.getters["core/activeKind"](params.slug);
        const subcategory = await kind.subcategories.find((s: any) => s.slug === params.value);
        const {products} = await $api.getProducts({
          include: 'preview,kind,subcategory,shop',
          query: {
            sort: 'random',
            page: {
              size: 5
            },
            filter: {
              exclude: product.id,
              kind: kind.slug,
              subcategory: subcategory.slug,
              shop: product.shop.id
            }
          }
        });

        store.commit(`seo/${SEO_MUTATIONS.SET_SEO_OPTION}`, product.seo);

        return {
          product,
          kind,
          subcategory,
          products
        }
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
      }
    });
</script>
