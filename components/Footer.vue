<template>
  <footer class="border-t py-4">
    <div class="container flex md:flex-row flex-col">
      <div class="flex md:flex-col md:w-2/12 w-full mr-6 md:mb-0 mb-3">
        <img src="https://breeders-zone.s3.us-east-2.amazonaws.com/static/icons/logo.svg" alt="" class="h-auto md:w-full w-6/12">
        <div class="flex items-center justify-center md:w-full  w-6/12">
          <FontAwesomeIcon class="md:text-2xl text-3xl mr-3" :icon="['fab', 'vk']" style="color: #2787F5;"/>
          <FontAwesomeIcon class="md:text-2xl text-3xl mr-3" :icon="['fab', 'youtube']" style="color: #ff0000;"/>
          <FontAwesomeIcon class="md:text-2xl text-3xl" :icon="['fab', 'facebook']" style="color: #4267B2;"/>
        </div>
      </div>
      <div class="md:w-6/12 mr-6 md:mb-0 mb-3">
        <ul>
          <li><a href="" class="md:text-sm py-2 hover:text-green-600 transition">FAQ</a></li>
          <li><a href="" class="md:text-sm py-2 hover:text-green-600 transition">Помощь</a></li>
          <li><a href="" class="md:text-sm py-2 hover:text-green-600 transition">Юридические документы</a></li>
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

  export default Vue.extend({
    name: "Footer",


  });
</script>
