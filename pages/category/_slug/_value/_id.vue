<template>
  <ProductPage v-else :product="product"/>
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
      }),


      async asyncData({ params, $api, store }) {
        const product = await $api.getProduct(params.id, 'preview,images,kind,subcategory,locality,morphs.gene,morphs.trait,morphs.trait.traitGroup,shop,age');

        store.commit(`seo/${SEO_MUTATIONS.SET_SEO_OPTION}`, product.seo);

        return {
          product
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
