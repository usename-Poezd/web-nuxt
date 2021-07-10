<template>
  <ProductLayout v-if="!isProduct" :products="products" :meta="meta" :sort="sort" :kind="kind">
    <template #headerTitle>
      {{subcategory.title}}{{$route.query.localities ? ', ' + subcategory.localities.find(i => i.id === $route.query.localities).title : ''}}
    </template>

    <template #headerFilter>
      <div v-if="subcategory.localities.length" class="flex flex-wrap items-center">
        <NuxtLink
          v-for="locality in subcategory.localities"
          v-if="!$route.query.localities || $route.query.localities !== locality.id"
          :to="{
            path: `/category/${kind.slug}/${subcategory.slug}`,
            query: {
              localities: locality.id
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
  <ProductPage v-else :product="product" :kind="kind" :products="products"/>
</template>

<script lang="ts">
    import Vue from "vue";
    import {IKind, IProduct, ISubcategory} from "~/types";
    import {MetaType} from "~/services";
    import {SEO_MUTATIONS} from "~/store/seo";

    export default Vue.extend({

      watchQuery: true,

      data: () => ({
        isProduct: true,
        kind: {} as IKind,
        subcategory: {} as ISubcategory,
        product: {} as IProduct,
        products: [] as Array<IProduct>,
        meta: {
          page: {}
        } as MetaType,
        sort: ''
      }),

      async asyncData({ params, $api, query, store }) {
        if (!Number(params.value)) {
          const kind = await $api.getKind(params.slug, {
            include: 'activeSubcategories,activeSubcategories.activeLocalities'
          });

          const subcategory = await (kind.activeSubcategories.find((s: any) => s.slug === params.value) as ISubcategory);
          subcategory.localities = subcategory.activeLocalities;

          const {products, meta} = await $api.getProducts({
            include: 'preview,kind,subcategory,shop',
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
            isProduct: false,
            kind,
            subcategory,
            products,
            meta,
            sort: query.sort
          }
        }

        const product = await $api.getProduct(params.value, 'preview,images,kind,subcategory,locality,morphs.gene,morphs.trait,morphs.trait.traitGroup,shop,age');
        const kind = await store.getters["core/activeKind"](params.slug)
        const {products} = await $api.getProducts({
          include: 'preview,kind,subcategory',
          query: {
            sort: 'random',
            page: {
              size: 5
            },
            filter: {
              exclude: product.id,
              kind: kind.slug,
              shop: product.shop.id
            }
          }
        });

        store.commit(`seo/${SEO_MUTATIONS.SET_SEO_OPTION}`, product.seo);

        return {
          product,
          kind,
          products,
          isProduct: true
        }
      },

      head() {
        if (this.isProduct) {
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
        } else {
          return {
            title: `${this.kind.titleRus} (${this.kind.titleEng}), ${this.subcategory.title} - Breeders Zone`,
            meta: [
              // @TODO: make seo for subcategories
            ]
          }
        }

      },
    });
</script>
