<template>
  <div>
    <h2 class="font-semibold text-2xl mb-5">Мои данные</h2>
    <div class="flex px-4">
      <div class="w-6/12 shadow rounded-lg p-4 mr-4">
        <div class="mb-5">
          <h3 class="text-2xl font-semibold leading-4">Профиль</h3>
          <NuxtLink to="/profile/settings" class="link text-sm">Редактировать профиль</NuxtLink>
        </div>
        <div class="flex flex-wrap">
          <div class="lg:w-6/12 w-full">
            <ul>
              <li class="flex items-center">
                <p class="font-semibold mr-1">Имя:</p>
                <p>{{user.name}}</p>
              </li>
              <li class="flex items-center">
                <p class="font-semibold mr-1">Фамилия:</p>
                <p>{{user.surname}}</p>
              </li>
            </ul>
          </div>
          <div class="w-6/12">
            <ul>
              <li class="flex items-center">
                <p class="font-semibold mr-1">Телефон:</p>
                <p>{{user.phone}}</p>
              </li>
              <li class="flex items-center">
                <p class="font-semibold mr-1">Почта:</p>
                <p>{{user.email}}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div v-if="user.isBreeder" class="lg:w-6/12 w-full shadow rounded-lg p-4">
        <div class="mb-5">
          <h3 class="text-2xl font-semibold leading-4">Магазин</h3>
          <NuxtLink to="/profile/settings" class="link text-sm">Редактировать магазин</NuxtLink>
        </div>
        <div class="flex flex-wrap">
          <ul>
            <li class="flex items-center">
              <p class="font-semibold mr-1">Компания:</p>
              <p>{{user.companyName}}</p>
            </li>
            <li class="flex items-center">
              <p class="font-semibold mr-1">Владелец:</p>
              <p>{{user.owner}}</p>
            </li>
            <li class="flex items-center">
              <p class="font-semibold mr-1">Город:</p>
              <p>{{user.location}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapActions, mapState} from "vuex";

export default Vue.extend({
  middleware: ['auth'],
  layout: 'profile',

  computed: {
    ...mapState('auth', ['user'])
  },
})
</script>
