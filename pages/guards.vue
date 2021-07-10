<template>
  <main class="container">
    <div class="md:py-8 py-4">
      <nav class="text-black font-bold mb-4 text-xs" aria-label="Breadcrumb">
        <ol class="list-none p-0 inline-flex">
          <li class="flex items-center">
            <NuxtLink to="/">Главная</NuxtLink>
            <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
          </li>
          <li>
            <span class="text-gray-500" aria-current="page">Хранители</span>
          </li>
        </ol>
      </nav>

      <div class="mb-8">
        <div class="flex items-center">
          <h1 class="text-3xl font-bold mr-1">Хранители</h1>
        </div>
        <p>Эти люди заботятся о вас, оценивая животное или сообщают о не корректной морфе</p>
      </div>
    </div>

    <div class="guards">
      <div v-for="guard in guards" :key="`guard-${guard.id}`" class="w-full inline-block shadow rounded-lg p-4 mb-4">
        <div class="flex items-center pb-4 mb-4 border-b">
          <div class="w-14 h-14 shadow-md flex relative items-center justify-center rounded-full bg-white overflow-hidden mr-4">
            <img :src="guard.profileImg" :alt="`${guard.name} ${guard.surname}`" class="img-fluid rounded-full">
          </div>
          <div class="font-semibold">{{ `${guard.name} ${guard.surname}` }}</div>
        </div>
        <p v-if="guard.about" class="pb-4 mb-4 border-b">{{ guard.about }}</p>
        <div v-if="guard.guardKinds" class="font-semibold mb-2">Категории</div>
        <div v-if="guard.guardKinds" class="morphs">
          <div v-for="kind in guard.guardKinds" :key="`guard-${guard.id}-${kind.id}`" class="morph-indicator morph-other-normal inline-block m-1">{{ kind.titleRus }}</div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import {IUser} from "~/types";

export default Vue.extend({
  data: () => ({
    guards: [] as Array<IUser>
  }),

  async asyncData({$api}) {
    const guards = await $api.getGuards();

    return {
      guards
    }
  }
})
</script>
