<template>
  <div class="lg:w-4/12 md:w-6/12 w-full px-2 mb-4">
    <div class="p-4 shadow rounded-lg flex items-start h-full">
      <NuxtLink :to="`divorces/${divorce.id}`" class="w-5/12 mr-2">
        <img data-sizes="auto" :data-src="divorce.exitPhotos[0].imgSrc" class="img-fluid rounded-lg lazyload">
      </NuxtLink>
      <div class="w-7/12">
        <p class="inline-flex items-center p-2 shadow rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span class="ml-2">{{ moment(divorce.cb).format("DD.MM.YYYY") }}</span>
        </p>
        <NuxtLink :to="`divorces/${divorce.id}`" class="link block truncate">
          {{divorce.title}}
        </NuxtLink>
        <NuxtLink :to="`divorces/${divorce.id}`" class="text-sm text-white font-bold inline-block rounded-lg py-2 px-3 cursor-pointer duration-200 transition bg-green-600 hover:bg-green-700 mt-2">Посмотреть</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {RUB, getPrice} from "~/utils";
  import moment from "moment";

  export default Vue.extend({
    name: "Card",

    methods: {
      moment
    },

    props: {
      divorce: Object
    }
  });
</script>
