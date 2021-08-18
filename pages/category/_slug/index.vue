<template>
  <div class="container"  v-if="isTableView">
    <div class="md:py-8 py-4">
      <div class="flex md:flex-row flex-col md:items-center justify-between mb-8">
        <div class="flex items-center">
          <h1 class="text-3xl font-bold mr-1">
            {{kind.titleRus}}
          </h1>
        </div>
        <span class="link cursor-pointer text-sm" @click.prevent="() => {setTableView(false); $router.go(0)}">В новый дизайн</span>
      </div>
    </div>
    <MorphsTable :tableMorphs="tableMorphs" :kind="kind" :isModal="false"/>
  </div>
  <ProductLayout v-else :products="products" :meta="meta" :sort="sort" :kind="kind">
    <template #headerTitle>
      {{kind.titleRus}}
    </template>

    <template #headerFilter>
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
    </template>

    <template #filter>
      <ProductFilter
        :kind="kind"
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
    import {IKind, IProduct} from '~/types';
    import qs from "qs";
    import {withPopper} from "~/utils";
    import {RootState} from "~/store";
    import {mapMutations} from "vuex";
    import {SET_TABLE_CATEGORY_VIEW} from "~/store/core";
    import {MetaType} from "~/services";
    import {SEO_MUTATIONS} from "~/store/seo";

    export default Vue.extend({

      watchQuery: true,

      data: () => ({
        tableMorphs: [],
        isTableView: false,
        sortOptions: [{label: 'Сначала дешевле', value: 'price'}, {label: 'Сначала дороже', value: '-price'}],
        kind: {} as IKind,
        products: [] as Array<IProduct>,
        meta: {} as MetaType,
        sort: ''
      }),

      methods: {
        withPopper,
        ...mapMutations({
          setTableView: `core/${SET_TABLE_CATEGORY_VIEW}`
        }),
      },

      async asyncData({ params, query, $api, route, store }) {
        const kind = await $api.getKind(params.slug, {
          include: 'activeSubcategories',
        });

        const isTableView = (store.state as RootState).core.tableCategoryView && !(query.gene || query.trait || query.shop || qs.parse(route.fullPath.replace(route.path, '').replace('?', '')).morphs?.length)



        if (!isTableView) {
          const seoOption = kind.seo.kind;
          store.commit(`seo/${SEO_MUTATIONS.SET_SEO_OPTION}`, seoOption);

          const {products, meta} = await $api.getProducts({
            include: 'preview,kind,subcategory,shop',
            query: {
              fields: {
                products: 'name,sex,group,preview,kind,shop,subcategory,price,askPrice'
              },
              page: {
                size: 20,
                number: query.page
              },
              sort: query.sort,
              filter: {
                shop: query.shop,
                kind: params.slug,
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
            kind,
            products,
            meta,
            isTableView,
            sort: query.sort
          }
        } else {
          const tableMorphs = await $api.getKindTable(kind.id);
          const seoOption = kind.seo.morphs;
          store.commit(`seo/${SEO_MUTATIONS.SET_SEO_OPTION}`, seoOption);

          return {
            kind,
            isTableView,
            tableMorphs,
            sort: query.sort
          }
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
      },
    });
</script>
