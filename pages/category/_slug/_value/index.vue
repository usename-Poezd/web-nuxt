<template>
  <div class="container">
    <div class="py-8">
      <div class="flex items-center mb-8">
        <h1 class="text-3xl font-bold mr-1">
          {{subcategory.title}}
        </h1>
        <div class="text-sm text-gray-600">{{products.length}}</div>
      </div>
      <div v-if="subcategory.localities.length" class="flex flex-wrap items-center mb-4">
        <NuxtLink
          v-for="locality in subcategory.localities"
          :to="`/category/${kind.slug}/${subcategory.slug}/?localities=${$route.query.localities ? `${$route.query.localities},` : ''}${locality.id}`"
          :key="'locality-header-page-' + locality.title"
          class="rounded-full bg-gray-100 transition hover:bg-gray-200 text-black mr-2 mb-2 py-1 px-2 text-sm cursor-pointer"
        >
          {{locality.title}}
        </NuxtLink>
      </div>
    </div>
    <div class="flex items-start">
      <div class="w-2/12">
        <div class="mt-2 mr-2">
          <div class="mb-5">
            <div class="font-bold mb-3">Категории:</div>
            <div class="mb-1">
              <NuxtLink :to="'/category/' + kind.slug" class="flex items-center transition duration-200 hover:text-green-600">
                <FontAwesomeIcon icon="chevron-left" class="mr-1"/>
                <span>{{kind.titleRus}}</span>
              </NuxtLink>
            </div>
            <div class="flex flex-col items-start flex-start pl-2">
              <NuxtLink :to="'/category/' + kind.slug + '/' + subcategory.slug" class="block rounded p-1 bg-green-100 transition hover:text-green-600 mb-1">{{subcategory.title}}</NuxtLink>
            </div>
          </div>
        </div>
      </div>


      <div class="w-10/12 flex flex-wrap">
        <div v-for="product in products" class="flex flex-col lg:w-3/12 md:w-4/12 sm:w-6/12 w-full px-2 mb-2">
          <div class="flex flex-col shadow rounded-xl bg-white p-2 flex-1">
            <NuxtLink :to="'/category/' + kind.slug + '/' + product.id"  class="relative mb-2">
              <div class="absolute bg-white shadow rounded top-2 right-2 p-1">
                <div v-if="!product.group || (product.group.male === 0 && product.group.female)">
                  <FontAwesomeIcon v-if="product.sex === null" icon="genderless" class="text-xl"/>
                  <FontAwesomeIcon v-if="!product.sex && product.sex !== null" icon="venus" class="text-xl" style="color: #c11f80;"/>
                  <FontAwesomeIcon v-if="product.sex" icon="mars" class="text-xl" style="color: #3f81e5;"/>
                </div>
                <div v-else class="flex">
                  <div>
                    <span class="text-sm">{{product.group.male}}</span>
                    <FontAwesomeIcon icon="mars" class="text-xl" style="color: #3f81e5;"/>
                  </div>
                  <span class="text-sm">.</span>
                  <div>
                    <span class="text-sm">{{product.group.female}}</span>
                    <FontAwesomeIcon icon="venus" class="text-xl" style="color: #c11f80;"/>
                  </div>
                </div>
              </div>
              <img :data-src="product.preview.imgSrc" alt="" class="img-fluid rounded lazyload">
            </NuxtLink>
            <div class="flex flex-col flex-1">
              <div>
                <span class="text-red-500 font-bold text-lg">55 000 ₽</span>
              </div>
              <NuxtLink
                :to="'/category/' + kind.slug + '/' + product.id"
                class="block font-semibold text-sm mb-2 transition duration-200 hover:text-green-600"
              >
                {{product.name}}
              </NuxtLink>

              <div class="star mb-3">
                <div class="star-outline"></div>
                <div class="star-filled" style="width: 75%"></div>
              </div>

              <div class="mt-auto">
                <button

                  class="text-sm text-white font-bold inline-block rounded-lg py-2 px-3 cursor-pointer duration-200 transition bg-green-600 hover:bg-green-700"
                >
                  Написать продавцу
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from "vue";

    export default Vue.extend({

      data: () => ({
        kind: {} as any,
        subcategory: {} as any,
        products: [] as Array<any>
      }),

      async asyncData({ params, $api, query }) {
        const kind = await $api.getKind(params.slug, {
          include: 'activeSubcategories,activeSubcategories.activeLocalities'
        });
        const subcategory = await kind.activeSubcategories.find((s: any) => s.slug === params.value);
        subcategory.localities = await subcategory.activeLocalities;
        const products = await $api.getProducts({
          include: 'preview',
          query: {
            filter: {
              kind: params.slug,
              subcategory: params.value,
              locality: query.localities
            }
          }
        });

        return {
          kind,
          subcategory,
          products
        }
      }
    });
</script>
