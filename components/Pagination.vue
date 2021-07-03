<template>
  <ul v-if="currentPage !== lastPage" class="flex items-center border-t mt-3">
    <li v-if="currentPage > 1">
      <NuxtLink
        :to="{
          path: $route.path,
          query: {
            ...$route.query,
            page: currentPage - 1
          }
        }"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 relative top-0.5 text-gray-400">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </NuxtLink>
    </li>
    <li v-for="page in pages"  class="relative">
      <span v-if="page === currentPage" class="w-full absolute t-0 h-0.5 bg-green-700"></span>
      <NuxtLink
        :to="{
          path: $route.path,
          query: {
            ...$route.query,
            page
          }
        }"
        :class="`p-3 ${page === currentPage ? 'text-green-700 ' : 'text-gray-400'} font-semibold block hover:no-underline`"
      >
        {{page}}
      </NuxtLink>
    </li>

    <li v-if="currentPage !== lastPage">
      <NuxtLink
        :to="{
          path: $route.path,
          query: {
            ...$route.query,
            page: currentPage + 1
          }
        }"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 relative top-0.5 text-gray-400">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </NuxtLink>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

export default Vue.extend({
  props: {
    currentPage: {
      type: Number as PropType<number>,
      default: 1
    },
    lastPage: {
      type: Number as PropType<number>,
      default: 1
    }
  },

  computed: {
    pages: function () {
      const pageRange = 2;

      // @ts-ignore
      const start = (this.currentPage - pageRange) > 0 ? this.currentPage - pageRange : 1;
      // @ts-ignore
      const end = (this.currentPage + pageRange) < this.lastPage ? this.currentPage + pageRange : this.lastPage;

      const pages = []
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      return pages;
    }
  }
});
</script>

