<template>
  <header class="block w-full bg-white shadow sticky top-0 z-50">
    <div class="container flex items-center">
      <div class="lg:w-1/12 w-3/12 py-2">
        <NuxtLink to="/">
          <img src="https://breeders-zone.s3.us-east-2.amazonaws.com/static/icons/logo.svg" alt="" class="img-fluid lg:h-12">
        </NuxtLink>
      </div>
      <div class="w-full p-2 pr-0 flex items-center">
        <div class="flex items-center w-full mr-2 bg-gray-200 rounded">
          <input type="text" placeholder="Поиск..." class="block w-full p-2 rounded outline-none appearance-none bg-gray-200">
          <button class="outline-none appearance-none text-gray-500 relative top-0.5 pr-2">
            <FontAwesomeIcon class="text-xl" icon="search"/>
          </button>
        </div>
        <button
          @click.prevent="toggleHeaderMenu"
          class="md:hidden block p-2 flex items-center transition hover:bg-green-700 bg-green-600 rounded text-white outline-none appearance-none"
        >
          <FontAwesomeIcon :icon="!headerMenuShow ? 'list' : 'times'" class="text-xl"/>
        </button>

        <nav class="md:flex md:items-center hidden ">
          <button
            @click.prevent="toggleHeaderMenu"
            class="p-2 flex items-center transition hover:bg-green-700 bg-green-600 rounded text-white outline-none appearance-none"
          >
            <FontAwesomeIcon :icon="!headerMenuShow ? 'list' : 'times'" class="text-xl mr-2"/>
            <div class="font-semibold">Категории</div>
          </button>
          <ul class="flex items-center">
            <li>
              <NuxtLink :to="isAuthenticated && user ? '/profile' : '/auth/login'" class="px-3 flex flex-col items-center justify-center transition hover:text-green-700">
                <FontAwesomeIcon icon="user-alt" class="text-3xl text-green-600"/>
                <div class="text-xs font-semibold">{{isAuthenticated && user ? user.name : 'Вход' }}</div>
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {mapGetters, mapActions, mapState} from 'vuex';

  export default Vue.extend({
    name: "Header",

    computed: {
      ...mapGetters('core', [
        'activeKinds',
        'headerMenuShow'
      ]),

      ...mapState('auth', ['user']),
      ...mapGetters('auth', ['isAuthenticated'])
    },

    methods: {
      ...mapActions('core', [
        'toggleHeaderMenu'
      ])
    }
  });
</script>
