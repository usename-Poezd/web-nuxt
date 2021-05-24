<template>
  <div class="w-full bg-white">
    <div class="w-full bg-gray-200">
      <div class="container py-8">
        <h3 class="font-bold text-xl mb-3">Найтдите в товар:</h3>
        <div class="flex items-center rounded bg-white">
          <input type="text" placeholder="Поиск..." class="block w-full p-4 bg-white rounded outline-none appearance-none">
          <button class="outline-none appearance-none text-gray-500 relative top-0.5 pr-4">
            <FontAwesomeIcon class="text-xl" icon="search"/>
          </button>
        </div>
      </div>
    </div>
    <div class="container pt-4 flex flex-wrap">
      <a
        v-for="activeKind in activeKinds"
        :key="'header-menu-kind-' + activeKind.id"
        href="#"
        class="lg:w-3/12 md:w-4/12 sm:w-6/12 w-full mb-4 sm:px-3 px-0"
      >
        <div class="flex flex-col rounded bg-gray-100 transition hover:text-green-600 py-3 xl:px-0 px-3 h-full">
          <div class="rounded">
            <img
              :data-src="activeKind.logoSquare"
              :alt="activeKind.titleRus"
              class="rounded mx-auto lazyload"
            >
          </div>
          <div class="text-center font-semibold mt-auto pt-2">
            {{activeKind.titleRus}}
          </div>
        </div>

      </a>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {mapGetters} from 'vuex';

  export default Vue.extend({
    name: "HeaderMenu",

    computed: {
      ...mapGetters('core', [
        'activeKinds'
      ])
    },
  });
</script>
