<template>
  <ul v-if="currentPage !== lastPage" class="flex items-center border-t mt-3">
    <li v-if="currentPage > 1">
      <a href="/catalog/literatura-i-knigi/" id="navigation_1_previous_page" class="block">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 relative top-0.5 text-gray-400">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </a>
    </li>


    <li class="relative">
      <span class="w-full absolute t-0 h-0.5 bg-green-700"></span>
      <span class="p-3 text-green-700 font-semibold block hover:no-underline">1</span>
    </li>

    <li>
      <a class="p-3 text-gray-400 font-semibold block hover:no-underline" href="/catalog/literatura-i-knigi/?PAGEN_1=2">2</a>
    </li>

    <li v-if="currentPage !== lastPage">
      <a href="/catalog/literatura-i-knigi/?PAGEN_1=2" class="block">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 relative top-0.5 text-gray-400">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {RUB, getPrice} from "~/utils";

  export default Vue.extend({
    name: "Pagination",


    props: {
      currentPage: Number,
      lastPage: Number
    }
  });
</script>
