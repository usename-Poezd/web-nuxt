<template>
  <div class="container md:flex">
    <div class="w-3/12 md:block hidden mr-4 border-r py-3">
      <ul>
        <li v-for="sideDocument in documents" :key="`document-${sideDocument.label}`">
          <NuxtLink
            :to="`/documents/${sideDocument.label}`"
            :class="`relative block px-4 py-4 transition hover:bg-gray-100 rounded-l-md ${document.label === sideDocument.label && 'text-green-600'}`"
          >
            {{ sideDocument.title }}
            <span v-if="document.label === sideDocument.label" class="block h-full w-1 absolute top-0 right-0 bg-green-600"></span>
          </NuxtLink>
        </li>
      </ul>
    </div>
    <div class="md:w-9/12 w-full py-7">
      <NuxtLink to="/documents" class="md:hidden flex items-center mb-4">
        <FontAwesomeIcon icon="chevron-left" size="lg" class="md:hidden block mr-2"/>
        <span class="font-semibold">Назад</span>
      </NuxtLink>
      <h1 class="font-bold text-3xl mb-14">{{document.title}}</h1>
      <div class="document" v-html="document.description">
        {{document.description}}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {IDocument} from "~/types";

export default Vue.extend({
  data: () => ({
    documents: [] as Array<IDocument>,
    document: {} as IDocument
  }),

  async asyncData({params, $api}) {
    const documents = await $api.getDocuments();
    const document = await $api.getDocument(params.slug);

    return {
      documents,
      document
    }
  },

  head() {
    return {
      title: this.document.title
    }
  }
})
</script>

