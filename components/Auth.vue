<template>
  <div class="flex flex-col items-center">
    <h1 class="w-full font-bold text-2xl text-center my-12">{{type === 'login' ? 'Вход' : 'Регистрация'}}</h1>
    <div :class="`${type === 'login' ? 'lg:w-3/12' : 'lg:w-4/12'} w-full p-2`">
      <div class="flex flex-col mb-5">
        <a :href="`${$config.api}api/auth/v2/vkontakte/redirect`" class="flex items-center py-3 bg-blue-500 transition hover:bg-blue-600 text-white cursor-pointer font-semibold rounded">
          <div class="border-r px-3 mr-2">
            <FontAwesomeIcon :icon="['fab', 'vk']" size="lg"/>
          </div>
          <div class="w-full text-center">{{type === 'login' ? 'Войти' : 'Зарегестрироваться'}} через ВКонтакте</div>
        </a>

        <!--          <div class="flex py-3 bg-red-500 transition hover:bg-red-600 text-white cursor-pointer font-semibold rounded">-->
        <!--            <div class="border-r px-3 mr-2">-->
        <!--              <FontAwesomeIcon :icon="['fab', 'google']" size="lg"/>-->
        <!--            </div>-->
        <!--            <div class="w-full text-center">Войти с помощью Google</div>-->
        <!--          </div>-->
      </div>
      <div class="mb-5 flex items-center">
        <div class="border-t flex-grow"></div>
        <div class="mx-2 text-center md:text-base text-sm font-semibold">Или {{type === 'login' ? 'войти' : 'зарегестрироваться'}} через телефон</div>
        <div class="border-t-2 flex-grow"></div>
      </div>
      <slot></slot>
      <div v-if="type === 'login'" class="flex justify-center mb-3">
        <p class="mr-1">У вас нет аккаунта?</p> <NuxtLink to="/auth/registration" class="link">Зарегестрироваться</NuxtLink>
      </div>
      <div v-else class="flex justify-center mb-3">
        <p class="mr-1">У вас уже есть аккаунт?</p> <NuxtLink to="/auth/login" class="link">Войти</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    props: ['type']
  });
</script>
