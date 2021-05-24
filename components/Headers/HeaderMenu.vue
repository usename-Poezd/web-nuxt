<template>
  <div>
    <header class="block w-full shadow">
      <div class="container flex items-center">
        <div class="lg:w-1/12 w-3/12 py-2">
          <img src="https://breeders-zone.s3.us-east-2.amazonaws.com/static/icons/logo.svg" alt="" class="img-fluid lg:h-12">
        </div>
        <div class="w-full p-2 flex items-center">
          <div class="flex items-center w-full mr-2 bg-gray-200 rounded">
            <input type="text" placeholder="Поиск..." class="block w-full p-2 rounded outline-none appearance-none bg-gray-200">
            <button class="outline-none appearance-none text-gray-500 relative top-0.5 pr-2">
              <FontAwesomeIcon class="text-xl" icon="search"/>
            </button>
          </div>
          <button
            @click.prevent="toggleShow"
            class="md:hidden block p-2 flex items-center transition hover:bg-green-700 bg-green-600 rounded text-white outline-none appearance-none"
          >
            <FontAwesomeIcon :icon="!isShow ? 'list' : 'times'" class="text-xl"/>
          </button>

          <nav class="md:flex md:items-center hidden ">
            <button
              @click.prevent="toggleShow"
              class="p-2 flex items-center transition hover:bg-green-700 bg-green-600 rounded text-white outline-none appearance-none"
            >
              <FontAwesomeIcon :icon="!isShow ? 'list' : 'times'" class="text-xl mr-2"/>
              <div class="font-semibold">Категории</div>
            </button>
            <ul class="flex items-center">
              <li>
                <a href="#" class="px-3 flex flex-col items-center justify-center transition hover:text-green-700">
                  <FontAwesomeIcon icon="user-alt" class="text-3xl text-green-600"/>
                  <div class="text-xs font-semibold">Вход</div>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
    <div v-if="isShow" class="w-full bg-white">
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
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {mapGetters} from 'vuex';

  export default Vue.extend({
    name: "Header",
    data: () => ({
      isShow: true
    }),

    computed: {
      ...mapGetters('core', [
        'activeKinds'
      ])
    },

    methods: {
      toggleShow: function() {
        this.isShow = !this.isShow;
      }
    }
  });
</script>
