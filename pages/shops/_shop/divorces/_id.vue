<template>
  <main class="container md:py-8 py-4">
    <nav class="text-black font-bold mb-4 text-xs" aria-label="Breadcrumb">
      <ol class="list-none p-0 inline-flex">
        <li class="flex items-center">
          <NuxtLink to="/">Главная</NuxtLink>
          <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
        </li>
        <li class="flex items-center">
          <NuxtLink :to="`/shops/${$route.params.shop}`">{{ $route.params.shop }}</NuxtLink>
          <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
        </li>
        <li class="flex items-center">
          <NuxtLink :to="`/shops/${$route.params.shop}/divorces`">Разведения {{$route.params.shop}}</NuxtLink>
          <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
        </li>
        <li>
          <span class="text-gray-500" aria-current="page">{{ divorce.title }}</span>
        </li>
      </ol>
    </nav>

    <h1 class="md:text-2xl text-xl font-bold pb-4 mb-7 border-b">{{ divorce.title }}</h1>

    <div class="p-4 shadow rounded-lg mb-7">
      <div class="flex flex-wrap md:w-6/12 w-full">
        <div class="md:w-6/12 w-full flex mb-4">
          <div class="mr-4">
            <span class="relative font-semibold bg-white pr-1">Категория</span>
          </div>
          <div>
            {{divorce.kind.titleRus}}
          </div>
        </div>
        <div v-if="divorce.subcategory" class="md:w-6/12 w-full flex mb-4">
          <div class="mr-4">
            <span class="relative font-semibold bg-white pr-1">Подкатегория</span>
          </div>
          <div>
            {{divorce.subcategory.title}}
          </div>
        </div>
      </div>
      <div class="flex flex-wrap md:w-6/12 w-full">
        <div class="md:w-6/12 w-full flex mb-4">
          <div class="mr-4">
            <span class="relative font-semibold bg-white pr-1">Дата выхода</span>
          </div>
          <div>
            {{moment(divorce.cb).format('DD.MM.YYYY')}}
          </div>
        </div>
        <div class="md:w-6/12 w-full flex mb-4">
          <div class="mr-4">
            <span class="relative font-semibold bg-white pr-1">Производитель</span>
          </div>
          <NuxtLink :to="`/shops/${divorce.shop.companyName}`" class="link md:whitespace-nowrap">
            {{divorce.shop.companyName}}
          </NuxtLink>
        </div>
      </div>
      <div v-if="divorce.male.length" class="flex md:mb-2 mb-3">
        <div class="md:w-3/12 w-5/12 font-semibold">Морфы самца</div>
        <div class="md:w-9/12 w-7/12 pl-3">
          <div class="flex flex-wrap">
            <div v-for="morph in divorce.male" :class="`mr-2 mb-2 morph-indicator inline-block text-sm ${formatMorphClass(morph)}`">
              {{formatMorph(morph)}}
            </div>
          </div>
        </div>
      </div>
      <div v-if="divorce.female.length" class="flex md:mb-2 mb-3">
        <div class="md:w-3/12 w-5/12 font-semibold">Морфы самца</div>
        <div class="md:w-9/12 w-7/12 pl-3">
          <div class="flex flex-wrap">
            <div v-for="morph in divorce.male" :class="`mr-2 mb-2 morph-indicator inline-block text-sm ${formatMorphClass(morph)}`">
              {{formatMorph(morph)}}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="divorce.sexPhotos.length" class="p-4 shadow rounded-lg mb-7">
      <h2 class="text-xl font-bold mb-7">Фото спаривания</h2>

      <div
        v-if="divorce.sexPhotos.length >= 2"
        v-swiper:sexPhotos="{
             loop: true,
             loopedSlides: $device.isDesktop ? 3 : 1,
             centeredSlides: true,
             slideToClickedSlide: true,
             slidesPerView: $device.isDesktop ? 3 : 1,
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
          <div
            v-for="photo in divorce.sexPhotos"
            :key="`shop-photo-${photo.id}`"
            class="swiper-slide md:px-3 px-0"
          >
            <img
              :data-src="photo.imgSrc"
              :alt="divorce.title"
              class="rounded mx-auto lazyload"
            >
          </div>
        </div>
        <div class="swiper-prev block cursor-pointer absolute z-30 top-1/2 -left-2 transform -translate-y-1/2 rounded-full appearance-none focus:outline-none bg-white p-3 shadow">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </div>
        <div class="swiper-next block cursor-pointer absolute z-30 top-1/2 -right-2 transform -translate-y-1/2 rounded-full appearance-none focus:outline-none bg-white p-3 shadow">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>
      </div>
      <div v-else>
        <div
          v-for="photo in divorce.sexPhotos"
          :key="`shop-photo-${photo.id}`"
          class="md:px-3 px-0"
        >
          <img
            :data-src="photo.imgSrc"
            :alt="divorce.title"
            class="rounded mx-auto lazyload img-fluid"
          >
        </div>
      </div>
    </div>

    <div v-if="divorce.masonryPhotos.length" class="p-4 shadow rounded-lg mb-7">
      <h2 class="text-xl font-bold mb-7">Фото кладки</h2>

      <div
        v-if="divorce.masonryPhotos.length >= 2"
        v-swiper:masonryPhotos="{
             loop: true,
             loopedSlides: $device.isDesktop ? 3 : 1,
             centeredSlides: true,
             slideToClickedSlide: true,
             slidesPerView: $device.isDesktop ? 3 : 1,
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
          <div
            v-for="photo in divorce.masonryPhotos"
            :key="`shop-photo-${photo.id}`"
            class="swiper-slide md:px-3 px-0"
          >
            <img
              :data-src="photo.imgSrc"
              :alt="divorce.title"
              class="rounded mx-auto lazyload"
            >
          </div>
        </div>
        <div class="swiper-prev block cursor-pointer absolute z-30 top-1/2 -left-2 transform -translate-y-1/2 rounded-full appearance-none focus:outline-none bg-white p-3 shadow">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </div>
        <div class="swiper-next block cursor-pointer absolute z-30 top-1/2 -right-2 transform -translate-y-1/2 rounded-full appearance-none focus:outline-none bg-white p-3 shadow">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>
      </div>
      <div v-else>
        <div
          v-for="photo in divorce.masonryPhotos"
          :key="`shop-photo-${photo.id}`"
          class="md:px-3 px-0"
        >
          <img
            :data-src="photo.imgSrc"
            :alt="divorce.title"
            class="rounded mx-auto lazyload img-fluid"
          >
        </div>
      </div>
    </div>

    <div v-if="divorce.exitPhotos.length" class="p-4 shadow rounded-lg mb-7">
      <h2 class="text-xl font-bold mb-7">Фото выхода</h2>

      <div
        v-if="divorce.exitPhotos.length >= 2"
        v-swiper:exitPhotos="{
             loop: true,
             loopedSlides: $device.isDesktop ? 3 : 1,
             centeredSlides: true,
             slideToClickedSlide: true,
             slidesPerView: $device.isDesktop ? 3 : 1,
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
          <div
            v-for="photo in divorce.exitPhotos"
            :key="`shop-photo-${photo.id}`"
            class="swiper-slide md:px-3 px-0"
          >
            <img
              :data-src="photo.imgSrc"
              :alt="divorce.title"
              class="rounded mx-auto lazyload"
            >
          </div>
        </div>
        <div class="swiper-prev block cursor-pointer absolute z-30 top-1/2 -left-2 transform -translate-y-1/2 rounded-full appearance-none focus:outline-none bg-white p-3 shadow">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </div>
        <div class="swiper-next block cursor-pointer absolute z-30 top-1/2 -right-2 transform -translate-y-1/2 rounded-full appearance-none focus:outline-none bg-white p-3 shadow">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>
      </div>
      <div v-else>
        <div
          v-for="photo in divorce.exitPhotos"
          :key="`shop-photo-${photo.id}`"
          class="md:px-3 px-0"
        >
          <img
            :data-src="photo.imgSrc"
            :alt="divorce.title"
            class="rounded mx-auto lazyload img-fluid"
          >
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
    import Vue from "vue";
    import moment from "moment";
    import {formatMorph, formatMorphClass} from "~/utils";

    export default Vue.extend({


      data: () => ({
        divorce: {} as any
      }),

      methods: {
        moment,
        formatMorph,
        formatMorphClass
      },

      async asyncData({ params, $api }) {
        const divorce = await $api.getDivorce(params.id, 'shop,male.gene,male.trait,male.trait.traitGroup,female.gene,female.trait,female.trait.traitGroup,kind,subcategory,exitPhotos,sexPhotos,masonryPhotos');

        return {
          divorce
        }
      },

      head() {
        return {
          title: `${this.divorce.title} — ${this.$route.params.shop}, Breeders Zone`
        }
      }
    });
</script>
