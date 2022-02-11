<template>
  <footer class="border-t py-4">
    <div class="container flex md:flex-row flex-col">
      <div class="flex md:flex-col md:w-2/12 w-full mr-6 md:mb-0 mb-3">
        <img src="https://d3idtmspffvdxi.cloudfront.net/static/icons/logo.svg" alt="" class="h-auto md:w-full w-6/12">
        <div class="flex items-center justify-center md:w-full  w-6/12">
          <a v-for="social in socials" :key="social.title" :href="social.url" target="_blank">
            <FontAwesomeIcon class="md:text-2xl text-3xl mr-3 text-green-600" :icon="['fab', social.faIcon]" />
          </a>
        </div>
      </div>
      <div class="md:w-6/12 mr-6 md:mb-0 mb-3">
        <ul>
          <li><NuxtLink to="/guards" class="md:text-sm py-2 hover:text-green-600 transition">Хранители</NuxtLink></li>
          <li><NuxtLink to="/documents" class="md:text-sm py-2 hover:text-green-600 transition">Юридические документы</NuxtLink></li>
        </ul>
      </div>
      <div class="md:w-4/12 w-full md:text-right">
        <h3 class="text-gray-500 font-semibold">© {{new Date().getFullYear()}} Breeder Zone - маркетплейс для продажи животных</h3>
        <p class="text-gray-500">ИП Поярков А. С.</p>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapState} from "vuex";

export default Vue.extend({
  computed: {
    ...mapState('core', ['socials'])
  },

  name: "Footer",
});
</script>
