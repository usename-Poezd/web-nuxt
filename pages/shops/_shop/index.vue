<template>
  <main class="container md:mt-7 mt-4">
    <nav class="text-black font-bold mb-4 text-xs" aria-label="Breadcrumb">
      <ol class="list-none p-0 inline-flex">
        <li class="flex items-center">
          <NuxtLink to="/">Главная</NuxtLink>
          <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
        </li>
        <li>
          <span class="text-gray-500" aria-current="page">{{shop.companyName}}</span>
        </li>
      </ol>
    </nav>

    <div class="flex lg:flex-nowrap flex-wrap">
      <div class="xl:w-2/12 lg:w-3/12 w-full lg:mr-4 lg:mb-0 mb-4">
        <div class="mb-4 p-4 shadow rounded-lg">
          <img v-if="shop.logoImg" :src="shop.logoImg" :alt="shop.companyName" class="mx-auto">
          <div v-else class="md:w-24 w-22 md:h-24 h-22 shadow-md flex relative items-center justify-center rounded-full overflow-hidden bg-green-400 mx-auto">
            <span class="md:text-3xl text-xl font-bold text-white m-auto">{{shop.companyName[0]}}</span>
          </div>

        </div>

        <a v-if="shop.website" target="_blank" :href="shop.website" class="p-4 block shadow rounded-lg mb-4 link text-center font-semibold">
          {{shop.website}}
        </a>

        <div
          v-if="
            shop.vk ||
            shop.instagram ||
            shop.facebook ||
            shop.youtube
          "
          class="p-4 shadow rounded-lg flex"
        >
          <a v-if="shop.vk" target="_blank" :href="shop.vk" class="p-2 transition duration-150 text-green-600 hover:text-green-700 mr-3">
            <FontAwesomeIcon :icon="['fab', 'vk']" size="lg"/>
          </a>
          <a v-if="shop.instagram" target="_blank" :href="shop.instagram" class="p-2 transition duration-150 text-green-600 hover:text-green-700 mr-3">
            <FontAwesomeIcon :icon="['fab', 'instagram']" size="lg"/>
          </a>
          <a v-if="shop.facebook" target="_blank" :href="shop.facebook" class="p-2 transition duration-150 text-green-600 hover:text-green-700 mr-3">
            <FontAwesomeIcon :icon="['fab', 'facebook']" size="lg"/>
          </a>
          <a v-if="shop.youtube" target="_blank" :href="shop.youtube" class="p-2 transition duration-150 text-green-600 hover:text-green-700">
            <FontAwesomeIcon :icon="['fab', 'youtube']" size="lg"/>
          </a>
        </div>
      </div>

      <div class="xl:w-10/12 lg:w-9/12 w-full">
        <div class="shadow p-4 rounded-lg mb-7">
          <div class="mb-7">
            <h1 class="text-2xl font-bold leading-6">{{ shop.companyName }}</h1>
            <span class="text-gray-800 ">{{ shop.owner }}</span>
          </div>
          <div class="flex md:flex-row flex-col">
            <div class="flex md:mr-4 md:pr-4 md:border-r">
              <div class="font-semibold mr-4">
                Доставка
              </div>
              <ul>
                <li class="flex">
                  <FontAwesomeIcon icon="car" size="lg" class="mr-2"/>
                  <span>Локальная</span>
                </li>
                <li class="flex">
                  <FontAwesomeIcon icon="truck" size="lg" class="mr-2"/>
                  <span>Региональная</span>
                </li>
                <li class="flex">
                  <FontAwesomeIcon icon="ship" size="lg" class="mr-2"/>
                  <span>Международная</span>
                </li>
              </ul>
            </div>
            <div class="flex items-start">
              <div class="font-semibold mr-4">
                Локация
              </div>
              <div class="relative">
                <span>{{shop.location}}</span>
                <CountryFlag :country="shop.country.iso31663" class="border absolute -top-2 -right-12"/>
              </div>
            </div>
          </div>
        </div>

        <div v-if="shop.kinds" class="mb-7">
          <h2 class="text-xl font-bold mb-2 pl-4">Категории</h2>

          <div
            v-if="shop.kinds.length >= 4"
            v-swiper:mySwiper="{
             loop: true,
             loopedSlides: $device.isDesktop ? 3 : 2,
             centeredSlides: true,
             slideToClickedSlide: true,
             slidesPerView: $device.isDesktop ? 3 : 2,
             slidesPerGroup: 1,
             spaceBetween: 10,
             grabCursor: true,
             navigation: {
              nextEl: '.swiper-next',
              prevEl: '.swiper-prev'
             }
            }"
          >
            <div class="swiper-wrapper">
              <NuxtLink
                v-for="kind in shop.kinds"
                :to="`/category/${kind.slug}?shop=${shop.companyName}`"
                :key="`shop-kind-${kind.id}`"
                class="swiper-slide md:px-3 px-0"
              >
                <div class="flex flex-col rounded bg-gray-100 transition hover:text-green-600 py-3 xl:px-0 px-3">
                  <div class="rounded">
                    <img
                      :data-src="kind.logoSquare"
                      :alt="kind.titleRus"
                      class="rounded mx-auto lazyload"
                    >
                  </div>
                  <div class="text-center font-semibold mt-auto pt-2">
                    {{kind.titleRus}}
                  </div>
                </div>
              </NuxtLink>
            </div>
            <div class="swiper-prev lg:block hidden cursor-pointer absolute z-30 top-1/2 left-0 transform -translate-y-1/2 rounded-full appearance-none focus:outline-none bg-white p-3 shadow">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </div>
            <div class="swiper-next lg:block hidden cursor-pointer absolute z-30 top-1/2 right-0 transform -translate-y-1/2 rounded-full appearance-none focus:outline-none bg-white p-3 shadow">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </div>
          <div v-else class="flex">
            <NuxtLink
              v-for="kind in shop.kinds"
              :to="`/category/${kind.slug}?shop=${shop.companyName}`"
              :key="`shop-kind-${kind.id}`"
              class="lg:w-4/12 sm:w-6/12 w-full mb-4 sm:px-3 px-0"
            >
              <div class="flex flex-col rounded bg-gray-100 transition hover:text-green-600 py-3 xl:px-0 px-3 h-full">
                <div class="rounded">
                  <img
                    :data-src="kind.logoSquare"
                    :alt="kind.titleRus"
                    class="rounded mx-auto lazyload"
                  >
                </div>
                <div class="text-center font-semibold mt-auto pt-2">
                  {{kind.titleRus}}
                </div>
              </div>

            </NuxtLink>
          </div>
        </div>

        <div v-if="products.length" class="mb-7">
          <h2 class="text-xl font-bold mb-2 pl-4">Товары</h2>

          <div class="flex md:overflow-auto overflow-y-scroll">
            <ProductCard
              class="md:w-1/5 w-48 md:flex-shrink flex-shrink-0 md:mr-0 mr-4"
              v-for="product in products"
              :key="'product-' + product.id"
              :product="product"
              :truncateName="true"
            />
          </div>
          <div class="flex justify-end">
            <NuxtLink :to="`/shops/${shop.companyName}/products`" class="link">Все товары</NuxtLink>
          </div>
        </div>

        <div v-if="divorces.length" class="mb-7">
          <h2 class="text-xl font-bold mb-2 pl-4">Недавние разведения</h2>

          <div class="flex flex-wrap justify-center md:flex-row flex-col">
            <div v-for="divorce in divorces" :key="`divorce-${divorce.id}`" class="lg:w-4/12 md:w-6/12 w-full px-2 lg:mb-0 mb-4">
              <div class="p-4 shadow rounded-lg flex items-start">
                <NuxtLink :to="`/shops/${shop.companyName}/divorces/${divorce.id}`" class="w-5/12 mr-2">
                  <img data-sizes="auto" :data-src="divorce.exitPhotos[0].imgSrc" class="img-fluid rounded-lg lazyload">
                </NuxtLink>
                <div class="w-7/12">
                  <p class="inline-flex items-center p-2 shadow rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span class="ml-2">{{ moment(divorce.cb).format("DD.MM.YYYY") }}</span>
                  </p>
                  <NuxtLink :to="`/shops/${shop.companyName}/divorces/${divorce.id}`" class="link block truncate">
                    {{divorce.title}}
                  </NuxtLink>
                  <NuxtLink :to="`/shops/${shop.companyName}/divorces/${divorce.id}`" class="text-sm text-white font-bold inline-block rounded-lg py-2 px-3 cursor-pointer duration-200 transition bg-green-600 hover:bg-green-700 mt-2">Посмотреть</NuxtLink>
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-end">
            <NuxtLink :to="`/shops/${shop.companyName}/divorces`" class="link">Все разведения</NuxtLink>
          </div>
        </div>

        <div v-if="shop.description" class="shadow p-4 rounded-lg mb-7">
          <h2 class="text-xl font-bold mb-7">Описание</h2>

          <p class="whitespace-pre-wrap">{{shop.description}}</p>
        </div>

        <div v-if="shop.policity" class="shadow p-4 rounded-lg mb-7">
          <h2 class="text-xl font-bold mb-7">Политика магазина</h2>

          <p class="whitespace-pre-wrap">{{shop.policity}}</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import CountryFlag from 'vue-country-flag'
import moment from "moment";
import {IProduct, IUser} from "~/types";
import {SEO_MUTATIONS} from "~/store/seo";

export default Vue.extend({
  components: {
    CountryFlag
  },

  data: () => ({
    shop: {} as IUser,
    products: [] as Array<IProduct>,
    divorces: []
  }),

  methods: {
    moment
  },

  async asyncData({$api, params, store}) {
    const shop = await $api.getShop(params.shop)
    const {products} = await $api.getProducts({
      include: 'preview,kind,subcategory',
      query: {
        page: {
          size: 5
        },
        filter: {
          shop: params.shop
        }
      }
    })

    store.commit(`seo/${SEO_MUTATIONS.SET_SEO_OPTION}`, shop.seo);

    const {divorces} = await $api.getDivorces({
      include: 'exitPhotos,kind,subcategory',
      query: {
        sort: "-cb",
        page: {
          size: 3
        },
        filter: {
          shop: params.shop
        }
      }
    })

    return {
      shop,
      products,
      divorces
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
})
</script>
