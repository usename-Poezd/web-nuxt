<template>
  <nav class="fixed bottom-0 flex bg-white w-full shadow">
    <NuxtLink
      to="/"
      :class="`flex flex-col items-center w-full px-3 py-2 flex flex-col justify-center ${$route.path === '/' ? 'text-green-600' : 'text-gray-400'}`"
    >
      <svg class="w-6" version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3s-6.186 5.34-9.643 8.232c-.203.184-.357.452-.357.768 0 .553.447 1 1 1h2v7c0 .553.447 1 1 1h3c.553 0 1-.448 1-1v-4h4v4c0 .552.447 1 1 1h3c.553 0 1-.447 1-1v-7h2c.553 0 1-.447 1-1 0-.316-.154-.584-.383-.768-3.433-2.892-9.617-8.232-9.617-8.232z"></path></svg>
      <div class="text-center text-xs font-semibold">Главная</div>
    </NuxtLink>
    <NuxtLink
      to="/category"
      :class="`flex flex-col items-center w-full px-3 py-2 flex flex-col justify-center ${$route.path === '/category' ? 'text-green-600' : 'text-gray-400'}`"
    >
      <FontAwesomeIcon icon="list" class="text-xl mr-2"/>
      <div class="text-center text-xs font-semibold">Категории</div>
    </NuxtLink>
    <a href="" class="flex flex-col items-center w-full px-3 py-2 flex flex-col justify-center text-gray-400">
      <FontAwesomeIcon icon="comments"/>
      <div class="text-center text-xs font-semibold">Чат</div>
    </a>
    <NuxtLink
      :to="isAuthenticated && user ? '/profile' : '/auth/login'"
      :class="`flex flex-col items-center w-full px-3 py-2 flex flex-col justify-center ${$route.path.includes('/profile') ? 'text-green-600' : 'text-gray-400'}`"
    >
      <FontAwesomeIcon icon="user-alt" class="text-xl"/>
      <div class="text-center text-xs font-semibold">{{isAuthenticated && user ? user.name : 'Профиль'}}</div>
    </NuxtLink>
  </nav>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {mapGetters, mapState} from "~/node_modules/vuex";

  export default Vue.extend({
    name: "MobileHeader",

    computed: {
      ...mapState('auth', ['user']),
      ...mapGetters('auth', ['isAuthenticated'])
    },
  });
</script>
