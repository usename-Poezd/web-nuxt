<template>
  <div class="container md:flex">
    <div class="md:w-3/12 w-full md:mr-4 md:border-r py-3">
      <h1 class="text-2xl font-bold md:hidden mb-4">Юридические документы</h1>
      <ul>
        <li v-for="document in documents" :key="`document-${document.id}`">
          <NuxtLink
            :to="`/documents/${document.label}`"
            class="flex items-center md:px-4 py-4 transition hover:bg-gray-100 rounded-l-md"
          >
            <span class="md:full w-11/12 md:mr-0 mr-2">{{ document.title }}</span>
            <FontAwesomeIcon icon="arrow-right" size="lg" class="md:hidden w-1/12 text-green-600"/>
          </NuxtLink>
        </li>
      </ul>
    </div>
    <div class="md:block hidden w-9/12 flex py-7">
      <div class="text-center m-auto">
        <FontAwesomeIcon icon="bookmark" size="4x" class="text-yellow-400 mb-4"/>
        <p class="font-semibold">Выберете документ для ознокомления</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data: () => ({
    documents: []
  }),

  async asyncData({$api}) {
    const documents = await $api.getDocuments();

    return {
      documents
    }
  }
})
</script>

